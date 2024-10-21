const React = require('react');
const { useState } = require('react');
const { IconButton } = require('@chakra-ui/react');

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? 'red' : 'none'}
    viewBox="0 0 24 24"
    stroke="red"
    width="24px"
    height="24px"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 010-6.364 4.5 4.5 0 016.364 0L12 2.732l1.318-1.318a4.5 4.5 0 016.364 6.364L12 18l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

function HeartButton() {
  const [liked, setLiked] = useState(false);

  return (
    <IconButton
      aria-label="Curtir"
      icon={<HeartIcon filled={liked} />} // Usando o SVG de coração
      onClick={() => setLiked(!liked)}
      variant="ghost"
      _hover={{ bg: 'transparent' }}
    />
  );
}

module.exports = HeartButton;