import { useContext } from 'react'
import { useRouter } from 'next/router'
import ShopLayout from '@/components/layouts/ShopLayout'
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

import countries from '@/utils/countries'
import CartContext from '@/context/cart/CartContext'

const AddressPage = () => {
  const router = useRouter()
  const { updateAddress } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: Cookies.get('firstName') || '',
      lastName: Cookies.get('lastName') || '',
      address: Cookies.get('address') || '',
      zipCode: Cookies.get('zipCode') || '',
      city: Cookies.get('city') || '',
      country: Cookies.get('country') || '',
      phone: Cookies.get('phone') || '',
    },
  })

  const handleAddress = (formData) => {
    updateAddress(formData)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title="Address" pageDescription={'Confirm address'}>
      <form onSubmit={handleSubmit(handleAddress)} noValidate>
        <Typography variant="h1" component="h1">
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'First Name is required',
              })}
              error={errors.firstName ? true : false}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'Last Name is required',
              })}
              error={errors.lastName ? true : false}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'Address is required',
              })}
              error={errors.address ? true : false}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              variant="filled"
              fullWidth
              {...register('zipCode', {
                required: 'Zip Code is required',
              })}
              error={errors.zipCode ? true : false}
              helperText={errors.zipCode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'City is required',
              })}
              error={errors.city ? true : false}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Country"
                defaultValue={
                  Cookies.country ? Cookies.country : countries[0].code
                }
                {...register('country', {
                  required: 'Country is required',
                })}
                error={errors.country ? true : false}
                helperText={errors.country?.message}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'City is required',
              })}
              error={errors.phone ? true : false}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddressPage
