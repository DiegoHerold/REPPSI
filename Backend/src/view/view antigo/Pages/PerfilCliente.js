const React = require('react');
const ProfilePage = require('../components/ProfilePageC');
const Header = require('../components/HeaderPerfil');

  const PerfilCliente = () => {
    return (
        <>
        <Header />
        <ProfilePage/>
        </>
      );
  };
  
  module.exports = PerfilCliente;