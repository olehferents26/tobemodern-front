import { Alert, alpha, Box, styled, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsAdmin } from '../../hooks/useIsAdmin.js'
import EmployeeIcon from '../../icons/EmployeeIcon.jsx'
import ProjectsIcon from '../../icons/ProjectsIcon.jsx'
import { useCreateProjectMutation } from '../../services/projectApi.js'
import AddButton from '../AddButton/index.jsx'
import AlertContainer from '../AlertContainer/index.jsx'

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
    path: '/dashboard/employees',
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

  const [projectFile, setProjectFile] = useState(null)
  const inputRef = useRef()

  const [createProject, createProjectMethods] = useCreateProjectMutation()

  const handleFileChange = (e) => {
    if (e.target.files) {
      setProjectFile(e.target.files[0]);
    }
  }

  const handleChooseFile = () => {
    inputRef.current.click()
  }

  const handleNavigation = (path) => navigate(path)

  useEffect(() => {
    if (projectFile) {
      const formData = new FormData()
      formData.append("file", projectFile)
      createProject(formData)
    }
  }, [projectFile]);

  return (
    <Container>
      <AlertContainer open={createProjectMethods.isError}>
        <Alert severity="error">Сталася помилка. Спробуйте ще раз</Alert>
      </AlertContainer>
      <AlertContainer open={createProjectMethods.isSuccess}>
        <Alert severity="success">Проект успішно завантажено</Alert>
      </AlertContainer>
      {isAdmin && (
        <Box sx={{
          height: '126px',
          borderBottom: '2px solid #E8E5EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F4FF',
        }}>
          <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <AddButton text="Новий проект" onClick={handleChooseFile} />
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
