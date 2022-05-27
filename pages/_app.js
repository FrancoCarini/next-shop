import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { SWRConfig } from 'swr'

import UiProvider from '@/context/ui/UiProvider'
import CartProvider from '@/context/cart/CartProvider'
import AuthProvider from '@/context/auth/AuthProvider'
import lightTheme from '@/themes/light-theme'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  )
}

export default MyApp
