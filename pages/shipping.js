import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from '../components/Meta'
import { Store } from '../utils/Store';

const ShippingScreen = () => {
   const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

   useEffect(() => {
      if (!userInfo) {
         router.push('/login?redirect=/shipping');
      }
   }, []);

   
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
