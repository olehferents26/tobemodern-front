import { Dialog as MuiDialog, DialogContent } from '@mui/material'

const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <MuiDialog
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
        {children}
      </DialogContent>
    </MuiDialog>
  )
}

export default Dialog
