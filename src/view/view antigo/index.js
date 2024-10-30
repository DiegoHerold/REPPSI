const React = require('react');
const ReactDOM = require('react-dom/client');
require('./index.css');
const App = require('./App');
const { ChakraProvider } = require('@chakra-ui/react');
const themeChakra = require('./theme');
const { ThemeProvider } = require('@mui/material/styles');


// Renderização do App com ambos os temas
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={themeChakra}>
    <ChakraProvider theme={themeChakra}>
      <App />
    </ChakraProvider>
  </ThemeProvider>
);
