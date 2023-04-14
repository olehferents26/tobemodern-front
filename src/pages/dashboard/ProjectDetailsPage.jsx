import React from 'react'
import {
   styled,
   Typography,
   Box,
   Button
} from '@mui/material';

import OperationsTable from '../../components/OperationTable/index.jsx';
import DetailsTable from '../../components/DetailsTable/index.jsx';

const HeaderStyle = styled('div')(() => ({
   width: "100%",
   height: '50px',
   display: 'flex',
   alignItems: 'center'
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
   border: '1px solid #795EA4',
   color: '#2F2F2F',
   textTransform: 'none'
}));

const ProjectDetailsPage = () => {
   return (
      <Box sx={{ width: '70%', paddingLeft: '72px', paddingRight: '72px', marginTop: '25px' }}>
         <HeaderStyle>
            <Typography fontSize={32} fontWeight={800}>
               {'Project 1'}
            </Typography>

            <Box ml='70px' sx={{ width: '500px', display: 'flex', justifyContent: 'space-between' }}>
               <ButtonStyle>В прогресі</ButtonStyle>
               <ButtonStyle>Операції</ButtonStyle>
               <ButtonStyle>Деталі</ButtonStyle>
               <ButtonStyle>Комплектування</ButtonStyle>
            </Box>
         </HeaderStyle>

         <Box mt='30px'>
            <Typography fontWeight={600} fontSize={16} color='#8A8A8A'>{`user name`}</Typography>
            <Typography fontWeight={600} fontSize={16} color='#8A8A8A'>{'employee'}</Typography>
         </Box>

         <Box mt='30px'>
            <OperationsTable />
         </Box>

         <Box mt='30px' mb='30px'>
            <DetailsTable />
         </Box>
      </Box>
   )
}

export default ProjectDetailsPage;
