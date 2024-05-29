import { Container, Text, Flex, Heading } from '@chakra-ui/react';
import ButtonWitha from './ButtonWitha';
import ReglaLink from './ReglaLink';

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
        <Heading fontSize="2xl" >Bienvenido Doctor@/Proveedor@</Heading></Container>
        <Container className="mt-10 text-center">
          <Text fontSize="xl" as="i">Busco...</Text>
        </Container>
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          mt={8} 
          gap={8}
          justify="center" 
          align="center"  
        >
          <ButtonWitha href="/FormularioPresent" colorScheme="teal" name="Solicitar Empleo" />
          <ButtonWitha href="/FormularioEmpleo" colorScheme="green" name="Ofrecer Empleo" />
          <ReglaLink/>
        </Flex>
      
    </Flex>
  );
};

export default Home;
