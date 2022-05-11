import ShopLayout from '@/components/layouts/ShopLayout'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
} from '@mui/material'

import CardList from '@/components/cart/CartList'
import OrderSummary from '@/components/cart/OrderSummary'

const CartPage = () => {
  return (
    <ShopLayout title="Cart" pageDescription={'Shopping Cart'}>
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList editable={true} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage
