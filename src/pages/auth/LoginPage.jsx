import { Alert, Box, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertContainer from '../../components/AlertContainer/index.jsx'
import Button from '../../components/Button/index.jsx'
import FullPageCenterContainer from '../../components/FullPageCenterContainer/index.jsx'
import NavigationLink from '../../components/NavigationLink/index.jsx'
import { useLoginMutation } from '../../services/authApi.js'
import { saveTokens } from '../../redux/auth/index.js'
import { requiredFieldOption } from '../../helpers/form.js'

const LoginPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [login, { data, isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = data => login(data)

  useEffect(() => {
    if (data) {
      dispatch(saveTokens(data))
      navigate('/dashboard/projects')
    }
  }, [data])

  return (
    <FullPageCenterContainer>
      <AlertContainer open={!!error}>
        {error && error.status === 401 && <Alert severity="error">Невірні дані. Спробуйте ще раз</Alert>}
      </AlertContainer>
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
          {...register('email', { requiredFieldOption })}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          type="password"
          label="Пароль"
          placeholder="Введіть свій пароль"
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register('password', { requiredFieldOption })}
        />
        <Typography component="p" sx={{ cursor: 'pointer' }}>
          <NavigationLink to={'/forgot-password'}>Забули пароль?</NavigationLink>
        </Typography>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          Увійти
        </Button>
      </Box>
    </FullPageCenterContainer>
  )
}

export default LoginPage
