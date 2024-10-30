const React = require('react');
const { Box, Flex, Text, Button, Stack, Tag, Avatar, Grid } = require('@chakra-ui/react');


function ProfilePage() {
  return (
    <>

      {/* Página de perfil com Chakra UI */}
      <Box maxW="80%" mx="auto" p={4}>
        {/* Seção do perfil - Flex container para alinhar os boxes */}
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }} // 1 coluna em telas menores, 2 colunas em telas maiores
          gap={6}
        >
          {/* Box da Apresentação */}
          <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
            <Flex direction="column" align="center">
              <Avatar
                src="/path-to-profile-pic.jpg"
                alt="Profile Picture"
                size={{ base: "2xl", md: "3xl" }}
                border="2px solid"
                borderColor="primary.400" // Cor personalizada roxa
                mb={4}
              />
              <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
                Nome do Usuário
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
                Idade: 25 | Localização: São Paulo
              </Text>
              <Button size={{ base: "sm", md: "md" }} variant="solid">
                Editar Perfil
              </Button>
            </Flex>
          </Box>

          {/* Box de Apresentação e Gostos */}
          <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
            {/* Apresentação */}
            <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
              Apresentação
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
              Olá! Eu sou um psicólogo dedicado, apaixonado por ajudar as pessoas a encontrarem o equilíbrio emocional. Gosto de meditação, autoajuda e sou entusiasta da saúde mental.
            </Text>

            {/* Tags de Gostos/Interesses */}
            <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
              Gostos e Interesses
            </Text>
            <Stack direction="row" spacing={4} flexWrap="wrap">
              <Tag size={{ base: "md", md: "lg" }} variant="solid">
                Autoajuda
              </Tag>
              <Tag size={{ base: "md", md: "lg" }} bg="success.500" color="white">
                Meditação
              </Tag>
              <Tag size={{ base: "md", md: "lg" }} bg="secondary.300" color="white">
                Bem-estar
              </Tag>
            </Stack>
          </Box>
        </Grid>

        {/* Box de Forma de Pagamento (ficando abaixo dos outros boxes em resoluções maiores) */}
        <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
          <Text fontSize={{ base: "lg", md: "xl" }} color="success.500" fontWeight="bold" mb={2}>
            Forma de Pagamento
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
            Você precisa verificar sua forma de pagamento via e-mail para continuar.
          </Text>
          <Button mt={4} size={{ base: "sm", md: "md" }} colorScheme="green">
            Verificar Pagamento
          </Button>
        </Box>
      </Box>
    </>
  );
};

module.exports = ProfilePage;
