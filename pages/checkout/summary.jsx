import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
  Link,
  Chip,
} from '@mui/material'
import Cookies from 'js-cookie'

import ShopLayout from '@/components/layouts/ShopLayout'
import CartList from '@/components/cart/CartList'
import OrderSummary from '@/components/cart/OrderSummary'
import CartContext from '@/context/cart/CartContext'

const SummaryPage = () => {
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext)
  const { firstName, lastName, address, zipCode, city, country, phone } =
    shippingAddress
  const router = useRouter()

  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }
  }, [router])

  const handleCreateOrder = async () => {
    setIsPosting(true)
    const { hasError, message } = await createOrder()
    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }
    router.replace(`/orders/${message}`)
  }

  return (
    <ShopLayout title="Cart Summary" pageDescription={'Order Summary'}>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Order Summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({numberOfItems} products)
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>{address}</Typography>
              <Typography>
                {city}, {zipCode}
              </Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  onClick={handleCreateOrder}
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>
                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
