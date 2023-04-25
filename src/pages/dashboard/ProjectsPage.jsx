import { Box } from '@mui/material'
import React from 'react'
import AddButton from '../../components/AddButton/index.jsx'
import ProjectsTable from '../../components/ProjectsTable/index.jsx'

const ProjectsPage = () => {
  return (
    <Box sx={{ width: '70%', paddingLeft: '50px', paddingRight: '50px', marginTop: '25px' }}>
      <ProjectsTable />
    </Box>
  )
}

export default ProjectsPage
