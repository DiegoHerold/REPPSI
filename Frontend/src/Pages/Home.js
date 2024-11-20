import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SearchForm from '../components/SearchForm';
import PsychologistCard from '../components/PsychologistCard';
import Header from '../components/Header';

const Home = () => {
  const [filters, setFilters] = useState(null);

  const handleSearch = (newFilters) => {
    setFilters(newFilters); // Atualiza os filtros
  };
  const handlePsychologistClick = (id) => {
    console.log('ID do psicólogo clicado:', id);
    // Aqui você pode redirecionar ou exibir mais detalhes sobre o psicólogo
    // Por exemplo: navegação para uma página de detalhes
    // navigate(`/detalhes/${id}`);
  };

  return (
    <Box>
      <Header />
      <Box mx="10" my="5">
        <SearchForm onSearch={handleSearch} />
        <PsychologistCard filters={filters} onCardClick={handlePsychologistClick}/>
      </Box>
    </Box>
  );
};

export default Home;
