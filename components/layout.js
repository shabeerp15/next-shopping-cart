import React, { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import {
   AppBar,
   Container,
   CssBaseline,
   Link,
   Toolbar,
   Typography,
   createTheme,
   ThemeProvider,
   Switch,
   Badge,
   Button,
   Menu,
   MenuItem,
   Box,
   IconButton,
   Drawer,
   List,
   ListItem,
   Divider,
   ListItemText,
} from '@mui/material'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import Meta from './Meta'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { getError } from '../utils/error'
import axios from 'axios'
import { toast } from 'react-toastify'
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon  from '@mui/icons-material/Cancel';

const Layout = ({ children }) => {
   const router = useRouter()
   const { state, dispatch } = useContext(Store)
   const { darkMode, cart, userInfo } = state
   const classes = useStyles()

   const [sidbarVisible, setSidebarVisible] = useState(false)
   const sidebarOpenHandler = () => {
      setSidebarVisible(true)
   }
   const sidebarCloseHandler = () => {
      setSidebarVisible(false)
   }

   const [categories, setCategories] = useState([])

   const fetchCategories = async () => {
      try {
         const { data } = await axios.get(`/api/products/categories`)
         setCategories(data)
      } catch (err) {
         toast.error(getError(err))
      }
   }

   useEffect(() => {
      fetchCategories()
   }, [])

   const theme = createTheme({
      typography: {
         h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0',
         },
         h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0',
         },
      },
      palette: {
         mode: darkMode ? 'dark' : 'light',
         primary: {
            main: '#ffc107',
         },
         secondary: {
            main: '#208080',
         },
      },
   })

   const darkModeChangeHandler = () => {
      dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
      const newDarkMode = !darkMode
      Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
   }

   const [anchorEl, setAnchorEl] = useState(null)

   const loginClickHandler = (e) => {
      setAnchorEl(e.currentTarget)
   }

   const loginMenuCloseHandler = (e, redirect) => {
      setAnchorEl(null)
      if (redirect) {
         router.push(redirect)
      }
   }

   const logoutClickHandler = () => {
      setAnchorEl(null)
      dispatch({ type: 'USER_LOGOUT' })
      Cookies.remove('userInfo')
      Cookies.remove('cartItems')
      router.push('/')
   }

   return (
      <div>
         <Meta />
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position='static' className={classes.navbar}>
               <Toolbar className={classes.toolbar}>
                  <Box display='flex' alignItems='center'>
                     <IconButton
                        edge='start'
                        aria-label='open drawer'
                        onClick={sidebarOpenHandler}
                     >
                        <MenuIcon className={classes.navbarButton} />
                     </IconButton>
                     <NextLink href='/' passHref>
                        <Link style={{ textDecoration: 'none' }}>
                           <Typography className={classes.brand}>
                              amazon
                           </Typography>
                        </Link>
                     </NextLink>
                  </Box>
                  <Drawer
                     anchor='left'
                     open={sidbarVisible}
                     onClose={sidebarCloseHandler}
                  >
                     <List>
                        <ListItem>
                           <Box
                              display='flex'
                              alignItems='center'
                              justifyContent='space-between'
                           >
                              <Typography>Shopping by category</Typography>
                              <IconButton
                                 aria-label='close'
                                 onClick={sidebarCloseHandler}
                              >
                                 <CancelIcon />
                              </IconButton>
                           </Box>
                        </ListItem>
                        <Divider light />
                        {categories.map((category) => (
                           <NextLink
                              key={category}
                              href={`/search?category=${category}`}
                              passHref
                           >
                              <ListItem
                                 button
                                 component='a'
                                 onClick={sidebarCloseHandler}
                              >
                                 <ListItemText
                                    primary={category}
                                 ></ListItemText>
                              </ListItem>
                           </NextLink>
                        ))}
                     </List>
                  </Drawer>
                  <div className={classes.grow}></div>
                  <div>
                     <Switch
                        checked={darkMode}
                        onChange={darkModeChangeHandler}
                     ></Switch>
                     <NextLink href='/cart' passHref>
                        <Link>
                           <Typography component='span'>
                              {cart.cartItems.length > 0 ? (
                                 <Badge
                                    badgeContent={cart.cartItems.length}
                                    color='secondary'
                                 >
                                    Cart
                                 </Badge>
                              ) : (
                                 'Cart'
                              )}
                           </Typography>
                        </Link>
                     </NextLink>
                     {userInfo ? (
                        <>
                           <Button
                              aria-controls='simple-menu'
                              aria-haspopup='true'
                              onClick={loginClickHandler}
                              className={classes.navbarButton}
                           >
                              {userInfo.name}
                           </Button>
                           <Menu
                              id='simple-menu'
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={loginMenuCloseHandler}
                           >
                              <MenuItem
                                 onClick={(e) =>
                                    loginMenuCloseHandler(e, '/profile')
                                 }
                              >
                                 Profile
                              </MenuItem>
                              <MenuItem
                                 onClick={(e) =>
                                    loginMenuCloseHandler(e, '/order-history')
                                 }
                              >
                                 Order History
                              </MenuItem>
                              {userInfo.isAdmin && (
                                 <MenuItem
                                    onClick={(e) =>
                                       loginMenuCloseHandler(
                                          e,
                                          '/admin/dashboard'
                                       )
                                    }
                                 >
                                    Admin Dashboard
                                 </MenuItem>
                              )}
                              <MenuItem onClick={logoutClickHandler}>
                                 Logout
                              </MenuItem>
                           </Menu>
                        </>
                     ) : (
                        <NextLink href='/login' passHref>
                           <Link>
                              <Typography component='span'>Login</Typography>
                           </Link>
                        </NextLink>
                     )}
                  </div>
               </Toolbar>
            </AppBar>
            <Container className={classes.main}>{children}</Container>
            <footer className={classes.footer}>
               <Typography>
                  All rights reserved. &copy; {new Date().getFullYear()}
               </Typography>
            </footer>
         </ThemeProvider>
      </div>
   )
}

export default Layout
