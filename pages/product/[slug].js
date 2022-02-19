import { useRouter } from 'next/router'
import data from '../../utils/data'
import Meta from '../../components/Meta'
import Nextlink from 'next/link'
import {
   Button,
   Card,
   Grid,
   Link,
   List,
   ListItem,
   Rating,
   Typography,
} from '@mui/material'
import UseStyles from '../../utils/styles'
import Image from 'next/image'

const ProductScreen = () => {
   const classes = UseStyles()
   const router = useRouter()
   const { slug } = router.query
   const product = data.products.find((p) => p.slug === slug)
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
                  <Typography  gutterBottom>
                     Back to Products
                  </Typography>
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
                              //    onClick={addToCartHandler}
                           >
                              Add to cart
                           </Button>
                        </ListItem>
                     </List>
                  </Card>
               </Grid>
            </Grid>
         </Grid>
      </>
   )
}

export default ProductScreen