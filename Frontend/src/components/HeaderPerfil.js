import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  IconButton,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //Mudar de Paginas
  const navigate = useNavigate();

  const Home = () => {
    // Mudar para a página About ao clicar
    navigate('/');
  };
  
  const PerfilC = () => {
    // Mudar para a página About ao clicar
    navigate('/perfil/cliente');
  };
  const PerfilP = () => {
    // Mudar para a página About ao clicar
    navigate('/perfil/psicologo');
  };
  const HistóricoConsulta = () => {
    // Mudar para a página About ao clicar
    navigate('/consultas');
  };
  const FeedPage= () => {
    // Mudar para a página About ao clicar
    navigate('/feed');
  };

  return (
    <Box bg="primary.300" color="white" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Botão de Menu (Hamburger) para abrir a Sidebar */}
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          icon={<HamburgerIcon />}
          colorScheme="purple"
          variant="ghost"
          aria-label="Open Menu"
          _hover={{ bg: "primary.200" }}
        />

        {/* Título do Header */}
        <Flex alignItems="center" onClick={Home} className="pointer">
        <Avatar src="/path-to-profile-pic.jpg" size="sm" mr={4} ml='30'/>
        <Text fontSize="lg" fontWeight="bold" >
          REPPSI
        </Text>
        </Flex>
        {/* Avatar e Botão de Fechar Perfil */}
        <Flex alignItems="center">
          {/* <Avatar src="/path-to-profile-pic.jpg" size="sm" mr={4} /> */}
          <Button
            rightIcon={<CloseIcon />}
            colorScheme="purple"
            variant="outline"
            _hover={{ bg: "primary.200" }}
            onClick={Home}
          >
            Fechar Perfil
          </Button>
        </Flex>
      </Flex>

      {/* Sidebar (Drawer) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bg="primary.200">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
            <Button variant="ghost" colorScheme="purple" onClick={Home}>
                Home
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={PerfilC}>
                Perfil
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={PerfilP}>
                Perfil Psicologo
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={HistóricoConsulta}>
                Consultas
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={FeedPage}>
                Feed
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={() => alert('Ir para Configurações')}>
                Configurações
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={() => alert('Logout')}>
                Logout
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Header;