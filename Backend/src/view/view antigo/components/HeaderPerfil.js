const React = require('react');
const {
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
} = require('@chakra-ui/react');
const { HamburgerIcon, CloseIcon } = require('@chakra-ui/icons');

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        <Flex alignItems="center">
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
            onClick={() => alert('Fechar Perfil')}
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
              <Button variant="ghost" colorScheme="purple" onClick={() => alert('Ir para Dashboard')}>
                Dashboard
              </Button>
              <Button variant="ghost" colorScheme="purple" onClick={() => alert('Ir para Perfil')}>
                Perfil
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

module.exports = Header;