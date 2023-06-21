import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Button from '../../components/Button/index.jsx'

import { requiredFieldOption } from '../../helpers/form.js'

import { useUpdateCurrentUserMutation } from '../../services/userApi.js'

const SettingsPage = () => {
  const user = useSelector(({user}) => user?.userData)
  
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
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '10px 10px',
    }}>
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
      <Box sx={{
        minWidth: '30%',
        textAlign: 'center',
        fontFamily: 'Montserrat,Roboto',
        fontWeight: '400',
        lineHeight: '1.5',
        fontSize: '24px',
        color: '#795EA4',
        marginRight: '50px',
      }}>
        <Typography >Відпрацьовані години в цьому місяці</Typography>
         <TableContainer sx={{
            maxWidth: '200px',
            margin: '20px auto 0',
          }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Місяць</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell align="center">0 год</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </Box>
  )
}

export default SettingsPage
