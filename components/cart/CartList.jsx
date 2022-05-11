import { Fragment } from 'react'
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
import { initialData } from '@/database/products'
import ItemCounter from '../ui/ItemCounter'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

const CartList = ({ editable }) => {
  return (
    <Fragment>
      {productsInCart.map((product) => (
        <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
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
                Size: <strong>M</strong>
                {editable ? (
                  <ItemCounter />
                ) : (
                  <Typography variant="h5">3 items</Typography>
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
              <Button variant="text" color="secondary">
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
