import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo à Home Page</h1>
      <p>Esta é a página inicial da sua aplicação React.</p>
    </div>
  );
};

ReactDOM.render(<Home />, document.getElementById('root'));
