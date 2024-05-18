import {
    FormLabel,
    Input,
    Container,
    Select,
    Textarea,
    Button,
    useToast,
    CloseButton, 
    Text,
  } from '@chakra-ui/react'
import { useState } from 'react';
import ReglaLink from './ReglaLink';

export const FormularioPresent = () => { 
  const initialFormData = {  
    dr:'',
    nombre: '',
    colonia_de_residencia: '',
    cedula: '',
    titulo: '',
    experiencia:'',
    material_que_requiero: '',
    material_que_llevo: '',
    procedimientos_que_no_realizo: '',
    comentarios_adicionales: '',
    remember: false
  }

  const [formData, setFormData] = useState(initialFormData);
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
      const month = date.getMonth() + 1; 
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    let formattedText = '';

    const title = formData.dr === 'Dr.' ? 'Dr' : 'Dra';
    formattedText += `*Formato de Presentación*\n_${title}. ${formData.nombre}_\n`;
    // Resto del formato para otros campos
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'remember'|| key === 'dr' || key === 'nombre') {
        continue;
      }

      // Reemplaza los guiones bajos con espacios y capitaliza la primera letra de cada palabra
      const formattedKey = key.split('_').map(capitalizeFirstLetter).join(' ');
      const formattedValue = key === 'fecha' ? formatDate(value) : value;
      formattedText += `*${formattedKey}:* \n • ${formattedValue}\n`;
    }
    return formattedText;
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
    setFormData(initialFormData);
    toast({
      title: 'Formulario reiniciado',
      description: "Todos los campos han sido reiniciados.",
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

    return (
      <>
    <Container className=" m-10 text-center"> 
       <Container className=" items-end justify-end flex ">
         <a  href="/" ><CloseButton size='lg'/></a>
       </Container>  
    <Text className='mb-8' fontSize='2xl'>Formato Presentación </Text>
      <FormLabel htmlFor="dr">Dr(a).</FormLabel>
      <Select 
        className='mb-2' 
        variant='filled'
        size='lg'
        name="dr" 
        id="dr" 
        onChange={handleChange} 
        placeholder='Selecciona una opción' 
        value={formData.dr}>
       <option value='Dra.'>Dra.</option>
       <option value='Dr.'>Dr.</option>
      </Select>

      <FormLabel htmlFor="nombre">Nombre y Apellido</FormLabel>
      <Input className='mb-2' size='lg'
      name='nombre' 
      id='nombre' 
      placeholder='Juan Perez'  
      onChange={handleChange} 
      value={formData.nombre}/>

      <FormLabel htmlFor="colonia_de_residencia">Colonia de Residencia</FormLabel>
      <Input className='mb-2' size='lg'
      name="colonia_de_residencia" 
      id="colonia_de_residencia" 
      placeholder='Americana' 
      onChange={handleChange} 
      value={formData.colonia_de_residencia}/>
    
    <FormLabel htmlFor="cedula">Tipo de Cédula</FormLabel>
      <Select 
        className='mb-2' 
        variant='filled'
        size='lg'
        name="cedula" 
        id="cedula" 
        onChange={handleChange} 
        placeholder='Selecciona una opción' 
        value={formData.cedula}>
       <option value='Federal'>Federal</option>
       <option value='Provicional'>Provicional</option>
       <option value='Estatal'>Estatal</option>
      </Select>

      <FormLabel htmlFor="titulo">¿Cuentas con Título?</FormLabel>
      <Select 
        className='mb-2' 
        variant='filled'
        size='lg'
        name="titulo" 
        id="titulo" 
        onChange={handleChange} 
        placeholder='Selecciona una opción' 
        value={formData.titulo}>
       <option value='Sí'>Sí</option>
       <option value='No'>No</option>
      </Select>
    

      <FormLabel htmlFor="experiencia">Experiencia</FormLabel>
        <Textarea 
        className='mb-2' 
        name="experiencia" 
        onChange={handleChange} 
        id="experiencia" 
        placeholder='Experiencia Laboral...' 
        value={formData.experiencia}  />
      

      <FormLabel htmlFor="material_que_requiero">Material que requiero</FormLabel>
        <Textarea
        className='mb-2' 
        name="material_que_requiero" 
        onChange={handleChange}
        id="material_que_requiero" 
        placeholder='Material Requerido...' 
        value={formData.material_que_requiero} />

      <FormLabel htmlFor="material_que_llevo">Material que llevo</FormLabel>
        <Textarea
        className='mb-2' 
        name="material_que_llevo" 
        onChange={handleChange}
        id="material_que_llevo" 
        placeholder='Material que tengo...' 
        value={formData.material_que_llevo} />


      <FormLabel htmlFor="procedimientos_que_no_realizo">Procedimientos que no realizo</FormLabel>
        <Textarea
        className='mb-2' 
        name="procedimientos_que_no_realizo" 
        onChange={handleChange}
        id="procedimientos_que_no_realizo" 
        placeholder='No receto vitaminas...' 
        value={formData.procedimientos_que_no_realizo} />

      <FormLabel htmlFor="comentarios_adicionales">Comentarios Adicionales</FormLabel>
        <Textarea
        className='mb-2' 
        name="comentarios_adicionales" 
        onChange={handleChange}
        id="comentarios_adicionales" 
        placeholder='Comentarios extras...' 
        value={formData.comentarios_adicionales} />

      <FormLabel htmlFor="">Texto formateado</FormLabel>
        <Textarea
        variant='filled' 
        readOnly
        value={formatText()}
        rows={10}
        placeholder='Here is a sample placeholder'  />
        <Container className=" text-center mt-4 flex justify-between gap-3">
          
        <Button  onClick={validateForm} colorScheme='green'>
              Validar y Copiar
            </Button>
          <ReglaLink/> 
            <Button  onClick={resetForm} colorScheme='orange'>
              Limpiar Campos
            </Button>
          
        </Container>
      </Container>
    </>
    )
  }