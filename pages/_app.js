import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import { StoreProvider } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
   useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
         jssStyles.parentElement.removeChild(jssStyles)
      }
   }, [])
   return (
      <>
         <StoreProvider>
            <Layout>
               <Component {...pageProps} />
               <ToastContainer
                  position='top-center'
                  autoClose={1000}
                  pauseOnHover={false}
               />
            </Layout>
         </StoreProvider>
      </>
   )
}

export default MyApp
