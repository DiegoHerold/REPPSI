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
  Box,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Select,
} from "@chakra-ui/react";

const especialidadesDisponiveis = [
  "Terapia Cognitivo-Comportamental",
  "Terapia Familiar",
  "Terapia de Casal",
  "Psicologia Infantil",
  "Psicanálise",
];

const ModalEditarPsicologo = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState(""); // Data selecionada para exibir horários

  // Alternar disponibilidade de horário
  const toggleHourAvailability = (hour) => {
    if (!selectedDate) return;
    const updatedDates = (formData.horariosDisponiveis || []).map((item) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>Editar Perfil do Psicólogo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {/* Nome */}
            <Input
              placeholder="Nome"
              name="nome"
              value={formData.nome || ""}
              onChange={handleInputChange}
            />

            {/* Localização */}
            <Input
              placeholder="Localização"
              name="localizacao"
              value={formData.perfil?.localizacao || ""}
              onChange={handleInputChange}
            />

            {/* Descrição */}
            <Textarea
              placeholder="Descrição do psicólogo"
              name="descricao"
              value={formData.perfil?.descricao || ""}
              onChange={handleInputChange}
            />

            {/* Especialidades */}
            <Text fontWeight="bold" fontSize="lg">
              Especialidades
            </Text>
            <Flex wrap="wrap" gap={2}>
              {especialidadesDisponiveis.map((especialidade, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleInputChange({
                      target: {
                        name: "especialidades",
                        value: [
                          ...formData.perfil?.especialidades || [],
                          especialidade,
                        ],
                      },
                    })
                  }
                  disabled={formData.perfil?.especialidades?.includes(especialidade)}
                >
                  {especialidade}
                </Button>
              ))}
            </Flex>
            <Flex wrap="wrap" gap={2} mt={2}>
              {(formData.perfil?.especialidades || []).map((especialidade, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{especialidade}</TagLabel>
                  <TagCloseButton
                    onClick={() =>
                      handleInputChange({
                        target: {
                          name: "especialidades",
                          value: formData.perfil?.especialidades?.filter(
                            (e) => e !== especialidade
                          ),
                        },
                      })
                    }
                  />
                </Tag>
              ))}
            </Flex>

            {/* Valor da Consulta */}
            <Text fontWeight="bold" fontSize="lg" mt={4}>
              Valor da Consulta (R$)
            </Text>
            <Input
              placeholder="Digite o valor da consulta"
              type="number"
              name="valorConsulta"
              value={formData.perfil?.valorConsulta || ""}
              onChange={handleInputChange}
            />

            {/* Seleção de Datas */}

            {/* Horários Disponíveis */}
            
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

export default ModalEditarPsicologo;








// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Textarea,
//   Stack,
//   Button,
//   Box,
//   Text,
//   SimpleGrid,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   Flex,
//   useBreakpointValue,
//   Select,
// } from "@chakra-ui/react";

// const especialidadesDisponiveis = [
//   "Terapia Cognitivo-Comportamental",
//   "Terapia Familiar",
//   "Terapia de Casal",
//   "Psicologia Infantil",
//   "Psicanálise",
// ];

// const ModalEditarPsicologo = ({
//   isOpen,
//   onClose,
//   formData,
//   handleInputChange,
//   handleSubmit,
// }) => {
//   const [selectedDate, setSelectedDate] = useState(""); // Data selecionada para mostrar horários

//   const modalSize = useBreakpointValue({ base: "full", md: "lg" });

//   // Alternar disponibilidade de horário
//   const toggleHourAvailability = (hour) => {
//     const updatedDates = formData.horariosDisponiveis.map((item) => {
//       if (item.data === selectedDate) {
//         const updatedHours = item.horas.map((h) =>
//           h.hora === hour ? { ...h, disponivel: !h.disponivel } : h
//         );
//         return { ...item, horas: updatedHours };
//       }
//       return item;
//     });

//     handleInputChange({
//       target: {
//         name: "horariosDisponiveis",
//         value: updatedDates,
//       },
//     });
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
//       <ModalOverlay />
//       <ModalContent maxH="90vh" overflowY="auto">
//         <ModalHeader>Editar Perfil do Psicólogo</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Stack spacing={4}>
//             {/* Nome */}
//             <Input
//               placeholder="Nome"
//               name="nome"
//               value={formData.nome || ""}
//               onChange={handleInputChange}
//             />

//             {/* Localização */}
//             <Input
//               placeholder="Localização"
//               name="localizacao"
//               value={formData.perfil?.localizacao || ""}
//               onChange={handleInputChange}
//             />

//             {/* Descrição */}
//             <Textarea
//               placeholder="Descrição do psicólogo"
//               name="descricao"
//               value={formData.perfil?.descricao || ""}
//               onChange={handleInputChange}
//             />

//             {/* Especialidades */}
//             <Text fontWeight="bold" fontSize="lg">
//               Especialidades
//             </Text>
//             <Flex wrap="wrap" gap={2}>
//               {especialidadesDisponiveis.map((especialidade, index) => (
//                 <Button
//                   key={index}
//                   size="sm"
//                   variant="outline"
//                   onClick={() =>
//                     handleInputChange({
//                       target: {
//                         name: "especialidades",
//                         value: [
//                           ...formData.perfil.especialidades,
//                           especialidade,
//                         ],
//                       },
//                     })
//                   }
//                   disabled={formData.perfil.especialidades.includes(especialidade)}
//                 >
//                   {especialidade}
//                 </Button>
//               ))}
//             </Flex>
//             <Flex wrap="wrap" gap={2} mt={2}>
//               {formData.perfil.especialidades.map((especialidade, index) => (
//                 <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
//                   <TagLabel>{especialidade}</TagLabel>
//                   <TagCloseButton
//                     onClick={() =>
//                       handleInputChange({
//                         target: {
//                           name: "especialidades",
//                           value: formData.perfil.especialidades.filter(
//                             (e) => e !== especialidade
//                           ),
//                         },
//                       })
//                     }
//                   />
//                 </Tag>
//               ))}
//             </Flex>

//             {/* Valor da Consulta */}
//             <Text fontWeight="bold" fontSize="lg" mt={4}>
//               Valor da Consulta (R$)
//             </Text>
//             <Input
//               placeholder="Digite o valor da consulta"
//               type="number"
//               name="valorConsulta"
//               value={formData.perfil?.valorConsulta || ""}
//               onChange={handleInputChange}
//             />

//             {/* Escolha da Data */}
//             <Text fontWeight="bold" fontSize="lg" mt={4}>
//               Selecionar Data
//             </Text>
//             <Select
//               placeholder="Selecione uma data"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             >
//               {formData.horariosDisponiveis?.map((date) => (
//                 <option key={date.data} value={date.data}>
//                   {date.data}
//                 </option>
//               ))}
//             </Select>

//             {/* Horários Disponíveis para a Data Selecionada */}
//             {selectedDate && (
//               <>
//                 <Text fontWeight="bold" mt={4}>
//                   Horários para {selectedDate}
//                 </Text>
//                 <SimpleGrid columns={4} spacing={2}>
//                   {formData.horariosDisponiveis
//                     ?.find((item) => item.data === selectedDate)
//                     ?.horas.map((hora) => (
//                       <Button
//                         key={hora.hora}
//                         size="sm"
//                         bg={hora.disponivel ? "green.400" : "red.400"}
//                         color="white"
//                         onClick={() => toggleHourAvailability(hora.hora)}
//                         _hover={{
//                           bg: hora.disponivel ? "green.500" : "red.500",
//                         }}
//                       >
//                         {hora.hora}
//                       </Button>
//                     ))}
//                 </SimpleGrid>
//               </>
//             )}
//           </Stack>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
//             Salvar
//           </Button>
//           <Button variant="ghost" onClick={onClose}>
//             Cancelar
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default ModalEditarPsicologo;
