import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'

import lightTheme from '@/themes/light-theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
