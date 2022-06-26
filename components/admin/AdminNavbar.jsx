import NextLink from 'next/link'
import { useContext } from 'react'
import { AppBar, Link, Toolbar, Typography, Box, Button } from '@mui/material'

import UiContext from '@/context/ui/UiContext'

const AdminNavbar = () => {
  const { toogleSideMenu } = useContext(UiContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>Shop |</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />

        <Button onClick={toogleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}

export default AdminNavbar
