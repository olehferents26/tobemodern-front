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
   MenuItem,
   useMediaQuery
} from '@mui/material';

const DetailsTable = (props) => {
   const { title, detailsData } = props;
   const isMobile = useMediaQuery('(max-width:540px)');
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

         <TableContainer component={Paper} sx={{ maxWidth: isMobile ? '350px' : '100%', maxHeight: 450 }}>
            <Table stickyHeader aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="left">Найменування</TableCell>
                     <TableCell align="left">Кількість</TableCell>

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
                     <TableCell align="left">Матеріал</TableCell>

                     <TableCell align="left">Опис</TableCell>
                    {/*  <TableCell align="left">Статус</TableCell> */}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {detailsData.map((project) => (
                     <TableRow
                        key={project.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell>{project.name}</TableCell>
                        <TableCell align="center">{project.amount}</TableCell>
                        <TableCell align="left">{project.thickness}</TableCell>
                        <TableCell align="left">{project.length}</TableCell>
                        <TableCell align="left">{project.width}</TableCell>
                        <TableCell align="left">{project.topLength}</TableCell>
                        <TableCell align="left">{project.bottomLength}</TableCell>
                        <TableCell align="left">{project.rightWidth}</TableCell>
                        <TableCell align="left">{project.leftWidth}</TableCell>
                        <TableCell align="left">{project.path}</TableCell>
                        <TableCell align="left">{project.drilling}</TableCell>
                        <TableCell align="left">{project.milling}</TableCell>
                        <TableCell align="left">{project.material}</TableCell>
                        <TableCell sx={{ minWidth: '90px' }} align="left">{project.desc}</TableCell>
                        {/* <TableCell>
                           <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <Select
                                 value={project.status}
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
                        </TableCell> */}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default DetailsTable;