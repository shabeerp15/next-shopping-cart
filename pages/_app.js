import '../styles/globals.css'

import { useEffect } from 'react'
import { StoreProvider } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

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
            <PayPalScriptProvider deferLoading={true}>
               
                  <Component {...pageProps} />
                  <ToastContainer
                     position='top-center'
                     autoClose={1000}
                     pauseOnHover={false}
                  />
               
            </PayPalScriptProvider>
         </StoreProvider>
      </>
   )
}

export default MyApp
