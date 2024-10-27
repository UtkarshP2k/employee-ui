import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  // create a darkTheme function to handle dark theme using createTheme
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  function setTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer position="bottom-right" theme='colored' hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} setTheme={setTheme} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>

    </>
  )
}

export default App
