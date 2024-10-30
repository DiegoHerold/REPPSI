const { extendTheme } = require('@chakra-ui/react');

const theme = extendTheme({
  colors: {
    primary: {
      100: '#E9D8FD', // Lavanda clara
      200: '#D6BCFA', // Violeta claro
      300: '#B794F4', // Violeta médio
      400: '#805AD5', // Roxo
      500: '#6B46C1', // Roxo escuro
      600: '#87CEFA'  // Azul Claro
    },
    secondary: {
      100: '#FFF2F1', // Fundo claro
      200: '#A09BE7', // Violeta suporte
      300: '#FF686B', // Coral para destaque
      400: '808080'   // Quase Preto
    },
    success: {
      500: '#38A169', // Verde de sucesso
    },
    error: {
      500: '#E53E3E', // Vermelho para erros
    },
    info: {
      500: '#3182CE', // Azul para informações
    },
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'primary.400', // Cor de fundo roxa
          color: 'white',
          _hover: {
            bg: 'primary.500', // Cor mais escura ao passar o mouse
          },
        },
        outline: {
          borderColor: 'primary.400',
          color: 'primary.400',
          _hover: {
            bg: 'primary.100',
          },
        },
      },
    },
    Tag: {
      baseStyle: {
        borderRadius: 'lg',
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary.400',
          color: 'white',
        },
      },
    },
  },
});

module.exports = theme;