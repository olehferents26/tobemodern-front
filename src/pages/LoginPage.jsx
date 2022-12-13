import { Box, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import FullPageCenterContainer from '../components/FullPageCenterContainer'
import NavigationLink from '../components/NavigationLink'

const LoginPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <FullPageCenterContainer>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          width: '300px',
          border: '2px solid #E8E5EC',
          borderRadius: '13px',
          padding: '100px',
          background: '#FEFDFF',
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
        <Typography component="p" sx={{ cursor: 'pointer' }}>
          <NavigationLink to={'/forgot-password'}>Забули пароль?</NavigationLink>
        </Typography>
        <Button onClick={handleSubmit(onSubmit)}>
          Увійти
        </Button>
      </Box>
    </FullPageCenterContainer>
  )
}

export default LoginPage
