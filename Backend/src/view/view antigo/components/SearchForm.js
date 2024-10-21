const React = require('react');
const { HStack, Input, Select, Button, Box } = require('@chakra-ui/react');
const { SearchIcon } = require('@chakra-ui/icons');

const SearchForm = () => {
  return (
    <HStack spacing={4} mb={5}>
      <Select placeholder="Área de Especialização" bg="primary.100" borderColor="primary.400">
        <option value="TCC">Terapia Cognitivo-Comportamental</option>
        <option value="Familiar">Terapia Familiar</option>
      </Select>
      <Input placeholder="Valor da Consulta" bg="primary.100" borderColor="primary.400" />
      <Select placeholder="Data Disponível" bg="primary.100" borderColor="primary.400">
        <option value="Segunda">Segunda</option>
        <option value="Terça">Terça</option>
        <option value="Quarta">Quarta</option>
        <option value="Quinta">Quinta</option>
        <option value="Sexta">Sexta</option>
        <option value="Sabado">Sábado</option>
        <option value="Domingo">Domingo</option>
      </Select>
      <Box >
        <Button leftIcon={<SearchIcon />} colorScheme="primary" bg="primary.400" color="white" _hover={{ bg: 'primary.500' }} size='md'>
          Pesquisar
        </Button>
      </Box>
    </HStack>
  );
};

module.exports = SearchForm;
