import { useSelector } from 'react-redux';
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
   useMediaQuery,
   Select,
   MenuItem
} from '@mui/material';

import OperationItem from '../OperationItem';

import { useIsAdmin } from '../../hooks/useIsAdmin';

const OperationsTable = (props) => {
   const { operationsData } = props;
   const isAdmin = useIsAdmin();
   const user = useSelector(({user}) => user.userData);
   const isMobile = useMediaQuery('(max-width:540px)');

   const [operations, setOperations] = React.useState([]);

  React.useEffect(()=>{
   if(Array.isArray(operationsData)) {
      // логіка додаваня нового значення потрібно тільки поки нема цього значееня в базі данних (1,2,3) потрібно для селектора в OperationItem
      // додаєм employeeId для тесту чи працює
      const operationsCoppied = [...operationsData].map((item, index) => {
         return {
            ...item,
            status: 1,
            employeeId: index === 0 ? 6 : 2
         }
      })
      let myOperations = operationsCoppied

      // фільтруєм значення і якщо не адмін показуєм тільки операції для робітника
      if(!isAdmin) myOperations = myOperations.filter((operation) => operation.employeeId === user?.id)
      setOperations([...myOperations])
   }
  },[])



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
                     <TableCell align="left">Робітник ID</TableCell>
                     <TableCell align="center">Витрачено годин</TableCell>
                     <TableCell align="center">Статус виконаної роботи</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {operations.map((project, index) => (
                     <OperationItem
                        key={project?.id}
                        project={project}
                        index={index}
                        setOperations={setOperations}
                        operations={operations}
                     />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default OperationsTable;