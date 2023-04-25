import { alpha, Box, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsAdmin } from '../../hooks/useIsAdmin.js'
import EmployeeIcon from '../../icons/EmployeeIcon.jsx'
import ProjectsIcon from '../../icons/ProjectsIcon.jsx'
import AddButton from '../AddButton/index.jsx'
import Dialog from '../Dialog/index.jsx'
import NewProjectForm from '../NewProjectForm/index.jsx'
import SettingsIcon from '../../icons/SettingsIcon.jsx'

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minWidth: '340px',
  minHeight: '100vh',
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
    path: '/dashboard/employees',
  },
  {
    name: 'Налаштування',
    icon: <SettingsIcon/>,
    path: '/dashboard/settings',
  },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const handleNavigation = (path) => navigate(path)

  const openNewProjectModal = () => {
    setIsNewProjectModalOpen(true)
  }

  const onClose = () => setIsNewProjectModalOpen(false)

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
          <AddButton text="Новий проект" onClick={openNewProjectModal} />
        </Box>
      )}
      {isNewProjectModalOpen && (
        <Dialog isOpen={isNewProjectModalOpen} onClose={onClose}>
          <NewProjectForm onCancel={onClose} />
        </Dialog>
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
