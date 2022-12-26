import { Box, Typography } from '@mui/material'
import AddIcon from '../../icons/AddIcon.jsx'

const AddButton = ({ text, onClick }) => {
  return (
    <Box
      sx={{
        width: '278px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.5px solid #795EA4',
        borderRadius: '6px',
        cursor: 'pointer',
        columnGap: '11px',
      }}
      onClick={onClick}
    >
      <AddIcon/>
      <Typography
        fontWeight="500"
        fontSize="18px"
        lineHeight="24px"
        textTransform="uppercase"
        sx={{ marginTop: '3px', userSelect: 'none', }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default AddButton
