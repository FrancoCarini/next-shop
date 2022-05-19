import { useState, useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

import AuthContext from '@/context/auth/AuthContext'
import AuthLayout from '@/components/layouts/AuthLayout'

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)
  const [showError, setShowError] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleRegister = async ({ name, email, password }) => {
    setShowError(false)

    const { hasError, message } = await registerUser(email, password, name)
    if (hasError) {
      seterrorMessage(message)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      return
    }

    const destination = router.query.p?.toString() || '/'
    router.replace(destination)
  }

  return (
    <AuthLayout title={'Register'}>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Register
              </Typography>
              {showError && (
                <Chip
                  label={errorMessage}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Fullname"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Use at least 3 charachters',
                  },
                })}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                    message: 'invalid email address',
                  },
                })}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Use at least 6 charachters',
                  },
                })}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                fullWidth
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : '/auth/login'
                }
                passHref
              >
                <Link underline="always">Already have an account? Log In</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
