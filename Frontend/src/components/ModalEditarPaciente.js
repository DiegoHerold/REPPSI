import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Stack,
  Flex,
  Text,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

const ModalEditarPaciente = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleAddTag,
  handleRemoveTag,
  handleSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Perfil do Paciente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {/* Campo para o Nome */}
            <Input
              placeholder="Nome"
              name="nome"
              value={formData?.nome || ""}
              onChange={handleInputChange}
            />
            {/* Campo para a Idade */}
            <Input
              placeholder="Idade"
              name="idade"
              type="number"
              value={formData?.perfil?.idade || ""}
              onChange={handleInputChange}
            />
            {/* Campo para a Localização */}
            <Input
              placeholder="Localização"
              name="localizacao"
              value={formData?.perfil?.localizacao || ""}
              onChange={handleInputChange}
            />
            {/* Campo para a Biografia */}
            <Textarea
              placeholder="Biografia"
              name="bio"
              value={formData?.perfil?.bio || ""}
              onChange={handleInputChange}
            />
            {/* Título para as Especialidades */}
            <Text fontSize="lg" fontWeight="bold">
              Preferências de Especialidades
            </Text>
            {/* Tags de Especialidades Existentes */}
            <Flex wrap="wrap" gap={2}>
              {formData?.perfil?.preferencias?.interessesEspecialidade?.map((tag, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Flex>
            {/* Botões para Adicionar Novas Especialidades */}
            <Flex wrap="wrap" gap={2}>
              {["Terapia Cognitivo-Comportamental", "Psicologia Infantil"].map((spec, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddTag(spec)}
                  disabled={formData?.perfil?.preferencias?.interessesEspecialidade?.includes(spec)}
                >
                  {spec}
                </Button>
              ))}
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditarPaciente;


