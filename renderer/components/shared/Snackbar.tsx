import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface StSnackbarProps {
  open: boolean;
  message: string;
  error?: boolean;
  handleClose: () => void;
}

export const StSnackbar: React.VFC<StSnackbarProps> = ({ open, handleClose, message, error = false }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key={'bottom' + 'center'}
        sx={{
          '&.MuiPaper-root-MuiSnackbarContent-root': {
            borderRadius: 10,
            fontWeight: 500,
          },
        }}
      >
        <Alert
          sx={{
            backgroundColor: error ? '#EF2D56' : '#212639',
            minWidth: 300,
            fontWeight: error ? 'bold' : '',
          }}
          icon={false}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
