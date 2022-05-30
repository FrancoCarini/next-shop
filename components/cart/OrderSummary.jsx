import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'

import CartContext from '@/context/cart/CartContext'
import { format } from '@/utils/currency'

const OrderSummary = ({ orderValues = {} }) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)

  const summaryValues = Object.keys(orderValues).length
    ? orderValues
    : { numberOfItems, subTotal, tax, total }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{summaryValues.numberOfItems} item(s)</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{format(summaryValues.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{format(summaryValues.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">
          {format(summaryValues.total)}
        </Typography>
      </Grid>
    </Grid>
  )
}

OrderSummary.OrderSummary

export default OrderSummary
