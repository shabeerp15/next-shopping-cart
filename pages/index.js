import { Grid } from '@mui/material'
import ProductItem from '../components/ProductItem'
import db from '../utils/db'
import Product from '../models/Product'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export default function Home({ products }) {
   const { state, dispatch } = useContext(Store)
   const router = useRouter()

   const addToCartHandler = async (product) => {
      const existItem = state.cart.cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity + 1 : 1
      const { data } = await axios.get(`/api/products/${product._id}`)
      if (data.countInStock < quantity) {
         toast.error('Sorry. Product is out of stock')
         return
      }
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
      router.push('/cart')
   }

   return (
      <div>
         <h1>Products</h1>
         <Grid container spacing={3}>
            {products.map((product) => (
               <Grid item md={4} key={product.name}>
                  <ProductItem
                     product={product}
                     addToCartHandler={addToCartHandler}
                  />
               </Grid>
            ))}
         </Grid>
      </div>
   )
}

export async function getServerSideProps() {
   db.connect()
   const products = await Product.find({}).lean()
   await db.disconnect()
   return {
      props: {
         products: products.map(db.convertDocToObj),
      },
   }
}
