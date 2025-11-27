import Alert from '@mui/material/Alert';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore.ts';

function ErrorAlert() {
  const { error, clearError } = useCurrencyRatesStore();

  const handleClose = (_, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearError();
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="error" variant="filled" onClose={handleClose}>
        {error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorAlert;
