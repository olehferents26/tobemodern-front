import { useEffect, useState } from 'react';
import {
   TableCell,
   TableRow,
   Select,
   MenuItem
} from '@mui/material';

const OperationItem = (props) => {
   const { project, setOperations, index, operations } = props;

   const [selectedOption, setSelectedOption] = useState(status);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (selectedOption === 2) {
      intervalId = setInterval(() => {
      // покаує секунди
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if(selectedOption === 1) {
      clearInterval(intervalId);
       // тут потрібна логіка запитів щоб записати значення витрачених годин
      setSeconds(0)
    } else {
      clearInterval(intervalId);
      // тут потрібна логіка запитів щоб записати значення витрачених годин
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedOption]);

    const handleSelectChangeStatus = (event, project) => {
      const optionValue = event.target.value;
      const operationsCoppied = [...operations]

      operationsCoppied.map((item) => {
         if(item.id === project.id) item.status = optionValue
      })
      
      setOperations(operationsCoppied)
      setSelectedOption(optionValue)
      //  отправляем запрос на изменение данных с новым свойсвтом - status
    };

      // Преобразование минут в часы и минуты
      const formatTime = (value, param = 'second') => {
        if(param === 'hour') {
          const hours = Math.floor(value / 3600);
          return hours
        }
        if(param === 'minute') {
          const hours = Math.floor(value / 60);
          return hours
        }
        return value
      };

   return (
      <TableRow key={project?.id}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{project?.param1}</TableCell>
        <TableCell align="left">{project?.param2}</TableCell>
        <TableCell align="center">{project?.employeeId}</TableCell>
        <TableCell align="center">{
          project?.paramHour ? project.paramHour : formatTime(seconds)
        }</TableCell>
        <TableCell align="center">
            <Select value={project?.status || 1} onChange={(e) => handleSelectChangeStatus(e, project)}>
              <MenuItem value={1}>В планах</MenuItem>
              <MenuItem value={2}>В процессі</MenuItem>
              <MenuItem value={3}>Зроблено</MenuItem>
            </Select>   
        </TableCell>
      </TableRow>
   )
};

export default OperationItem;