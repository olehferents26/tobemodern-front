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
   Select,
   FormControl,
   MenuItem
} from '@mui/material';

import { mockedDetailsData } from '../../services/mockedData';

const DetailsTable = (props) => {
   const { title, detailsData } = props;

   const [status, setStatus] = React.useState('');

   const handleChangeStatus = (event) => {
      setStatus(event.target.value);
   };

   React.useEffect(() => {
      setStatus()
   }, [])

   return (
      <Box>
         <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>{title}</Typography>

         <TableContainer component={Paper} sx={{ width: '100%',  maxHeight: 450 }}>
            <Table stickyHeader sx={{ minWidth: 650}} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="left">Найменування</TableCell>
                     <TableCell align="left">Матеріал</TableCell>
                     <TableCell align="left">Виріб</TableCell>
                   
                     <TableCell align="left">Товщина</TableCell>
                     <TableCell align="left">Довжина</TableCell>
                     <TableCell align="left">Ширина</TableCell>
                     
                     <TableCell align="left">Зверху (довжина)</TableCell>
                     <TableCell align="left">Знизу (довжина)</TableCell>
                     <TableCell align="left">Зправа (ширина)</TableCell>
                     <TableCell align="left">Зліва (ширина)</TableCell>
                     
                     <TableCell align="left">Паз</TableCell>
                     <TableCell align="left">Сверління</TableCell>
                     <TableCell align="left">Фрезерування</TableCell>
                     <TableCell align="left">Опис</TableCell>
                     <TableCell align="left">Кількість</TableCell>
                     <TableCell align="left">Статус</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {detailsData.map((project) => (
                     <TableRow
                        key={project.id}
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
                        <TableCell align="left" width='200px'>{project.param7}</TableCell>
                        <TableCell align="left">{project.param8}</TableCell>
                        <TableCell align="left">{project.param9}</TableCell>
                        <TableCell align="left">{project.param10}</TableCell>
                        <TableCell align="left">{project.param11}</TableCell>
                        <TableCell align="left">{project.param12}</TableCell>
                        <TableCell align="left">{project.param13}</TableCell>
                        <TableCell align="left">{project.param14}</TableCell>
                        <TableCell>
                           <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <Select
                                 value={project.param15}
                                 onChange={handleChangeStatus}
                                 displayEmpty
                                 inputProps={{ 'aria-label': 'Without label' }}
                              >
                                 <MenuItem value="В роботі">
                                    В роботі
                                 </MenuItem>
                                 <MenuItem value='Готово'>Готово</MenuItem>
                                 <MenuItem value='Брак'>Брак</MenuItem>
                              </Select>
                           </FormControl>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default DetailsTable;