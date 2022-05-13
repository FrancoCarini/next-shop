import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { SWRConfig } from 'swr'

import UiProvider from '@/context/ui/UiProvider'
import CartProvider from '@/context/cart/CartProvider'
import lightTheme from '@/themes/light-theme'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </SWRConfig>
  )
}

export default MyApp
