import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const LogoutModal = ({ isOpen, onClose }) => {
  // Função para confirmar o logout
  const handleLogout = () => {
    // Implementar a lógica de logout, como limpar tokens e redirecionar para a página de login
    console.log("Usuário deslogado");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="lg">
        <ModalHeader fontWeight="bold" color="primary.500">
          Confirmar Logout
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" color="primary.400">
            Você tem certeza que deseja fazer logout?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Sair
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
