/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link'
import { Grid, Link, Typography } from '@mui/material'
import ProductItem from '../components/ProductItem'
import db from '../utils/db'
import Product from '../models/Product'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Carousel from 'react-material-ui-carousel'
import useStyles from '../utils/styles'

export default function Home({ topRatedProducts, featuredProducts }) {
   const classes = useStyles()
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
         <div className={classes.box}>
            <Carousel className={classes.mt1} animation='slide'>
               {featuredProducts.map((product) => (
                  <NextLink
                     key={product._id}
                     href={`/product/${product.slug}`}
                     passHref
                  >
                     <Link>
                        <img
                           src={product.featuredImage}
                           alt={product.name}
                           className={classes.featuredImage}
                        ></img>
                     </Link>
                  </NextLink>
               ))}
            </Carousel>
         </div>
         <Typography variant='h2'>Popular Products</Typography>
         <Grid container spacing={3}>
            {topRatedProducts.map((product) => (
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
   const featuredProductsDocs = await Product.find(
      { isFeatured: true },
      '-reviews'
   )
      .lean()
      .limit(3)
   const topRatedProductsDocs = await Product.find({}, '-reviews')
      .lean()
      .sort({
         rating: -1,
      })
      .limit(6)
   await db.disconnect()
   return {
      props: {
         featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
         topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      },
   }
}
