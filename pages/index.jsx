import ShopLayout from '@/components/layouts/ShopLayout'
import { initialData } from '@/database/products'
import { Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'

export default function Home() {
  return (
    <ShopLayout title={'Teslo-Shop'} pageDescription={'Find the best products'}>
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        All Products
      </Typography>
      <ProductList products={initialData.products} />
    </ShopLayout>
  )
}
