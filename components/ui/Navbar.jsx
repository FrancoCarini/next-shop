import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

import UiContext from '@/context/ui/UiContext'
import CartContext from '@/context/cart/CartContext'

const Navbar = () => {
  const { asPath } = useRouter()

  const { toogleSideMenu } = useContext(UiContext)
  const { numberOfItems } = useContext(CartContext)

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

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref>
            <Link>
              <Button color={asPath === '/category/kids' ? 'primary' : 'info'}>
                Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toogleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
