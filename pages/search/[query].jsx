import ShopLayout from '@/components/layouts/ShopLayout'
import { Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'
import { connect, disconnect } from '@/database/db'
import Product from '@/models/Product'

export default function SearchPage({ products, query }) {
  return (
    <ShopLayout
      title={'Teslo-Shop - Search'}
      pageDescription={'Find the best products'}
    >
      <Typography variant="h1" component="h1">
        Search for product
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        Your Search: {query}
      </Typography>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <Typography variant="h2" sx={{ mt: 2 }}>
          No products related to your query
        </Typography>
      )}
    </ShopLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { query } = params
  await connect()
  const products = await Product.find({ $text: { $search: query } }).lean()
  await disconnect()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      query,
    },
  }
}
