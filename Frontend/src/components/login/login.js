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
  InputGroup,
  useToast,

} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import UserService from '../../Services/UserServices'
import { validarEmail, validarSenha } from '../../Util/validadores'
const userService = new UserService()

const Login = () => {
  const [showPassword] = useState(false); // Estado para mostrar/esconder senha
  const navigate = useNavigate();
  ///começo de mudanças
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();
  

  const handleCadastro = () => {
    // Define a URL da API
    const url = '/entrar';
    

    // Envia a requisição para a API usando fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        senha: form.senha
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
        
          toast({
            title: 'Cadastro realizado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/home'); // Redireciona para a página home após cadastro
        } else {
          toast({
            title: 'Erro',
            description: data.message || 'Verifique as informações e tente novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'Erro ao conectar-se à API',
          description: 'Verifique sua conexão ou tente novamente mais tarde.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // const handleSubmit = async (event) => {
  //   console.log("entrou na função handleSubmit");
  //   event.preventDefault();
  //   try {
  //     console.log("entrou no try")
  //     setLoading(true)
  //     const response = await userService.login(form)
  //     console.log('response do Login', response)
  //     if (response === true) {
  //       alert('usuário Logado com Sucesso');
  //       navigate('/home');
  //     }
  //     setLoading(false)
  //   }
  //   catch (err) {
  //     alert('Algo deu errado com o Login' + err)
  //   }
  // }

  // const handleChange = (event) => {
  //   setForm({...form, [event.target.name]: event.target.value})
  // }

  const validadorInput = () => {
    return validarEmail(email) && validarSenha(senha)
  }
  //fim de mudanças



  // Função para enviar os dados do formulário para a API
  const handleLogin = () => {
    // Define a URL da API
    const url = '/entrar';

    // Envia a requisição para a API usando fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('authToken', data.token);
          console.log("role:",data.role);
          localStorage.setItem('role',data.role)
          // decidir se é patient ou phychologist
          //possivelmente chamar outra requisição para saber o role
          toast({
            title: 'Login realizado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/home'); // Redireciona para a página home
        } else {
          toast({
            title: 'Erro',
            description: data.message || 'Verifique as informações e tente novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'Erro ao conectar-se à API',
          description: 'Verifique sua conexão ou tente novamente mais tarde.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Função para alternar entre mostrar e esconder a senha

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
          Login
        </Heading>

        <VStack spacing={4} mb={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              name='email'
              // onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                name='password'
                // onChange={handleChange}
                onChange={(e) => setSenha(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button
           type='submit'
            colorScheme="blue"
            rightIcon={<ArrowForwardIcon />}
            w="full"
            onClick={handleLogin}
            disabled={loading === true || !validadorInput()}
            // onClick={handleLogin}
          >
            Entrar
          </Button>
        </VStack>

        {/* Link para redirecionar para a página de cadastro */}
        <Flex justify="center" mt={6}>
          <Text>
            Não tem uma conta?{' '}
            <Link color="blue.500" onClick={() => navigate('/cadastro')} fontWeight="bold">
              Cadastre-se
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
