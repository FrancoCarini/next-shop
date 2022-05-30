import NextLink from 'next/link'
import { getSession } from 'next-auth/react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Link,
  Chip,
} from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

import ShopLayout from '@/components/layouts/ShopLayout'
import CartList from '@/components/cart/CartList'
import OrderSummary from '@/components/cart/OrderSummary'
import { connect, disconnect } from '@/database/db'
import Order from '@/models/Order'

const OrderPage = ({ order }) => {
  return (
    <ShopLayout title="Order Summary" pageDescription={'Order Summary'}>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Order: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Payment Pending"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Already Paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={order.items} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({order.numberOfItems} product(s))
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>
              </Box>

              <Typography>
                {order.shippingAddress.firstName}
                {order.shippingAddress.lastName}
              </Typography>
              <Typography>{order.shippingAddress.address}</Typography>
              <Typography>
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </Typography>
              <Typography>{order.shippingAddress.country}</Typography>
              <Typography>{order.shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  total: order.total,
                  tax: order.tax,
                }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Already Paid"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pagar</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const { id = '' } = query
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    }
  }

  await connect()
  const order = await Order.findById(id)
  await disconnect()

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    }
  }

  if (order.user.toString() !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  }
}

export default OrderPage
