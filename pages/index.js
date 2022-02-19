import { Grid } from '@mui/material'
import ProductItem from '../components/ProductItem'
// import data from '../utils/data'
import db from '../utils/db'
import Product from '../models/Product'

export default function Home({ products }) {
   return (
      <div>
         <h1>Products</h1>
         <Grid container spacing={3}>
            {products.map((product) => (
               <Grid item md={4} key={product.name}>
                  <ProductItem
                     product={product}
                     // addToCartHandler={addToCartHandler}
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
