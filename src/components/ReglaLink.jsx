

import { DownloadIcon } from '@chakra-ui/icons'
import { Button, Link } from '@chakra-ui/react'

const ReglaLink = () => {
  return (
  <> 
    <Link href='https://drive.google.com/file/d/1fMj4rmKFiCgwodohU3XThO231cIuFtYw/view?usp=sharing' isExternal>
        <Button colorScheme='teal' variant='outline' className='w-[130px]'
            aria-label='Reglamento' 
            rightIcon={<DownloadIcon />}> 
            Reglamento
        </Button>
    </Link>
  </>
  )
}

export default ReglaLink