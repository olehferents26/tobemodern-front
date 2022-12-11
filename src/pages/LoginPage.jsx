import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)

  console.log(errors)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '20px',
          width: '300px'
        }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          label="Email адреса"
          placeholder="Введіть свій email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
          {...register('email', {
            required: {
              value: true,
              message: `Обов'язкове поле`
            }
          })}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          label="Пароль"
          placeholder="Введіть свій пароль"
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register('password', {
            required: {
              value: true,
              message: `Обов'язкове поле`
            }
          })}
        />
        <Button variant="contained" sx={{ width: '130px' }} onClick={handleSubmit(onSubmit)}>Увійти</Button>
      </Box>
    </Box>
  )
}

export default LoginPage
