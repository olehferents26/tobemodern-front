import { Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

const AlertContainer = ({ children, open }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const onClose = () => setIsOpen(false)

  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      {children}
    </Snackbar>
  )
}

export default AlertContainer;
