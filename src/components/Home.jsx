import { Container, Text, Flex, Heading } from '@chakra-ui/react';
import { ButtonWitha } from './Button';

const Home = () => {
  return (
    <Flex 
      direction="column" 
      justify="center" 
      align="center" 
      minHeight="100vh"
      w="full"
    >
      <Container className="text-center">
        <Heading as="h1" fontSize="2xl" pretty>Bienvenido Doctor@/Proveedor@</Heading>
        <Container className="mt-10">
          <Text fontSize="lg" as="i">Busco...</Text>
        </Container>
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          mt={10} 
          gap={4}
          justify="center" // Asegura que los botones estén centrados
          align="center"   // Asegura que los botones estén alineados verticalmente
        >
          <ButtonWitha href="/FormularioPresent" colorScheme="teal" name="Solicitar Empleo" />
          <ButtonWitha href="/FormularioEmpleo" colorScheme="green" name="Ofrecer Empleo" />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Home;
