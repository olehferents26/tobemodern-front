import { Button as MuiButton } from '@mui/material'

const Button = ({ children, ...props }) => {
  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        width: '189px',
        height: '68px',
        alignSelf: 'center',
        borderRadius: '6px',
      }}
    >
      {children}
    </MuiButton>
  )
}

export default Button;
