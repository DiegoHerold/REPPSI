import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Link,
  useToast
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Alternar entre Login e Cadastro
  const [nome, setNome] = useState(''); // Estado para o nome (usado no cadastro)
  const [email, setEmail] = useState(''); // Estado para o email
  const [senha, setSenha] = useState(''); // Estado para a senha
  const toast = useToast(); // Usado para exibir mensagens (feedback)

  // Função para alternar entre login e cadastro
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  // Função para enviar os dados do formulário para a API
  const handleFormSubmit = () => {
    // Define a URL da API com base no tipo de ação (login ou cadastro)
    const url = isLogin ? '/entrar' : '/cadastrar'; // Rota '/entrar' para login, '/cadastrar' para cadastro

    // Envia a requisição para a API usando fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: isLogin ? undefined : nome, // Envia o nome apenas no cadastro
        email: email,  // Envia o email
        senha: senha,  // Envia a senha
      }),
    })
      .then((response) => response.json()) // Converte a resposta para JSON
      .then((data) => {
        // Verifica a resposta da API e mostra feedback ao usuário
        console.log("Mostrando data json:"+data);
        if (data.success) {
          toast({
            title: isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'sucess',
            description: data.message || 'Cadastro realizado com sucesso! 2222222222',
            status: 'sucesss',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        // Lida com erros de conexão ou problemas no servidor
        toast({
          title: 'Erro ao conectar-se à API',
          description: 'Verifique sua conexão ou tente novamente mais tarde. 555555',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        w="full"
        maxW="md"
        p={6}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} fontWeight="bold">
          {isLogin ? 'Login' : 'Criar Conta'}
        </Heading>

        {/* Formulário de Login ou Cadastro */}
        <VStack spacing={4} mb={6}>
          {!isLogin && (
            <FormControl>
              <FormLabel>Nome Completo</FormLabel>
              <Input
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
            />
          </FormControl>
          <Button
            colorScheme="blue"
            rightIcon={<ArrowForwardIcon />}
            w="full"
            onClick={handleFormSubmit}
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </VStack>

        {/* Link para alternar entre Login e Cadastro */}
        <Flex justify="center" mt={6}>
          <Text>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <Link color="blue.500" onClick={toggleMode} fontWeight="bold">
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginSignupPage;
