import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import Button from '../Button/index.jsx'

const DialogConfirmCancel = ({ isOpen, onClose, onCancel, onSubmit, titleText }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }
        }
      }}
    >
      <DialogContent>
        <DialogContentText>
          {titleText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button onClick={onCancel} variant="outlined">Скасувати</Button>
        <Button onClick={onSubmit} variant="contained" autoFocus>
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmCancel
