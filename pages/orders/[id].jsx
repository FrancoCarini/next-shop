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
  Chip,
} from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

import ShopLayout from '@/components/layouts/ShopLayout'
import CartList from '@/components/cart/CartList'
import OrderSummary from '@/components/cart/OrderSummary'

const OrderPage = () => {
  return (
    <ShopLayout title="Order Summary" pageDescription={'Order Summary'}>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Order: 321hi123h123h
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Payment Pending"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label="Already Paid"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

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
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Already Paid"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage
