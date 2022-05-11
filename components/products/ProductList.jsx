import { Grid } from '@mui/material'

import ProductCard from './ProductCard'

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  )
}

export default ProductList
