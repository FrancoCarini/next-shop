import ShopLayout from '@/components/layouts/ShopLayout'
import { Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'
import useProducts from '@/hooks/useProducts'
import FullScreenLoading from '@/components/ui/FullScreenLoading'

export default function WomenPage() {
  const { products, isLoading } = useProducts('products?gender=women')

  return (
    <ShopLayout
      title={'Teslo-Shop - Women'}
      pageDescription={'Find the best products for women'}
    >
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        All Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}
