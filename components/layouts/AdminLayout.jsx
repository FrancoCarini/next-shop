import { Fragment } from 'react'
import { Box, Typography } from '@mui/material'

import AdminNavbar from '../admin/AdminNavBar'
import SideMenu from '../ui/SideMenu'

const AdminLayout = ({ children, title, subtitle, icon }) => {
  return (
    <Fragment>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
      <footer></footer>
    </Fragment>
  )
}

export default AdminLayout
