import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { SWRConfig } from 'swr'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import UiProvider from '@/context/ui/UiProvider'
import CartProvider from '@/context/cart/CartProvider'
import AuthProvider from '@/context/auth/AuthProvider'
import lightTheme from '@/themes/light-theme'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
