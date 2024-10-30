const React = require('react');
const ConsultationsPage = require('../components/Consultas');
const Header = require('../components/Header');

  const Consultas = () => {
    return (
        <>
        <Header />
        <ConsultationsPage/>
        </>
      );
  };
  
  module.exports = Consultas;