import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'

const DashboardPage = () => {
  const isTablet = useMediaQuery('(max-width:1100px)');

  return (
    <Box>
      <Header />
      <Box sx={{ display: 'flex' }}>
        {!isTablet &&
          <Sidebar />
        }
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardPage
