import { Alert, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddButton from '../../components/AddButton/index.jsx'
import AlertContainer from '../../components/AlertContainer/index.jsx'
import Button from '../../components/Button/index.jsx'
import Dialog from '../../components/Dialog/index.jsx'
import EmployeesTable from '../../components/EmployeesTable'
import { requiredFieldOption } from '../../helpers/form.js'
import { useCreateUserMutation } from '../../services/userApi.js'

const EmployeeAddForm = ({ onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [createUser, { isLoading, isSuccess, error }] = useCreateUserMutation()

  const onSubmit = data => createUser(data)

  useEffect(() => {
    if (isSuccess) {
      onCancel()
    }
  }, [isSuccess])

  return (
    <>
      <AlertContainer open={!!error}>
        {error && <Alert severity="error">Сталася помилка. Спробуйте ще раз.</Alert>}
      </AlertContainer>
      <Box component="form"
           sx={{
             display: 'flex',
             flexDirection: 'column',
             rowGap: '20px',
             padding: '80px',
           }}
      >
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          autoFocus
          label="Ім'я"
          placeholder="Введіть ім'я"
          error={!!errors?.firstName}
          helperText={errors?.firstName?.message}
          {...register('firstName', { requiredFieldOption })}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          autoFocus
          label="Прізвище"
          placeholder="Введіть прізвище"
          error={!!errors?.lastName}
          helperText={errors?.lastName?.message}
          {...register('lastName', { requiredFieldOption })}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          label="Email адреса"
          placeholder="Введіть email адресу"
          error={!!errors?.email}
          helperText={errors?.email?.message}
          {...register('email', { requiredFieldOption })}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          autoFocus
          label="Пароль"
          placeholder="Введіть пароль"
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register('password', { requiredFieldOption })}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '88px' }}>
          <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
            Скасувати
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            Зберегти
          </Button>
        </Box>
      </Box>
    </>
  )
}

const EmployeesPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  const openAddForm = () => setIsAddFormOpen(true)

  const closeAddForm = () => setIsAddFormOpen(false)

  return (
    <Box sx={{ width: '70%', paddingLeft: '72px', paddingRight: '72px', marginTop: '25px' }}>
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
