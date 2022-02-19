import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import { StoreProvider } from '../utils/Store'

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
            </Layout>
         </StoreProvider>
      </>
   )
}

export default MyApp
