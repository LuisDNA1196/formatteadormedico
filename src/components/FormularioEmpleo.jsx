import {
    FormLabel,
    Input,
    Container,
    Select,
    InputLeftElement,
    InputGroup, 
    Textarea,
    Button,
    useToast,
    Text,
    Tooltip,
    IconButton,
    Flex,
    Box,

  } from '@chakra-ui/react'

  import { InfoOutlineIcon,RepeatIcon,CopyIcon } from '@chakra-ui/icons'
import { useState } from 'react';
import ReglaLink from './ReglaLink';
import ButtonWitha from './ButtonWitha';
import WhatsBox from './WhatsBox';
import { initialFormDataEmpleo } from '../assets/formDatas';

export const FormularioEmpleo = () => { 
 

  const [formData, setFormData] = useState(initialFormDataEmpleo);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  }

  const formatText = () => {
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    let formattedText = '';

    formattedText += `*_\`Formato de Empleo\`_*\n`;

    // Resto del formato para otros campos
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'remember') {
        continue;
      }

      // Reemplaza los guiones bajos con espacios y capitaliza la primera letra de cada palabra
      const formattedKey = key.split('_').map(capitalizeFirstLetter).join(' ');
      const formattedValue = key === 'fecha' ? formatDate(value) : value;
      formattedText += `*${formattedKey}:* \n • ${formattedValue}\n`;
    }
    return formattedText;
  };

  const formatPreviewText = () => {
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

   
    const previewItems = Object.entries(formData)
      .filter(([key]) => key !== 'remember')
      .map(([key, value]) => {
        const formattedKey = key.split('_').map(capitalizeFirstLetter).join(' ');
        const formattedValue = key === 'fecha' ? formatDate(value) : value;
        return (
          <Box key={key} mb={2} align="left">
            <Text as="span" fontWeight="bold">{formattedKey}:</Text>
            <br/>
            <Text as="span">• {formattedValue}</Text>
          </Box>
        );
      });

    return previewItems;
  };

  const copyToClipboard = () => {
    const textToCopy = formatText();
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'Texto copiado.',
      description: "El texto formateado ha sido copiado al portapapeles.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === '' && key !== 'remember' && key !== 'comentarios_adicionales') {
        const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        toast({
          title: 'Error de validación',
          description: `El campo "${formattedKey}" es obligatorio.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        return false;
      }
    }
    toast({
      title: 'Formulario completo',
      description: "Todos los campos están llenos.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    copyToClipboard();
    return true;
  };

  const resetForm = () => {
    setFormData(initialFormDataEmpleo);
    toast({
      title: 'Formulario reiniciado',
      description: "Todos los campos han sido reiniciados.",
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const dateValue = () => {
    return formData.fecha == isNaN ? ' ' : formData.fecha;  }


    return (
      <>
    <Container className=" m-10 text-center"> 
       <Container className=" items-end justify-end flex ">
         <ButtonWitha name='Regresar' colorScheme='red' href="/" ></ButtonWitha>
       </Container>  
    <Text className='mb-8' fontSize='2xl' >Formato Empleo</Text>
      <FormLabel htmlFor="tipo_de_cobertura">Tipo de cobertura</FormLabel>
      <Select 
        className='mb-2' 
        variant='filled'
        size='lg'
        name="tipo_de_cobertura" 
        id="tipo_de_cobertura" 
        onChange={handleChange} 
        placeholder='Selecciona cobertura' 
        value={formData.tipo_de_cobertura}>
       <option value='Consultorio anexo farmarcia'>Consultorio anexo farmarcia</option>
       <option value='Clinica'>Clínica</option>
       <option value='Hospítal'>Hospital</option>
       <option value='Guardia'>Guardia</option>
      </Select>

      <FormLabel htmlFor="fecha">Fecha de inicio</FormLabel>
      <Input className='mb-2' 
      name='fecha' 
      id='fecha' 
      placeholder='Select Date and Time' size='lg' type='date' 
      onChange={handleChange} 
      value= {dateValue()}/>

      <FormLabel htmlFor="horario">Horario</FormLabel>
      <Input className='mb-2' size='lg'
      name="horario" 
      id="horario" 
      placeholder='De 8:00 a 16:00' 
      onChange={handleChange} 
      value={formData.horario}/>
    
    <Container>
      <Flex align="center">
        <FormLabel htmlFor="sueldo">Sueldo (Guardia, Base, Asegurado)</FormLabel>
        <Tooltip 
          hasArrow 
          label="Sueldo base mínimo $300 pesos turno de 4 horas. Guardias hospitalarias 
          • Turno único 24h: $2,000
          • Para más informacion consulta el reglamento"
          bg="teal.600"
        >
          <IconButton 
            colorScheme="teal" 
            variant="ghost" 
            icon={<InfoOutlineIcon />} 
          />
        </Tooltip>
      </Flex>
    </Container>
      <InputGroup>
        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'> $
        </InputLeftElement>
          <Input className='mb-2' size='lg'
          name="sueldo" 
          id="sueldo" 
          onChange={handleChange} 
          placeholder='Escriba el sueldo'  
          value={formData.sueldo}/>
      </InputGroup>

    <FormLabel htmlFor="ubicacion">Ubicacion</FormLabel>
      <Input className='mb-2' size='lg'
       name="ubicacion" 
       id="ubicacion" 
       onChange={handleChange}  
       placeholder='Link Google Maps'
       value={formData.ubicacion}  />
    
    <FormLabel htmlFor="sexo">Sexo Especifico</FormLabel>
      <Select className='mb-2' size='lg' 
      variant='filled'
      name="sexo" 
      id="sexo" 
      placeholder='Selecciona una opción' 
      onChange={handleChange}  value={formData.sexo}>
        <option value='No aplica'>No aplica</option>
        <option value='Masculino'>Masculino</option>
        <option value='Femenino'>Femenino</option>
      </Select>
       
    <FormLabel htmlFor="costo_consulta">Costo de consulta</FormLabel>
    <InputGroup>
    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
      $
    </InputLeftElement>
      <Input className='mb-2' size='lg'
       name="costo_consulta"
       id="costo_consulta" 
       onChange={handleChange} placeholder='Sueldo x consulta/guardia' value={formData.costo_consulta} />
    </InputGroup>

      <FormLabel htmlFor="experiencia">Requisitos/Experiencia</FormLabel>
        <Textarea 
        className='mb-2' 
        name="experiencia" 
        onChange={handleChange} 
        id="experiencia" 
        placeholder='Requisitos/experiencia necesaria para el puesto.' 
        value={formData.experiencia}  />
      

      <FormLabel htmlFor="comentarios_adicionales">Comentarios</FormLabel>
        <Textarea
        className='mb-2' 
        name="comentarios_adicionales" 
        onChange={handleChange}
        id="comentarios_adicionales" 
        placeholder='Comentarios adicionales.' 
        value={formData.comentarios_adicionales} />

      {/* <FormLabel htmlFor="">Texto formateado</FormLabel>
        <Textarea
        variant='filled' 
        readOnly
        value={formatText()}
        rows={10}
        placeholder='Here is a sample placeholder'
        
        /> */}
        
        <WhatsBox 
        contenidotxt={formatPreviewText()} 
        title="Formato Empleo" 
        />
        
        <Container className="text-center mt-4">
            <div className="flex justify-evenly gap-4 sm:text-xs">
              <Button onClick={validateForm} colorScheme="green" rightIcon={<CopyIcon />} >
                Copiar
              </Button>
              <Button onClick={resetForm} colorScheme="orange" rightIcon={<RepeatIcon />}>
                Reiniciar
              </Button>
            </div>
            <div className="mt-4">
              <ReglaLink />
            </div>
          </Container>
      </Container>
    </>
    )
  }