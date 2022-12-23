import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const DashboardPage = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardPage
