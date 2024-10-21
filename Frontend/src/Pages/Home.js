import React from 'react';
import { Box } from '@chakra-ui/react';
import SearchForm from '../components/SearchForm';
import PsychologistCard from '../components/PsychologistCard';
import Header from '../components/Header';

  const Home = () => {
    return (
        <Box>
        <Header />
        <Box  mx='10' my='5'>
          <SearchForm/>
          <PsychologistCard/>
         </Box>
       </Box>
      );
  };
  
  export default Home;