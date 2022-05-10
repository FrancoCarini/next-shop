import ShopLayout from '@/components/layouts/ShopLayout'
import { Typography } from '@mui/material'

export default function Home() {
  return (
    <ShopLayout title={'Teslo-Shop'} pageDescription={'Find the best products'}>
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        All Products
      </Typography>
    </ShopLayout>
  )
}
