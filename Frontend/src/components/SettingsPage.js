import React, { useState } from 'react';
import {
  Box, Heading, Input, Button, Select, VStack, HStack, Text, Grid, Flex, useToast, Card, CardBody, Stack, Switch,
} from '@chakra-ui/react';

const SettingPage = ({ onChangeTheme }) => {
  const [language, setLanguage] = useState('pt');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('violet');
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const toast = useToast();

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    if (onChangeTheme) {
      onChangeTheme(theme); // Verifica se onChangeTheme está disponível
    }
  };

  // Função para enviar email de alteração de senha
  const handleSendEmail = () => {
    toast({
      title: 'E-mail enviado.',
      description: 'Verifique sua caixa de entrada para mudar a senha.',
      status: 'info',
      duration: 4000,
      isClosable: true,
    });
  };

  // Função para salvar todas as configurações
  const handleSaveSettings = () => {
    toast({
      title: 'Configurações salvas com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box w="100%" maxW="800px" mx="auto" mt={10} p={5} bg="secondary.100" borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={5} color="primary.400">
        Configurações da Conta
      </Heading>

      {/* Seção de Dados Pessoais */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <VStack spacing={6}>
            <VStack spacing={4} align="start" w="100%">
              <Box w="100%">
                <Text fontWeight="bold" color="primary.500">Email:</Text>
                <Input
                  value="usuario@email.com" // E-mail fictício
                  isReadOnly
                  bg="primary.100"
                  borderColor="primary.300"
                />
              </Box>
              <Box w="100%">
                <Text fontWeight="bold" color="primary.500">Senha:</Text>
                <HStack spacing={4}>
                  <Text>******</Text>
                  <Button size="sm" colorScheme="blue" onClick={handleSendEmail}>
                    Enviar email para alterar senha
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Seção de Privacidade */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Configurações de Privacidade</Heading>
          <HStack justify="space-between" w="full">
            <Text>Perfil Privado</Text>
            <Switch
              colorScheme="teal"
              isChecked={isPrivateProfile}
              onChange={(e) => setIsPrivateProfile(e.target.checked)}
            />
          </HStack>
        </CardBody>
      </Card>

      {/* Seção de Forma de Pagamento */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Forma de Pagamento</Heading>
          <Select
            placeholder="Escolha uma forma de pagamento"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            bg="primary.100"
            borderColor="primary.300"
          >
            <option value="creditCard">Cartão de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="boleto">Boleto Bancário</option>
          </Select>
          {paymentMethod && (
            <Input placeholder="Insira os dados do pagamento" mt={4} bg="primary.100" borderColor="primary.300" />
          )}
        </CardBody>
      </Card>

      {/* Seção de Idioma Padrão */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Idioma Padrão</Heading>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            bg="primary.100"
            borderColor="primary.300"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
            <option value="es">Espanhol</option>
          </Select>
        </CardBody>
      </Card>

      {/* Seção de Mudança de Tema */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Tema de Cores</Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {[
              { theme: 'violet', color: '#E9D8FD', label: 'Violeta' },
              { theme: 'blue', color: '#CCE7FF', label: 'Azul' },
              { theme: 'green', color: '#D4EDDA', label: 'Verde' },
              { theme: 'blackAndWhite', color: '#F0F0F0', label: 'Preto e Branco' },
              { theme: 'coral', color: '#FFDAC1', label: 'Coral' },
              { theme: 'gray', color: '#E6E6E6', label: 'Cinza' },
            ].map(({ theme, color, label }) => (
              <Flex
                key={theme}
                p={4}
                bg={color}
                cursor="pointer"
                borderRadius="md"
                justify="center"
                align="center"
                onClick={() => handleThemeChange(theme)}
                border={selectedTheme === theme ? '2px solid' : 'none'}
                borderColor={selectedTheme === theme ? 'primary.400' : 'transparent'}
              >
                <Text>{label}</Text>
              </Flex>
            ))}
          </Grid>
        </CardBody>
      </Card>

      {/* Seção de Notificações */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Notificações</Heading>
          <VStack align="start" spacing={4}>
            <HStack justify="space-between" w="full">
              <Text>Notificações por Email</Text>
              <Switch
                colorScheme="teal"
                isChecked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
            </HStack>
            <HStack justify="space-between" w="full">
              <Text>Notificações por SMS</Text>
              <Switch
                colorScheme="teal"
                isChecked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Seção de Segurança */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Segurança</Heading>
          <HStack justify="space-between" w="full">
            <Text>Autenticação em Duas Etapas</Text>
            <Switch
              colorScheme="teal"
              isChecked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
            />
          </HStack>
        </CardBody>
      </Card>

      {/* Botão para salvar todas as configurações */}
      <Button onClick={handleSaveSettings} colorScheme="green" size="lg" w="full">
        Salvar Configurações
      </Button>
    </Box>
  );
};

export default SettingPage;
