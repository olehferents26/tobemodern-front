import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import AddButton from '../../components/AddButton'
import Dialog from '../../components/Dialog'
import EmployeeAddForm from '../../components/EmployeeAddForm'
import EmployeesTable from '../../components/EmployeesTable'

const EmployeesPage = () => {
  const isTablet = useMediaQuery('(max-width:1100px)');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  const openAddForm = () => setIsAddFormOpen(true)

  const closeAddForm = () => setIsAddFormOpen(false)

  return (
    <>
      {isTablet &&
        <Box sx={{ width: '100%', paddingLeft: '30px', paddingRight: '30px', marginTop: '25px' }}>
          <Box mb='20px' sx={{ display: 'flex', justifyContent: 'end' }}>
            <AddButton text="Додати працівника" onClick={openAddForm} />
          </Box>
          <EmployeesTable />
          <Dialog
            isOpen={isAddFormOpen}
            onClose={closeAddForm}
          >
            <EmployeeAddForm onCancel={closeAddForm} />
          </Dialog>
        </Box>
      }

      {!isTablet &&
        <Box sx={{ width: '70%', paddingLeft: '50px', paddingRight: '50px', marginTop: '25px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <AddButton text="Додати працівника" onClick={openAddForm} />
          </Box>
          <EmployeesTable />
          <Dialog
            isOpen={isAddFormOpen}
            onClose={closeAddForm}
          >
            <EmployeeAddForm onCancel={closeAddForm} />
          </Dialog>
        </Box>
      }
    </>
  )
}

export default EmployeesPage
