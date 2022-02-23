import React from 'react'
import { useRouter } from 'next/router'
import Meta from '../components/Meta'

const ShippingScreen = () => {
   const router = useRouter()
   router.push('/login')
   return (
      <>
         <Meta
            title={'Shipping'}
            description={'Shipping'}
            keywords={'Shipping'}
         />
         shipping
      </>
   )
}

export default ShippingScreen
