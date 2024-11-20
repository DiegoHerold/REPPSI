import React, { useState } from "react";
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
  Button,
  Text,
  Tag,
  TagLabel,
  Select,
  Flex,
  Grid,
  Divider,
  Box,
} from "@chakra-ui/react";

const ModalDetalhesPsicologo = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  // Alterna a disponibilidade de uma hora específica
  const toggleHourAvailability = (hour) => {
    if (!selectedDate) return;

    const updatedDates = formData.horariosDisponiveis.map((item) => {
      if (item.data === selectedDate) {
        const updatedHours = item.horas.map((h) =>
          h.hora === hour ? { ...h, disponivel: !h.disponivel } : h
        );
        return { ...item, horas: updatedHours };
      }
      return item;
    });

    handleInputChange({
      target: {
        name: "horariosDisponiveis",
        value: updatedDates,
      },
    });
  };

  // Obtém os horários para a data selecionada
  const getHoursForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateData = formData.horariosDisponiveis.find(
      (item) => item.data === selectedDate
    );
    return dateData?.horas || [];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>Detalhes do Psicólogo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={6}>
            {/* Informações Básicas */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Nome
              </Text>
              <Input
                name="nome"
                value={formData.nome || ""}
                onChange={handleInputChange}
                placeholder="Nome completo"
              />

              <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
                CRP
              </Text>
              <Input
                name="registro"
                value={formData.registro || ""}
                onChange={handleInputChange}
                placeholder="Registro profissional (CRP)"
              />

              <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
                Localização
              </Text>
              <Input
                name="localizacao"
                value={formData.perfil?.localizacao || ""}
                onChange={handleInputChange}
                placeholder="Cidade/Estado"
              />

              <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
                Valor da Consulta
              </Text>
              <Input
                name="valorConsulta"
                type="number"
                value={formData.perfil?.valorConsulta || ""}
                onChange={handleInputChange}
                placeholder="Preço por consulta"
              />
            </Box>

            {/* Informações Avançadas */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Especialidades
              </Text>
              <Flex wrap="wrap" gap={2} mb={4}>
                {formData.perfil?.especialidades.map((spec, index) => (
                  <Tag
                    key={index}
                    size="lg"
                    colorScheme="blue"
                    borderRadius="full"
                    cursor="pointer"
                  >
                    <TagLabel>{spec}</TagLabel>
                  </Tag>
                ))}
              </Flex>

              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Descrição
              </Text>
              <Textarea
                name="descricao"
                value={formData.perfil?.descricao || ""}
                onChange={handleInputChange}
                placeholder="Descrição profissional"
              />

              <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
                Avaliação Média
              </Text>
              <Text>
                {formData.avaliacoes?.avaliacaoMedia || "Sem avaliações ainda"}
              </Text>
            </Box>
          </Grid>

          <Divider my={6} />

          {/* Gerenciamento de Horários */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Gerenciar Horários
            </Text>
            <Select
              placeholder="Selecione uma data"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              mb={4}
            >
              {formData.horariosDisponiveis.map((item) => (
                <option key={item.data} value={item.data}>
                  {item.data}
                </option>
              ))}
            </Select>

            {selectedDate && (
              <>
                <Text fontWeight="bold" mb={4}>
                  Horários para {selectedDate}
                </Text>
                <Flex wrap="wrap" gap={2}>
                  {getHoursForSelectedDate().map((hour) => (
                    <Tag
                      key={hour.hora}
                      size="lg"
                      colorScheme={hour.disponivel ? "green" : "red"}
                      borderRadius="full"
                      onClick={() => toggleHourAvailability(hour.hora)}
                      cursor="pointer"
                    >
                      <TagLabel>{hour.hora}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Salvar Alterações
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetalhesPsicologo;
