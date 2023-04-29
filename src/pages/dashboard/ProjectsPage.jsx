import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import ProjectsTable from '../../components/ProjectsTable/index.jsx'
import FurnitureTable from '../../components/FurnitureTable/FurnitureTable.jsx';

const ProjectsPage = () => {
  const isTablet = useMediaQuery('(max-width:1100px)');

  return (
    <>
      {isTablet &&
        <Box sx={{ width: '100%', paddingLeft: '30px', paddingRight: '30px', marginTop: '25px' }}>
          <ProjectsTable />
        </Box>
      }

      {!isTablet &&
        <Box sx={{ width: '70%', paddingLeft: '50px', paddingRight: '50px', marginTop: '25px' }}>
          <ProjectsTable />
        </Box>
      }
    </>
  )
}

export default ProjectsPage
