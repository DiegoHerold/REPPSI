import React, { useState } from 'react';
import { Box, Flex, Text, Button, Stack, Tag, Grid, Select } from '@chakra-ui/react';

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
        <Box mb={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="primary.400">
            Consultas Agendadas
          </Text>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
            {upcomingConsultations.map((consultation) => (
              <Box
                key={consultation.id}
                p={6}
                bg="primary.100"
                borderRadius="lg"
                boxShadow="lg"
              >
                <Text fontWeight="bold" color="primary.400">
                  Data: {consultation.date}
                </Text>
                <Text mb={4} color="primary.300">
                  Psicólogo: {consultation.psychologist}
                </Text>
                <Button as="a" href={consultation.link} size="sm" colorScheme="green">
                  Entrar na Chamada
                </Button>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Filtros e Histórico de Consultas */}
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color="primary.400">
            Histórico de Consultas
          </Text>
          <Select
            placeholder="Filtrar por status"
            value={filter}
            onChange={handleFilterChange}
            maxW="200px"
            bg="white"
            color="primary.400"
          >
            <option value="">Todos</option>
            <option value="Concluída">Concluída</option>
            <option value="Cancelada">Cancelada</option>
          </Select>
        </Flex>

        {/* Lista de Histórico de Consultas */}
        <Stack spacing={4}>
          {consultationsHistory
            .filter((consultation) => !filter || consultation.status === filter)
            .map((consultation) => (
              <Box
                key={consultation.id}
                p={6}
                bg="primary.100"
                borderRadius="lg"
                boxShadow="lg"
              >
                <Text fontWeight="bold" color="primary.400">
                  Data: {consultation.date}
                </Text>
                <Text color="primary.300">
                  Psicólogo: {consultation.psychologist}
                </Text>
                <Tag size="lg" mt={2} bg={consultation.status === 'Concluída' ? 'success.500' : 'error.500'} color="white">
                  {consultation.status}
                </Tag>
              </Box>
            ))}
        </Stack>
      </Box>
    </>
  );
}

export default ConsultationsPage;
