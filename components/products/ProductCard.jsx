import { useState, useMemo } from 'react'
import NextLink from 'next/link'
import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
} from '@mui/material'

const ProductCard = ({ product }) => {
  const { images, title, price } = product

  const [isHovered, setisHovered] = useState(false)
  const [isImageLoaded, setisImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? `/products/${images[1]}` : `/products/${images[0]}`
  }, [isHovered, images])

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <CardMedia
                component="img"
                image={productImage}
                alt={title}
                className="fadeIn"
                onLoad={() => setisImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{title}</Typography>
        <Typography fontWeight={500}>{`$${price}`}</Typography>
      </Box>
    </Grid>
  )
}

export default ProductCard
