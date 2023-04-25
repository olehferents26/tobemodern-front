import { Button as MuiButton } from '@mui/material'

const Button = ({ children, width, height, ...props }) => {
  return (
    <MuiButton
      {...props}
      sx={{
        width: width,
        height: height,
        alignSelf: 'center',
        borderRadius: '6px',
      }}
    >
      {children}
    </MuiButton>
  )
}

export default Button;
