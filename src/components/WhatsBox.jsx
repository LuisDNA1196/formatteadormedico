import { Box, Text } from "@chakra-ui/react"


const WhatsBox = ({contenidotxt, title}) => {
  return (
    <>
    <Text align='center' as='b'>Texto para WhatsApp</Text>
        <Box p={10} border="2px" borderColor="gray.200" borderRadius="md" backgroundColor="gray.50" backgroundImage={"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"}>
          <Box p={2}  borderColor="white" borderRadius="lg" backgroundColor="white" >
          <Text  fontSize='lg' as='b' align='left'  >{title}</Text>
            {contenidotxt}
          </Box>
        </Box>
    </>
  )
}

export default WhatsBox