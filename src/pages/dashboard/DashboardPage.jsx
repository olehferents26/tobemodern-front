import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveUser } from '../../redux/user'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

import { useGetCurrentUserQuery } from '../../services/userApi'

import { useIsAdmin } from '../../hooks/useIsAdmin'


const DashboardPage = () => {
    const {data: user} = useGetCurrentUserQuery()
    const dispatch = useDispatch()

    const isTablet = useMediaQuery('(max-width:1100px)');
    const isAdmin = useIsAdmin()
    
    useEffect(()=>{
      if(user) dispatch(saveUser(user))
    },[user])

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
