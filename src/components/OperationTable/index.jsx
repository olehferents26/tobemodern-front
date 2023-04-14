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
   Paper
} from '@mui/material';

import { mockedOperationsData } from '../../services/mockedData';

const OperationsTable = (props) => {
   const { } = props;

   return (
      <Box>
         <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Operations</Typography>

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Назва</TableCell>
                     <TableCell align="left">Param 1</TableCell>
                     <TableCell align="left">Param 2</TableCell>
                     <TableCell align="left">Param 3</TableCell>
                     <TableCell align="left">Param 4</TableCell>
                     <TableCell align="left">Param 5</TableCell>
                     <TableCell align="left">Param 6</TableCell>
                     <TableCell align="left">Param 7</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {mockedOperationsData.map((project) => (
                     <TableRow
                        key={project.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {project.name}
                        </TableCell>
                        <TableCell align="left">{project.param1}</TableCell>
                        <TableCell align="left">{project.param2}</TableCell>
                        <TableCell align="left">{project.param3}</TableCell>
                        <TableCell align="left">{project.param4}</TableCell>
                        <TableCell align="left">{project.param5}</TableCell>
                        <TableCell align="left">{project.param6}</TableCell>
                        <TableCell align="left">{project.param7}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default OperationsTable;