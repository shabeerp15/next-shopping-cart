import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material'
import UseStyles from '../utils/styles'
import NextLink from 'next/link'
import Meta from './Meta'

const layout = ({ children }) => {
   const classes = UseStyles()
   return (
      <div>
         <Meta />
         <AppBar position='static' className={classes.navbar}>
            <Toolbar>
               <NextLink href='/' passHref>
                  <Link style={{ textDecoration: 'none' }}>
                     <Typography className={classes.brand}>Amazon</Typography>
                  </Link>
               </NextLink>
               <div className='classes.grow'></div>
               <div>
                  <NextLink href='/cart' passHref>
                     <Link>Cart</Link>
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
      </div>
   )
}

export default layout
