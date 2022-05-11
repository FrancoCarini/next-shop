import NextLink from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
  Link,
} from '@mui/material'

import ShopLayout from '@/components/layouts/ShopLayout'
import CartList from '@/components/cart/CartList'
import OrderSummary from '@/components/cart/OrderSummary'

const SummaryPage = () => {
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
              <Typography variant="h2">Summary (3 products)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>Franco Carini</Typography>
              <Typography>Cabildo 2222</Typography>
              <Typography>Ciudad de Buenos Aires, 1428</Typography>
              <Typography>Argentina</Typography>
              <Typography>+5491154646464654</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
