const React = require('react');
const { Box, VStack, Text, Avatar, Badge, Icon, Grid, Wrap, HStack } = require('@chakra-ui/react');
const { StarIcon } = require('@chakra-ui/icons');

// Função para criar estrelas preenchidas de acordo com o rating fracionado
const StarRating = ({ rating }) => {
  return (
    <HStack spacing="0.5" justify="center">
      {Array(5).fill('').map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1); // Calcula o quanto a estrela deve ser preenchida (0 a 1)

        return (
          <Box key={i} position="relative" display="inline-block">
            <Icon as={StarIcon} color="gray.300" /> {/* Ícone de fundo da estrela em cinza */}

            <Box
              position="absolute"
              top="0"
              left="0"
              width={`${fill * 100}%`} // Define o preenchimento parcial da estrela
              height="100%"
              overflow="hidden"
            >
              <Icon as={StarIcon} color="primary.500" /> {/* Ícone de estrela preenchido */}
            </Box>
          </Box>
        );
      })}
    </HStack>
  );
};

const PsychologistCard = ({ psychologist }) => {
  return (
    <Box 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="lg" 
      bg="white" 
      p={6} 
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
      maxW="350px" // Limita a largura máxima do card para manter o layout equilibrado
      mx="auto" // Centraliza o card
    >
      <VStack spacing={4} align="center"> {/* Centraliza todos os elementos */}
        <Avatar size="2xl" src={psychologist.image} /> {/* Avatar do psicólogo centralizado e maior */}
        
        <Text fontWeight="bold" fontSize="xl" color="primary.500" textAlign="center">
          {psychologist.name}
        </Text>

        <Text color="secondary.200" fontSize="sm" textAlign="center" noOfLines={2}>
          {psychologist.bio}
        </Text>

        <HStack spacing={2} justify="center" align="center"> {/* Estrelas e rating juntos */}
          <StarRating rating={psychologist.rating} /> {/* Componente de estrelas fracionadas */}
          <Text color="primary.500" fontWeight="bold" fontSize="md">
            {psychologist.rating.toFixed(1)} {/* Mostra a nota com 1 casa decimal */}
          </Text>
        </HStack>

        <HStack spacing={4} justify="center">
          <Badge colorScheme="purple" variant="solid">
            {psychologist.price} {/* Exibe o preço */}
          </Badge>
          {/* Exibe ambos se for o caso, ou apenas online/presencial */}
          {psychologist.online && psychologist.presencial ? (
            <>
              <Text color="success.500">Online</Text>
              <Text color="error.500">Presencial</Text>
            </>
          ) : (
            <Text color={psychologist.online ? "success.500" : "error.500"}>
              {psychologist.online ? 'Online' : 'Presencial'}
            </Text>
          )}
        </HStack>

        {/* Especializações exibidas como tags */}
        <Wrap mt={2} justify="center"> 
          {psychologist.specializations.map((specialization, index) => (
            <Badge key={index} colorScheme="teal" variant="solid">
              {specialization}
            </Badge>
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
};

// Lista de psicólogos com sistema de grid responsivo
const PsychologistList = () => {
  const psychologists = [
    {
      id: 1,
      name: 'Dra. Ana Silva',
      rating: 4.9,
      bio: 'Especialista em terapia cognitivo-comportamental. Atendimentos online e presenciais.',
      price: 'R$ 150,00',
      online: true,
      presencial: true, // Agora pode ter ambos os tipos de atendimento
      image: 'https://picsum.photos/200',
      specializations: ['Terapia Cognitiva', 'Casais', 'Ansiedade'],
    },
    {
      id: 2,
      name: 'Dr. João Souza',
      rating: 4.8,
      bio: 'Foco em terapia familiar e psicologia infantil. Atendimentos presenciais.',
      price: 'R$ 120,00',
      online: false,
      presencial: true,
      image: 'https://picsum.photos/200',
      specializations: ['Família', 'Infantil', 'Depressão'],
    },
    {
      id: 3,
      name: 'Dra. Jane Froste',
      rating: 4.8,
      bio: 'Especialista em terapia para crianças e adolescentes.',
      price: 'R$ 120,00',
      online: false,
      presencial: true,
      image: 'https://picsum.photos/200',
      specializations: ['Infantil', 'Adolescentes', 'Terapia Comportamental'],
    },
    {
      id: 4,
      name: 'Dr. Albert',
      rating: 4.8,
      bio: 'Sou bastante carismático e sou doutor em terapia de casais.',
      price: 'R$ 100,00',
      online: true,
      presencial: false,
      image: 'https://picsum.photos/200',
      specializations: ['Casais', 'Terapia Sistêmica', 'Comunicação'],
    },
    {
      id: 5,
      name: 'Dra. Laura Mendes',
      rating: 4.7,
      bio: 'Experiência com traumas e distúrbios alimentares. Atendimento online.',
      price: 'R$ 130,00',
      online: true,
      presencial: true,
      image: 'https://picsum.photos/200',
      specializations: ['Traumas', 'Distúrbios Alimentares', 'Mindfulness'],
    },
    {
      id: 6,
      name: 'Dr. Pedro Lima',
      rating: 4.6,
      bio: 'Psicologia infantil e aconselhamento para pais.',
      price: 'R$ 110,00',
      online: false,
      presencial: true,
      image: 'https://picsum.photos/200',
      specializations: ['Infantil', 'Aconselhamento', 'Comportamental'],
    },
  ];

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)",lg: "repeat(3, 1fr)",xl: "repeat(4, 1fr)"}} // Responsivo: 1 coluna para telas pequenas, 2 para médias, 3 para grandes
      gap={6} // Espaçamento entre os cards
      mt={5}
    >
      {psychologists.map(psychologist => (
        <PsychologistCard key={psychologist.id} psychologist={psychologist} />
      ))}
    </Grid>
  );
};

module.exports = PsychologistCard;