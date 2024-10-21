import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // Importando o ChakraProvider
import Home from './Pages/Home';
import Consultas from './Pages/Consultas';
import Feed from './Pages/Feed';
import PerfilCliente from './Pages/PerfilCliente';
import PerfilPsicologo from './Pages/PerfilPsicologo';
import SettingPage from './Pages/Configuracao'; // Corrigido o nome para SettingPage
import Login from './Pages/Login';
import { getTheme } from './theme'; // Função para obter o tema

const App = () => {
  const [theme, setTheme] = useState(getTheme('violet')); // Definindo o tema inicial como 'violet'

  // Função para alterar o tema com base na escolha do usuário
  const handleThemeChange = (newTheme) => {
    setTheme(getTheme(newTheme)); // Atualiza o tema dinamicamente
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/perfil/cliente" element={<PerfilCliente />} /> 
          <Route path="/perfil/psicologo" element={<PerfilPsicologo />} /> 
          <Route path="/consultas" element={<Consultas />} /> 
          <Route path="/feed" element={<Feed />} /> 
          <Route path="/configuracao" element={<SettingPage onChangeTheme={handleThemeChange} />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;

