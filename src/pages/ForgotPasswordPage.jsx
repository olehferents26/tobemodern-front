import { Box, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Button from '../components/Button/index.jsx'
import FullPageCenterContainer from '../components/FullPageCenterContainer/index.jsx'

const ForgotPasswordPage = () => {
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
        <Button onClick={handleSubmit(onSubmit)}>
          Відправити емейл
        </Button>
      </Box>
    </FullPageCenterContainer>
  )
}

export default ForgotPasswordPage;
