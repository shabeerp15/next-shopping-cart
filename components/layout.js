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
} from '@mui/material'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import Meta from './Meta'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
   const router = useRouter()
   const { state, dispatch } = useContext(Store)
   const { darkMode, cart, userInfo } = state
   const classes = useStyles()
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
               <Toolbar>
                  <NextLink href='/' passHref>
                     <Link style={{ textDecoration: 'none' }}>
                        <Typography className={classes.brand}>
                           Amazon
                        </Typography>
                     </Link>
                  </NextLink>
                  <div className={classes.grow}></div>
                  <div>
                     <Switch
                        checked={darkMode}
                        onChange={darkModeChangeHandler}
                     ></Switch>
                     <NextLink href='/cart' passHref>
                        <Link>
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
                              <MenuItem onClick={(e)=>loginMenuCloseHandler(e, '/profile')}>
                                 Profile
                              </MenuItem>
                              <MenuItem
                                 onClick={(e) =>
                                    loginMenuCloseHandler(e, '/order-history')
                                 }
                              >
                                 Order History
                              </MenuItem>
                              <MenuItem onClick={logoutClickHandler}>
                                 Logout
                              </MenuItem>
                           </Menu>
                        </>
                     ) : (
                        <NextLink href='/login' passHref>
                           <Link>Login</Link>
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
