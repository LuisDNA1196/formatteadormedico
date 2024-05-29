import { Button } from "@chakra-ui/react"


 const ButtonWitha = ({name, href,colorScheme}) => {
  return (
    <>
     <a className=" sm:text-xs sm:px-2 sm:py-1" href={href}>
      <Button colorScheme={colorScheme} className=" sm:text-xs sm:px-2 sm:py-1">
        {name}
      </Button>
     </a>
    </> 
  )
}

export default ButtonWitha