import { alpha, Box, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useIsAdmin } from '../../hooks/useIsAdmin.js'
import AddIcon from '../../icons/AddIcon.jsx'
import EmployeeIcon from '../../icons/EmployeeIcon.jsx'
import ProjectsIcon from '../../icons/ProjectsIcon.jsx'

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: '340px',
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
}))

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '20px',
  height: '80px',
  paddingLeft: '43px',
  borderBottom: '2px solid #E8E5EC',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.20),
  },
}))

const sidebarItems = [
  {
    name: 'Проекти',
    icon: <ProjectsIcon/>,
    path: '/dashboard/projects',
  },
  {
    name: 'Працівники',
    icon: <EmployeeIcon/>,
    path: '/dashboard/employee',
  },
  {
    name: 'Налаштування',
    icon: <ProjectsIcon/>,
    path: '/dashboard/settings',
  },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()

  const handleNavigation = (path) => navigate(path)

  return (
    <Container>
      {isAdmin && (
        <Box sx={{
          height: '126px',
          borderBottom: '2px solid #E8E5EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F4FF',
        }}>
          <Box sx={{
            width: '278px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid #795EA4',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
            <AddIcon />
            <Typography fontWeight="bold" textTransform="uppercase"> Новий проект</Typography>
          </Box>
        </Box>
      )}
      {sidebarItems.map(({ name, icon, path }, index) => {
        if (!isAdmin && name === 'Працівники') {
          return <></>
        }
        return (
          <SidebarItem
            key={name}
            onClick={() => handleNavigation(path)}
          >
            {icon}
            <Typography fontWeight="bold">{name}</Typography>
          </SidebarItem>
        )
      })}
    </Container>
  )
}

export default Sidebar
