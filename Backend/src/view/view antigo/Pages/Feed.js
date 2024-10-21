const React = require('react');
const FeedPage = require('../components/Feed');
const Header = require('../components/Header');
const Pesquisa = require('../components/PesquisaFeed');

  const Feed = () => {
    return (
        <>
        <Header />
        <Pesquisa/>
        <FeedPage/>
        </>
      );
  };
  
  module.exports = Feed;