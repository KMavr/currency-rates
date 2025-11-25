import { CssBaseline, Container, Typography, Box } from '@mui/material';
import DateSelection from './components/DateSelection/DateSelection.tsx';
import CurrencySelection from './components/CurrencySelection/CurrencySelection.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Currency Exchange Rates
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', sm: 'center' },
            }}>
            <DateSelection />
            <CurrencySelection />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
