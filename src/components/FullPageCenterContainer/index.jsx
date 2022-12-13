import { Box } from '@mui/material'

const FullPageCenterContainer = ({ children }) => {
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
      {children}
    </Box>
  )
}

export default FullPageCenterContainer;
