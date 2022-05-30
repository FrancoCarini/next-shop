import { Fragment, useContext } from 'react'
import NextLink from 'next/link'
import {
  Grid,
  Link,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Button,
} from '@mui/material'
import ItemCounter from '../ui/ItemCounter'
import CartContext from '@/context/cart/CartContext'

const CartList = ({ editable = false, products = [] }) => {
  const { cart, updateQuantity, removeProduct } = useContext(CartContext)

  const newProductQuantity = (product, newQuantity) => {
    product.quantity = newQuantity
    updateQuantity(product)
  }

  const removeCartProduct = (product) => {
    removeProduct(product)
  }

  const productsToShow = products.length ? products : cart

  return (
    <Fragment>
      {productsToShow.map((product) => (
        <Grid
          key={`${product.slug}-${product.size}`}
          container
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/slug/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography component="div" variant="body1">
                Size: <strong>{product.size}</strong>
                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={product.inStock}
                    onUpdateQuantity={(newQuantity) =>
                      newProductQuantity(product, newQuantity)
                    }
                  />
                ) : (
                  <Typography variant="h5">
                    {product.quantity} item(s)
                  </Typography>
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeCartProduct(product)}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </Fragment>
  )
}

export default CartList
