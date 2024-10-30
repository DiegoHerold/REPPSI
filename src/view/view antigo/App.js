const React = require('react');
const { BrowserRouter: Router, Route, Routes } = require('react-router-dom');
const Home = require('./Pages/Home');
const Consultas = require('./Pages/Consultas');
const Feed = require('./Pages/Feed');
const PerfilCliente = require('./Pages/PerfilCliente');
const PerfilPsicologo = require('./Pages/PerfilPsicologo');


const App = () => {
  return (
    <Router>

      {/* Definição das rotas */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/perfil/cliente" element={<PerfilCliente />} /> 
        <Route path="/perfil/psicologo" element={<PerfilPsicologo />} /> 
        <Route path="/consultas" element={<Consultas />} /> 
        <Route path="/feed" element={<Feed />} /> 
      </Routes>
    </Router>
  );
};

module.exports = App;

