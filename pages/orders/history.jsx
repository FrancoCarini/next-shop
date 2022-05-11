import NextLink from 'next/link'
import { Chip, Grid, Typography, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import ShopLayout from '@/components/layouts/ShopLayout'

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

const rows = [
  { id: 1, paid: true, fullname: 'Franco Carini' },
  { id: 2, paid: false, fullname: 'Carlos Mello' },
  { id: 3, paid: true, fullname: 'Josefina Hernandez' },
]

const HistoryPage = () => {
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

export default HistoryPage
