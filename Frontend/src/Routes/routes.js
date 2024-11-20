// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import ProtectedRoutes from './ProtectedRoutes'
// //Caminhos da Pages
// import Home from './Pages/Home';
// import Consultas from './Pages/Consultas';
// import Feed from './Pages/Feed';
// import PerfilCliente from './Pages/PerfilCliente';
// import PerfilPsicologo from './Pages/PerfilPsicologo';
// import SettingPage from './Pages/Configuracao';
// import Login from './Pages/Login';
// import Cadastro from './Pages/Cadastro';
// import { getTheme } from '../../src/theme';


// const Routering = () => {
//   const [theme, setTheme] = useState(getTheme('violet'));

//   const handleThemeChange = (newTheme) => {
//     setTheme(getTheme(newTheme));
//   };

//   return (
//       <Router>
//         <Routes>
//           {/* Rotas públicas*/}
//           <Route path="/login" element={<Login />} />
//           <Route path="/cadastro" element={<Cadastro />} />
          
//           {/* Rotas protegidas */}
//           <Route 
//             path="/home" 
//             element={
            
//                 <Home />
             
//             } 
//           />
//           <Route 
//             path="/perfil/cliente" 
//             element={
//                 <ProtectedRoutes>
//                     <PerfilCliente />
//                 </ProtectedRoutes>
//             } 
//           />
          
//           <Route 
//             path="/perfil/psicologo" 
//             element={
//                 <ProtectedRoutes>
//                     <PerfilPsicologo />
//                 </ProtectedRoutes>
//             } 
//           />
//           <Route 
//             path="/consultas" 
//             element={
//                 <ProtectedRoutes>
//                   <Consultas />
//                 </ProtectedRoutes>
//             } 
//           />
//           <Route 
//             path="/feed" 
//             element={
//                 <ProtectedRoutes>
//                     <Feed />
//                 </ProtectedRoutes>
//             } 
//           />
//           <Route 
//             path="/configuracao" 
//             element={
//                 <ProtectedRoutes>
//                     <SettingPage onChangeTheme={handleThemeChange} />
//                 </ProtectedRoutes>
//             } 
//           />
          
//           {/* Página inicial pública */}
//           {/* <Route path="/" element={<Home />} /> */}
//         </Routes>
//       </Router>
//   );
// };

// export default Routering;
