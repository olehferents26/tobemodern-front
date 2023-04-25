import { Box } from '@mui/material'
import React, { useState } from 'react'
import AddButton from '../../components/AddButton'
import Dialog from '../../components/Dialog'
import EmployeeAddForm from '../../components/EmployeeAddForm'
import EmployeesTable from '../../components/EmployeesTable'

const EmployeesPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  const openAddForm = () => setIsAddFormOpen(true)

  const closeAddForm = () => setIsAddFormOpen(false)

  return (
    <Box sx={{ width: '70%', paddingLeft: '50px', paddingRight: '50px', marginTop: '25px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <AddButton text="Додати працівника" onClick={openAddForm}/>
      </Box>
      <EmployeesTable/>
      <Dialog
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
      >
        <EmployeeAddForm onCancel={closeAddForm} />
      </Dialog>
    </Box>
  )
}

export default EmployeesPage
