import NextLink from 'next/link'
import { getSession } from 'next-auth/react'
import { Chip, Grid, Typography, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import ShopLayout from '@/components/layouts/ShopLayout'
import { connect, disconnect } from '@/database/db'
import Order from '@/models/Order'

const columns = [
  { field: 'id', headerName: 'ID', width: 100, flex: 1 },
  { field: 'fullname', headerName: 'Full Name', width: 300, flex: 1 },
  {
    field: 'paid',
    headerName: 'Paid',
    width: 200,
    flex: 1,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Payment Pending" variant="outlined" />
      )
    },
  },
  {
    field: 'order',
    headerName: 'View Order',
    width: 200,
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link>View Order</Link>
        </NextLink>
      )
    },
  },
]

const HistoryPage = ({ orders }) => {
  const rows = orders.map((order) => {
    return {
      id: order._id,
      paid: order.isPaid,
      fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    }
  })
  return (
    <ShopLayout title={'Orders History'} pageDescription={'All orders history'}>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Orders History
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagesSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    }
  }

  await connect()
  const orders = await Order.find({ user: session.user._id })
  await disconnect()

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  }
}

export default HistoryPage
