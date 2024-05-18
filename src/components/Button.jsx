import { Button } from "@chakra-ui/react"


export const ButtonWitha = ({name, href,colorScheme}) => {
  return (
    <>
     <a className="m-4" href={href}>
      <Button colorScheme={colorScheme}>
        {name}
      </Button>
     </a>
    </> 
  )
}
