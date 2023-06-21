import { FormControl, MenuItem, Select, TableCell, TableRow } from "@mui/material"
import { useEffect, useState } from "react"

const DetailsRowTableItem = (props) => {
  const { project, title } = props

  const getCurrentSelect = (title, project) => {
    if(title === 'Деталі в роботі') {
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={project.status}
                onChange={(e) => handleChangeStatusDetail(e, project)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem key={1} value='В роботі'>В роботі</MenuItem>
                <MenuItem key={2} value='Готово'>Готово</MenuItem>
                <MenuItem key={3} value='Брак'>Брак</MenuItem>
              </Select>
          </FormControl>
        )
    }
    if(title === 'Готові деталі') {
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={project.status}
                onChange={(e) => handleChangeStatusDetail(e, project)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value='Готово'>Готово</MenuItem>
                  <MenuItem value='Брак'>Брак</MenuItem>
              </Select>
          </FormControl>
        )
    }
    if(title === 'Браковані деталі') {
        return (
          <TableCell align="left">{project.status}</TableCell>
        )
    }
  }

  const handleChangeStatusDetail = (event, project) => {
    const optionValue = event.target.value;
    const detailsCoppied = [...details]

    // тут я додаю нове значення до обьекту из БД
    //  в ідеалі мати ці значення в БД і змінювати їх запитом
    detailsCoppied.map((item) => {
        if(item.id === project.id) item.status = optionValue
    })

    // Выполните необходимые действия при изменении селекта
    setDetails(detailsCoppied)
    //  отправляем запрос на изменение данных с новым свойсвтом - status

    // тут не вистачає логікиб щоб переміщувати деталі в різні таблиці при змінні їх статусу
    // все залежить від того як буде зроблений беккенд
    // якщо будуть приходити дані виду в 1 обєкті 3 різні масиви деталей уже відсортованих по статусу
    // тоді мі просто відправлямо запит на зміну статусу бек дає відповідь і данні перерисовуються самі
  };
    
  return (
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
      <TableCell align="center">{project?.employeeId}</TableCell>
      <TableCell>
        {getCurrentSelect(title, project)}
      </TableCell>
    </TableRow>
  )
}

export default DetailsRowTableItem