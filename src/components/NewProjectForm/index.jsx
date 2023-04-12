import { Alert, Box, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { requiredFieldOption } from '../../helpers/form.js'
import { useCreateProjectMutation } from '../../services/projectApi.js'
import AlertContainer from '../AlertContainer/index.jsx'
import Button from '../Button/index.jsx'

const NewProjectForm = ({ onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    mode: 'onChange'
  })
  const [createProject, { isLoading, isSuccess, error }] = useCreateProjectMutation()
  const onSubmit = data => {
    const formData = new FormData()
    formData.append("customerName", data.customerName)
    formData.append("file", data.file[0])
    createProject(formData)
  }

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
          id="customerName"
          name="customerName"
          autoFocus
          label="Ім'я клієнта"
          placeholder="Введіть ім'я клієнта"
          error={!!errors?.customerName}
          helperText={errors?.customerName?.message}
          {...register('customerName', { requiredFieldOption })}
        />
        <input
          type="file"
          {...register('file')}
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

export default NewProjectForm
