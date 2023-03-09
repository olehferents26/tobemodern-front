import { Box, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/index.jsx'
import { requiredFieldOption } from '../../helpers/form.js'
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../../services/userApi.js'

const SettingsPage = () => {
  const { data: user } = useGetCurrentUserQuery()
  const { handleSubmit, register, formState: { errors }, setValue } = useForm()
  const [updateCurrentUser, { isLoading, isSuccess, error }] = useUpdateCurrentUserMutation()

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('email', user.email)
    }
  }, [user])

  const onSubmit = data => updateCurrentUser({ ...user, ...data })

  return (
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
          InputLabelProps={{ shrink: true }}
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
        InputLabelProps={{ shrink: true }}
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
        InputLabelProps={{ shrink: true }}
        {...register('email', { requiredFieldOption })}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        type="password"
        autoComplete="password"
        autoFocus
        label="Новий пароль"
        placeholder="Введіть новий пароль"
        error={!!errors?.password}
        helperText={errors?.password?.message}
        InputLabelProps={{ shrink: true }}
        {...register('password', { requiredFieldOption })}
      />
      <Box>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          Зберегти
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsPage
