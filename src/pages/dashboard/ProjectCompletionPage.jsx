import React from 'react'
import { Box } from '@mui/material'
import ComplectationTable from '../../components/ComplectationTable';
import { mockedComplectationsData } from '../../services/mockedData';

const ProjectCompletionPage = () => {

   return (
      <Box mt='30px'>
         <ComplectationTable complectationsData={mockedComplectationsData} />
      </Box>
   )
}

export default ProjectCompletionPage;
