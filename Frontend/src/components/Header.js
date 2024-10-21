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
import { HamburgerIcon } from '@chakra-ui/icons';
import LogoutModal from './ModalLogout'; // Importa o modal de logout

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure(); // Para o modal de logout
  //Mudar de Paginas
  const navigate = useNavigate();

  const Home = () => {
    navigate('/');
  };
  
  const PerfilC = () => {
    navigate('/perfil/cliente');
  };
  const PerfilP = () => {
    navigate('/perfil/psicologo');
  };
  const HistóricoConsulta = () => {
    navigate('/consultas');
  };
  const FeedPage = () => {
    navigate('/feed');
  };
  const configura = () => {
    navigate('/configuracao');
  };

  return (
    <>
      <Box bg="primary.300" color="white" px={10}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Botão de Menu (Hamburger) para abrir a Sidebar */}
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            colorScheme="prurple"
            variant="ghost"
            aria-label="Open Menu"
            bg="primary.400"
            _hover={{ bg: "primary.500" }}
          />

          {/* Título do Header */}
          <Flex alignItems="center" onClick={Home} className="pointer">
            <Avatar src="/path-to-profile-pic.jpg" size="sm" mr={4} ml='30'/>
            <Text fontSize="lg" fontWeight="bold">
              REPPSI
            </Text>
          </Flex>

          {/* Avatar e Botão de Fechar Perfil */}
          <Flex alignItems="center">
            <Avatar name="Christian Nwamba" src="/path-to-profile-pic.jpg" className="pointer" _hover={{ bg: "primary.700" }}
            onClick={PerfilC}/> 
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
                <Button variant="ghost" colorScheme="purple" onClick={configura}>
                  Configurações
                </Button>
                {/* Botão que abre o modal de Logout */}
                <Button variant="ghost" colorScheme="purple" onClick={onLogoutOpen}>
                  Logout
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* Modal de Logout */}
      <LogoutModal isOpen={isLogoutOpen} onClose={onLogoutClose} />
    </>
  );
}

export default Header;
