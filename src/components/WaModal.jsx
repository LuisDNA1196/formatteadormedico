import { 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogCloseButton, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Button, 
    useDisclosure } from "@chakra-ui/react"
import React from "react"
import WhatsIcon from "../assets/WhatsIcon"
import ButtonWitha from "./ButtonWitha"


function TransitionExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button onClick={onOpen} rightIcon= {<WhatsIcon/>} variant='outline' colorScheme="green" className='w-[130px]' >WhatsApp</Button>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader> Ir a WhatsApp... </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Desea salir e ir al grupo de Whatsapp?
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonWitha   colorScheme='green' name="Sí" href="https://chat.whatsapp.com/G59RHqQtSVHLm5tzbLFHSL">
                
              </ButtonWitha>
              <Button ref={cancelRef} onClick={onClose} colorScheme='red' ml={3}>
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  export default TransitionExample