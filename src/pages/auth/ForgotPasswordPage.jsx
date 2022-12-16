import { Alert, Box, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AlertContainer from '../../components/AlertContainer/index.jsx'
import Button from '../../components/Button/index.jsx'
import FullPageCenterContainer from '../../components/FullPageCenterContainer/index.jsx'
import { useForgotPasswordEmailMutation, useSendForgotPasswordTokenMutation } from '../../services/auth.js'

const ForgotPasswordPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const { token } = useParams()
  const [sendForgotPasswordEmail, {
    isLoading: sendEmailLoading,
    error: sendEmailError
  }] = useForgotPasswordEmailMutation()
  const [sendForgotPasswordToken, {
    isLoading: sendTokenLoading,
    error: sendTokenError
  }] = useSendForgotPasswordTokenMutation()

  const isLoading = sendEmailLoading || sendTokenLoading

  const sendEmailHandler = ({ email }) => sendForgotPasswordEmail(email)
  const changePasswordHandler = ({ password }) => sendForgotPasswordToken({ password, token })

  const renderTextField = () => {
    if (token) {
      return <TextField
        fullWidth
        id="password"
        name="password"
        autoComplete="password"
        autoFocus
        label="Пароль"
        placeholder="Введіть свій новий пароль"
        type="password"
        error={!!errors?.password}
        helperText={errors?.password?.message}
        {...register('password', {
          required: {
            value: true,
            message: `Обов'язкове поле`
          }
        })}
      />
    }

    return <TextField
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
  }

  return (
    <FullPageCenterContainer>
      <AlertContainer open={!!sendEmailError || !!sendTokenError}>
        {(sendEmailError || sendTokenError) && <Alert severity="error">Сталася помилка. Спробуйте ще раз</Alert>}
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
        {renderTextField()}
        <Button
          onClick={handleSubmit(token ? changePasswordHandler : sendEmailHandler)}
          disabled={isLoading}
        >
          {token ? 'Змінити пароль' : 'Відправити емейл'}
        </Button>
      </Box>
    </FullPageCenterContainer>
  )
}

export default ForgotPasswordPage
