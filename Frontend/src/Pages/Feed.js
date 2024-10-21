import React from 'react';

import FeedPage from '../components/Feed';
import Header from '../components/Header';
import Pesquisa from '../components/PesquisaFeed';

  const Feed = () => {
    return (
        <>
        <Header />
        <Pesquisa/>
        <FeedPage/>
        </>
      );
  };
  
  export default Feed;