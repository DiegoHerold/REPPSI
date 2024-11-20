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
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../img/LogoREPPSI.png';
import LogoutModal from './ModalLogout';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();
  const navigate = useNavigate();

  // Funções para navegação
  const Home = () => navigate('/home');
  const Perfil = () => navigate('/perfil');
  const HistóricoConsulta = () => navigate('/consultas');
  const FeedPage = () => navigate('/feed');
  const Configuracao = () => navigate('/configuracao');

  return (
    <>
      <Box bg="primary.300" color="white" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between" position="relative">
          {/* Botão de Menu (Hamburger) para abrir a Sidebar */}
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            colorScheme="purple"
            variant="ghost"
            aria-label="Open Menu"
            _hover={{ bg: 'primary.200' }}
          />

          {/* Título do Header centralizado */}
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Flex alignItems="center" onClick={Home} cursor="pointer">
              <Avatar src={logo} size="md" />
            </Flex>
          </Box>

          {/* Avatar e Botão de Fechar Perfil */}
          <Flex alignItems="center">
            <Button
              rightIcon={<CloseIcon />}
              colorScheme="purple"
              variant="outline"
              _hover={{ bg: 'primary.200' }}
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
                <Button variant="ghost" colorScheme="purple" onClick={Perfil}>
                  Perfil
                </Button>
                <Button variant="ghost" colorScheme="purple" onClick={HistóricoConsulta}>
                  Consultas
                </Button>
                <Button variant="ghost" colorScheme="purple" onClick={FeedPage}>
                  Feed
                </Button>
                <Button variant="ghost" colorScheme="purple" onClick={Configuracao}>
                  Configurações
                </Button>
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

