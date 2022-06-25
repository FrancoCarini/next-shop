import { useState } from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { PayPalButtons } from '@paypal/react-paypal-js'

import ShopLayout from '@/components/layouts/ShopLayout'
import CartList from '@/components/cart/CartList'
import OrderSummary from '@/components/cart/OrderSummary'
import { connect, disconnect } from '@/database/db'
import Order from '@/models/Order'

const OrderPage = ({ order }) => {
  const [isPaying, setisPaying] = useState(false)
  const router = useRouter()

  const onOrderCompleted = async (details) => {
    if (details.status !== 'COMPLETED') {
      return alert('There is no payment in PayPal')
    }

    setisPaying(true)

    try {
      const { data } = await axios.post('/orders/pay', {
        transactionId: details.id,
        orderId: order._id,
      })

      router.reload()
    } catch (error) {
      setisPaying(false)
      console.log(error)
      alert('Error')
    }
  }

  return (
    <ShopLayout title="Order Summary" pageDescription={'Order Summary'}>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Order: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Already Paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Payment Pending"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
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
                {isPaying && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    className="fadeIn"
                  >
                    <CircularProgress />
                  </Box>
                )}
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Already Paid"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: `${order.total}`,
                            },
                          },
                        ],
                      })
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        onOrderCompleted(details)
                      })
                    }}
                  />
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
