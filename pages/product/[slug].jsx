import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import ProductSlideshow from '@/components/products/ProductSlideshow'
import ItemCounter from '@/components/ui/ItemCounter'
import SizeSelector from '@/components/products/SizeSelector'
import { connect, disconnect } from '@/database/db'
import Product from '@/models/Product'

const ProductPage = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>

            <Button color="secondary" className="circular-btn">
              Add to Cart
            </Button>

            {/** 
              <Chip label="Not Available" color="error" variant="outlined" />
            */}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params
  await connect()
  const product = await Product.findOne({ slug }).lean()
  await disconnect()

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}

export default ProductPage