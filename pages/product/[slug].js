import { useRouter } from 'next/router'
import Meta from '../../components/Meta'
import Nextlink from 'next/link'
import {
   Button,
   Card,
   CircularProgress,
   Grid,
   Link,
   List,
   ListItem,
   Rating,
   TextField,
   Typography,
} from '@mui/material'
import UseStyles from '../../utils/styles'
import Image from 'next/image'
import Product from '../../models/Product'
import db from '../../utils/db'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../../utils/Store'
import axios from 'axios'
import { getError } from '../../utils/error'
import { toast } from 'react-toastify'

const ProductScreen = ({ product }) => {
   const router = useRouter()
   const { state, dispatch } = useContext(Store)
   const { userInfo } = state
   const classes = UseStyles()

   const [reviews, setReviews] = useState([])
   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')
   const [loading, setLoading] = useState(false)
   console.log(reviews, 'reviews')

   const submitHandler = async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
         await axios.post(
            `/api/products/${product._id}/reviews`,
            {
               rating,
               comment,
            },
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         )
         setLoading(false)
         toast.success('Review submitted successfully')
         setComment('')
         setRating(0)
         fetchReviews()
         // router.reload()
      } catch (err) {
         setLoading(false)
         toast.error(getError(err))
      }
   }

   const fetchReviews = async () => {
      try {
         const { data } = await axios.get(
            `/api/products/${product._id}/reviews`
         )

         setReviews(data)
      } catch (err) {
         toast.error(getError(err))
      }
   }

   useEffect(() => {
      fetchReviews()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const addToCartHandler = async () => {
      const existItem = state.cart.cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity + 1 : 1
      const { data } = await axios.get(`/api/products/${product._id}`)
      if (data.countInStock <= 0) {
         window.alert('Sorry. Product is out of stock')
         return
      }
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
      router.push('/cart')
   }

   if (!product) {
      return (
         <>
            <Meta
               title='Product not found'
               description={`Product ${slug} not found`}
            />
            <div>Product not found</div>
         </>
      )
   }
   return (
      <>
         <Meta
            title={product.name}
            description={product.description}
            keywords={product.description}
         />
         <div className={classes.section}>
            <Nextlink href='/' passHref>
               <Link>
                  <Typography gutterBottom>Back to Products</Typography>
               </Link>
            </Nextlink>
         </div>
         <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
               <Image
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={640}
                  layout='responsive'
               ></Image>
            </Grid>
            <Grid item md={6} xs={12}>
               <Grid item md={12}>
                  <List>
                     <ListItem>
                        <Typography component='h3' variant='h3'>
                           {product.name}
                        </Typography>
                     </ListItem>
                     <ListItem>
                        <Typography>Category: {product.category}</Typography>
                     </ListItem>
                     <ListItem>
                        <Typography>Brand: {product.brand}</Typography>
                     </ListItem>
                     <ListItem>
                        <Rating value={product.rating} readOnly></Rating>
                        <Link href='#reviews'>
                           <Typography>
                              ({product.numReviews} reviews)
                           </Typography>
                        </Link>
                     </ListItem>
                     <ListItem>
                        <Typography>
                           Description: {product.description}
                        </Typography>
                     </ListItem>
                  </List>
               </Grid>
               <Grid item md={12}>
                  <Card>
                     <List>
                        <ListItem>
                           <Grid container>
                              <Grid item xs={6}>
                                 <Typography>Price</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                 <Typography>$ {product.price}</Typography>
                              </Grid>
                           </Grid>
                        </ListItem>
                        <ListItem>
                           <Grid container>
                              <Grid item xs={6}>
                                 <Typography>Status</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                 <Typography>
                                    {product.countInStock > 0
                                       ? 'In stock'
                                       : 'Unavailable'}
                                 </Typography>
                              </Grid>
                           </Grid>
                        </ListItem>
                        <ListItem>
                           <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              onClick={addToCartHandler}
                           >
                              Add to cart
                           </Button>
                        </ListItem>
                     </List>
                  </Card>
               </Grid>
            </Grid>
         </Grid>
         <List>
            <ListItem>
               <Typography name='reviews' id='reviews' variant='h2'>
                  Customer Reviews
               </Typography>
            </ListItem>
            {reviews?.length === 0 ? (
               <ListItem>No review</ListItem>
            ) : (
               reviews.map((review) => (
                  <ListItem key={review._id}>
                     <Grid container>
                        <Grid item className={classes.reviewItem}>
                           <Typography>
                              <strong>{review.name}</strong>
                           </Typography>
                           <Typography>
                              {review.createdAt.substring(0, 10)}
                           </Typography>
                        </Grid>
                        <Grid item>
                           <Rating value={review.rating} readOnly></Rating>
                           <Typography>{review.comment}</Typography>
                        </Grid>
                     </Grid>
                  </ListItem>
               ))
            )}
            <ListItem>
               {userInfo && !userInfo.isAdmin ? (
                  <form onSubmit={submitHandler} className={classes.reviewForm}>
                     <List>
                        <ListItem>
                           <Typography variant='h2'>
                              Leave your review
                           </Typography>
                        </ListItem>
                        <ListItem>
                           <TextField
                              multiline
                              variant='outlined'
                              fullWidth
                              name='review'
                              label='Enter comment'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                           />
                        </ListItem>
                        <ListItem>
                           <Rating
                              name='simple-controlled'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                           />
                        </ListItem>
                        <ListItem>
                           <Button
                              type='submit'
                              fullWidth
                              variant='contained'
                              color='primary'
                           >
                              Submit
                           </Button>

                           {loading && <CircularProgress></CircularProgress>}
                        </ListItem>
                     </List>
                  </form>
               ) : (
                  <Typography variant='h2'>
                     Please{' '}
                     <Link href={`/login?redirect=/product/${product.slug}`}>
                        login
                     </Link>{' '}
                     to write a review
                  </Typography>
               )}
            </ListItem>
         </List>
      </>
   )
}

export default ProductScreen

export async function getServerSideProps(contex) {
   const { params } = contex
   const { slug } = params

   db.connect()
   const product = await Product.findOne({ slug }, '-reviews').lean()
   await db.disconnect()
   return {
      props: {
         product: db.convertDocToObj(product),
      },
   }
}
