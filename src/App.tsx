import { CssBaseline, Container, Typography, Box } from '@mui/material'

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Currency Exchange Rates
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default App
