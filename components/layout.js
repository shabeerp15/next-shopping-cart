import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import useStyles from '../utils/styles'

const layout = ({ children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles()
   return (
      <div> 
         <Head>
            <title>Next Amazon</title>
            <meta
               name='viewport'
               content='initial-scale=1.0, width=device-width'
            />
         </Head>
         <AppBar position='static' className={classes.navbar}>
            <Toolbar>
               <Typography variant='title' color='inherit' className={classes.brand}>
                  Amazon
               </Typography>
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
