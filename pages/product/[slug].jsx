import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import ProductSlideshow from '@/components/products/ProductSlideshow'
import ItemCounter from '@/components/ui/ItemCounter'
import SizeSelector from '@/components/products/SizeSelector'
import { connect, disconnect } from '@/database/db'
import Product from '@/models/Product'
import ShopLayout from '@/components/layouts/ShopLayout'
import CartContext from '@/context/cart/CartContext'

const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext)
  const {
    _id,
    images,
    price,
    sizes,
    slug,
    title,
    gender,
    inStock,
    description,
  } = product

  const router = useRouter()

  const [tempCartProduct, setTempCartProduct] = useState({
    _id,
    image: images[0],
    price,
    size: undefined,
    slug,
    title,
    gender,
    quantity: 1,
  })

  const selectedSize = (size) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }))
  }

  const updateQuantity = (quantity) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }))
  }

  const handleAddProduct = () => {
    if (!tempCartProduct.size) return
    addProduct(tempCartProduct)
    router.push('/cart')
  }

  return (
    <ShopLayout title={title} pageDescription={description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${price}`}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                onUpdateQuantity={updateQuantity}
                maxValue={inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={sizes}
                onSelectedSize={selectedSize}
              />
            </Box>

            {inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={handleAddProduct}
              >
                {tempCartProduct.size ? 'Add to Cart' : 'Select Size'}
              </Button>
            ) : (
              <Chip label="Not Available" color="error" variant="outlined" />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths = async () => {
  await connect()

  const productSlugs = await Product.find().select('slug -_id').lean()
  await disconnect()

  const slugsArray = productSlugs.map((slug) => {
    return {
      params: {
        slug: slug.slug,
      },
    }
  })

  return {
    paths: slugsArray,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug = '' } = params

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
    revalidate: 60 * 60 * 24,
  }
}

export default ProductPage
