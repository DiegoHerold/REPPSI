const React = require('react');
const { useState } = require('react');
const {
  Box,
  Text,
  Button,
  Input,
  Stack,
  IconButton,
  Image,
  Textarea,
  Divider,
  Flex,
  List,
  ListItem,
} = require('@chakra-ui/react');
const { ChatIcon, SearchIcon, SmallCloseIcon } = require('@chakra-ui/icons');
const HeartButton = require('./icones/Heart');

function FeedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [feed, setFeed] = useState([
    {
      id: 1,
      type: 'text',
      content: 'Hoje vamos falar sobre a importância da saúde mental no trabalho.',
      psychologist: 'Dr. João Silva',
      likes: 12,
      liked: false,
      comments: [],
      showComments: false, // Estado para mostrar/esconder comentários
    },
    {
      id: 2,
      type: 'image',
      content: 'https://via.placeholder.com/600x400',
      psychologist: 'Dra. Ana Souza',
      likes: 8,
      liked: false,
      comments: [],
      showComments: false,
    },
    {
      id: 3,
      type: 'video',
      content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      psychologist: 'Dr. Pedro Oliveira',
      likes: 5,
      liked: false,
      comments: [],
      showComments: false,
    },
  ]);

  const [newComment, setNewComment] = useState('');

  // Sugestões de pesquisa baseadas no conteúdo das postagens
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 1) {
      const filteredSuggestions = feed
        .filter((post) => post.content.toLowerCase().includes(term.toLowerCase()))
        .map((post) => post.content.substring(0, 50));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Função para adicionar curtida
  const handleLike = (id) => {
    const updatedFeed = feed.map((post) =>
      post.id === id ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
    );
    setFeed(updatedFeed);
  };

  // Função para alternar comentários visíveis
  const toggleComments = (id) => {
    const updatedFeed = feed.map((post) =>
      post.id === id ? { ...post, showComments: !post.showComments } : post
    );
    setFeed(updatedFeed);
  };

  // Função para adicionar comentário
  const handleAddComment = (id) => {
    const updatedFeed = feed.map((post) =>
      post.id === id ? { ...post, comments: [...post.comments, newComment] } : post
    );
    setFeed(updatedFeed);
    setNewComment('');
  };
  return (
    <>

      {/* Campo de Pesquisa */}
      <Box maxW="80%" mx="auto" mt={6} mb={4}>
        <Flex position="relative">
          <Input
            placeholder="Pesquisar por assunto..."
            value={searchTerm}
            onChange={handleSearchChange}
            bg="white"
            color="primary.400"
            mb={4}
            pr="3rem" // Adicionando espaçamento à direita para o botão
          />
          <IconButton
            aria-label="Pesquisar"
            icon={<SearchIcon />}
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)" // Centralizando verticalmente
            bg="primary.400"
            color="white"
            _hover={{ bg: 'primary.500' }}
          />
        </Flex>

        {/* Sugestões de pesquisa */}
        {suggestions.length > 0 && (
          <Box bg="gray.100" borderRadius="md" p={2} mt={2}>
            <List spacing={2}>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} _hover={{ bg: 'gray.200', cursor: 'pointer' }}>
                  {suggestion}...
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {/* Feed de postagens */}
      <Box maxW="80%" mx="auto">
        {feed.map((post) => (
          <Box key={post.id} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg" mb={6}>
            <Text fontWeight="bold" color="primary.400">
              {post.psychologist}
            </Text>
            <Text color="primary.300" mb={4}>
              {post.type === 'text' && post.content}
            </Text>
            {post.type === 'image' && (
              <Image src={post.content} alt="Imagem da postagem" borderRadius="md" />
            )}
            {post.type === 'video' && (
              <Box as="iframe" src={post.content} width="100%" height="400px" borderRadius="md" mt='10'/>
            )}

            <Flex justify="space-between" align="center" mt={4}>
              {/* Botão de Amei */}
              <Flex align="center" mt='10'>
                <HeartButton/>
                <Text ml={2}>{post.likes} Amei</Text>
              </Flex>

              {/* Botão de Comentários */}
              <Flex align="center">
                <IconButton
                  aria-label="Comentar"
                  icon={<ChatIcon />}
                  colorScheme="blue"
                  mr={2}
                  onClick={() => toggleComments(post.id)}
                />
                <Text>{post.comments.length} Comentários</Text>
              </Flex>
            </Flex>

            {/* Espaço para Comentários (escondido até clicar) */}
            {post.showComments && (
              <>
                <Stack spacing={4} mt={4}>
                  {post.comments.map((comment, index) => (
                    <Box key={index} bg="secondary.100" p={2} borderRadius="md">
                      <Text>{comment}</Text>
                    </Box>
                  ))}
                </Stack>

                <Divider my={4} />

                {/* Adicionar novo comentário */}
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicionar um comentário..."
                  bg="white"
                  mb={2}
                  _placeholder={{ color: 'gray.500' }}
                />
                <Button onClick={() => handleAddComment(post.id)} size="sm" colorScheme="green">
                  Comentar
                </Button>
              </>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
}

module.exports = FeedPage;

