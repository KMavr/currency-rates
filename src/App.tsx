import { CssBaseline, Container, Typography, Box } from '@mui/material';
import DateSelection from './components/DateSelection/DateSelection.tsx';
import CurrencySelection from './components/CurrencySelection/CurrencySelection.tsx';
import MultiCurrencySelector from './components/MultiCurrencySelector/MultiCurrencySelector.tsx';
import CurrencyRates from './components/CurrencyRates/CurrencyRates.tsx';
import ErrorAlert from './components/ErrorAlert/ErrorAlert.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: { xs: 3, sm: 4, md: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 500,
              mb: { xs: 3, sm: 4 },
            }}>
            Currency Exchange Rates
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, sm: 3 },
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'stretch', sm: 'flex-start' },
                '& > *': {
                  flex: { xs: '1 1 auto', sm: '1 1 0' },
                  minWidth: 0,
                },
              }}>
              <DateSelection />
              <CurrencySelection />
            </Box>

            <MultiCurrencySelector />

            <Box sx={{ mt: 1 }}>
              <CurrencyRates />
            </Box>
          </Box>
        </Box>
      </Container>
      <ErrorAlert />
    </>
  );
}

export default App;
