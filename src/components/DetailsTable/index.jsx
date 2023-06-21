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

import DetailsRowTableItem from './detailsRowTableItem';

const DetailsTable = (props) => {
   const { title, detailsData } = props;
   const isMobile = useMediaQuery('(max-width:540px)');

   const [details, setDetails] = React.useState([])

   React.useEffect(() => {
      if(Array.isArray(detailsData)) {
         // фільтруємо елементи по статусу і відбираємо по таблицям
         let status = ''

         if(title.includes('роботі')) {
            status = 'В роботі'
         }
         if(title.includes('Готов')) {
            status = 'Готово'
         }
         if(title.includes('Брак')) {
            status = 'Брак'
         }
         
         setDetails([...detailsData].filter((details) => details?.status === status))
      }
   }, [detailsData])

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
                     <TableCell align="center">Робітник ID</TableCell>
                     <TableCell align="left">Статус</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {details.map((project) => (
                     <DetailsRowTableItem
                        key={project?.id}
                        project={project}
                        title={title}
                     />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default DetailsTable;