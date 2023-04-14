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

import { mockedDetailsData } from '../../services/mockedData';

const DetailsTable = (props) => {
   const { } = props;

   return (
      <Box>
         <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Details</Typography>

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
                     <TableCell align="left">Param 8</TableCell>
                     <TableCell align="left">Param 9</TableCell>
                     <TableCell align="left">Param 10</TableCell>
                     <TableCell align="left">Param 11</TableCell>
                     <TableCell align="left">Param 12</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {mockedDetailsData.map((project) => (
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
                        <TableCell align="left">{project.param8}</TableCell>
                        <TableCell align="left">{project.param9}</TableCell>
                        <TableCell align="left">{project.param10}</TableCell>
                        <TableCell align="left">{project.param11}</TableCell>
                        <TableCell align="left">{project.param12}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default DetailsTable;