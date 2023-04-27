import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Typography,
   Box,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   styled,
   useMediaQuery
} from '@mui/material';

const ImageStyles = styled('img')(({ theme }) => ({
   width: '200px',
   height: '100px',
   objectFit: 'contain'
}));

const ComplectationTable = (props) => {
   const { complectationsData } = props;
   const navigate = useNavigate();
   const isMobile = useMediaQuery('(max-width:540px)');

   return (
      <Box>
         <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Комплектування</Typography>

         <TableContainer component={Paper} sx={{ maxWidth: isMobile ? '350px' : '900px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell width='200px' align="left">Зображення</TableCell>
                     <TableCell align="left">Найменування</TableCell>
                     <TableCell align="center">Кількість деталей</TableCell>
                     <TableCell align="center">Кількість фурнітури</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {complectationsData.map((project, index) => (
                     <TableRow key={project.id}>
                        <TableCell
                           onClick={() => navigate('/dashboard/project/configuration')}
                           align="left"
                           sx={{cursor: 'pointer'}}
                        >
                           <ImageStyles src={project.param1} alt={'photo'} />
                        </TableCell>
                        <TableCell align="left">{project.param2}</TableCell>
                        <TableCell align="center">{project.param3}</TableCell>
                        <TableCell align="center">{project.param4}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default ComplectationTable;