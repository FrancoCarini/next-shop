import { useState, useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Chip,
} from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

import AuthLayout from '@/components/layouts/AuthLayout'
import AuthContext from '@/context/auth/AuthContext'

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = async ({ email, password }) => {
    setShowError(false)

    const isValidLogin = await login(email, password)

    if (!isValidLogin) {
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
    <AuthLayout title={'Login'}>
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log In
              </Typography>
              {showError && (
                <Chip
                  label="No user with that email/password"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              )}
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
                error={errors.password}
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
                Login
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : '/auth/register'
                }
                passHref
              >
                <Link underline="always">Dont have an account? Register</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
