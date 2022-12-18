import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import Sidebar from '../../components/Sidebar/index.jsx'

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
