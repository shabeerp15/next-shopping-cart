import React, { useContext, useEffect } from 'react'
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
} from '@mui/material'
import UseStyles from '../utils/styles'
import { Store } from '../utils/Store'
import Meta from './Meta'
import Cookies from 'js-cookie'

const Layout = ({ children }) => {
   const { state, dispatch } = useContext(Store)
   const { darkMode, cart } = state
   const classes = UseStyles()
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
         type: darkMode ? 'dark' : 'light',
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
   console.log(darkMode, 'darkMode')
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
                  <div className='classes.grow'></div>
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
                     <NextLink href='/login' passHref>
                        <Link>Login</Link>
                     </NextLink>
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
