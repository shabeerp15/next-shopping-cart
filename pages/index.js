import { Grid } from '@mui/material'
import ProductItem from '../components/ProductItem'
import data from '../utils/data'

export default function Home() {
  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {data.products.map((product) => (
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
