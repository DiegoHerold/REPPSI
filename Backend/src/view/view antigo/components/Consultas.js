const React = require('react');
const { useState } = require('react');
const { Box, Flex, Text, Button, Stack, Tag, Grid, Select } = require('@chakra-ui/react');

function ConsultationsPage() {
  // Estado para filtrar o histórico
  const [filter, setFilter] = useState('');

  // Dados fictícios de consultas
  const consultationsHistory = [
    { id: 1, date: '12/10/2023', psychologist: 'Dr. João', status: 'Concluída' },
    { id: 2, date: '08/09/2023', psychologist: 'Dra. Ana', status: 'Concluída' },
    { id: 3, date: '05/08/2023', psychologist: 'Dr. Pedro', status: 'Cancelada' },
  ];

  const upcomingConsultations = [
    { id: 1, date: '15/10/2023 - 14:00', psychologist: 'Dra. Marina', link: '#' },
    { id: 2, date: '20/10/2023 - 10:00', psychologist: 'Dr. João', link: '#' },
  ];

  // Função para manipular filtros
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      {/* Página principal */}
      <Box maxW="80%" mx="auto" p={6}>
        {/* Consultas Agendadas */}
        <Flex mb={4}>
          <Text fontSize="xl" fontWeight="bold">Consultas Agendadas</Text>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {upcomingConsultations.map((consultation) => (
            <Box key={consultation.id} p={4} borderWidth={1} borderRadius="md" shadow="sm">
              <Text fontSize="lg">{consultation.psychologist}</Text>
              <Text>{consultation.date}</Text>
              <Button colorScheme="teal" size="sm" mt={2}>Acessar Consulta</Button>
            </Box>
          ))}
        </Grid>

        {/* Histórico de Consultas */}
        <Flex mt={8} mb={4}>
          <Text fontSize="xl" fontWeight="bold">Histórico de Consultas</Text>
          <Select ml="auto" maxW="200px" value={filter} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="concluida">Concluídas</option>
            <option value="cancelada">Canceladas</option>
          </Select>
        </Flex>

        <Stack spacing={4}>
          {consultationsHistory
            .filter((consultation) => {
              if (filter === '') return true;
              return consultation.status.toLowerCase() === filter;
            })
            .map((consultation) => (
              <Box key={consultation.id} p={4} borderWidth={1} borderRadius="md" shadow="sm">
                <Flex justify="space-between">
                  <Text fontSize="lg">{consultation.psychologist}</Text>
                  <Tag colorScheme={consultation.status === 'Concluída' ? 'green' : 'red'}>
                    {consultation.status}
                  </Tag>
                </Flex>
                <Text>{consultation.date}</Text>
              </Box>
            ))}
        </Stack>
      </Box>
    </>
  );
}

module.exports = ConsultationsPage;
