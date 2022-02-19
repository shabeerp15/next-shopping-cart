import { useRouter } from 'next/router'
import data from '../../utils/data'
import Meta from '../../components/Meta'

const ProductScreen = () => {
   const router = useRouter()
   const { slug } = router.query
   const product = data.products.find(p => p.slug === slug)
   if(!product) {
      return <>
      <Meta title="Product not found" description={`Product ${slug} not found`} />
      <div>Product not found</div>
      </>
   }
   return <div>
       <>
       <Meta title={product.name} description={product.description} keywords={product.description} />
       <h1>{product.name}</h1>
       </>
   </div>
}

export default ProductScreen
