import * as React from 'react';
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
   useMediaQuery
} from '@mui/material';

const OperationsTable = (props) => {
   const { operationsData } = props;
   const isMobile = useMediaQuery('(max-width:540px)');

   return (
      <Box>
         <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Операції</Typography>

         <TableContainer component={Paper} sx={{ maxWidth: isMobile ? '350px' : '900px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="left" sx={{ maxWidth: '40px' }}>Порядковий номер</TableCell>
                     <TableCell align="left">Код операції</TableCell>
                     <TableCell align="left">Операція</TableCell>
                     <TableCell align="center">Статус виконаної роботи</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {operationsData.map((project, index) => (
                     <TableRow key={project.id}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{project.param1}</TableCell>
                        <TableCell align="left">{project.param2}</TableCell>
                        <TableCell align="center">{project.param3}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default OperationsTable;