// src/utils.js

import { Box, Text } from "@chakra-ui/react";

// Función para capitalizar la primera letra de una cadena
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Función para formatear el texto del formulario
  export const formatText = (formData) => {
    let formattedText = '';
  
    const title = formData.dr === 'Dr.' ? 'Dr' : 'Dra';
    formattedText += `*_\`Formato de Presentación\`_*\n_${title}. ${formData.nombre}_\n`;
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'remember' || key === 'dr' || key === 'nombre') {
        continue;
      }
      const formattedKey = key.split('_').map(capitalizeFirstLetter).join(' ');
      formattedText += `*${formattedKey}:* \n • ${value}\n`;
    }
    return formattedText;
  };
  
  // Función para formatear el texto de vista previa
  export const formatPreviewText = (formData) => {
    const title = formData.dr === 'Dr.' ? 'Dr' : 'Dra';
    const previewItems = [
      <Box key="dr-nombre" mb={2} align="left">
        <Text as="i">
          {' '}
          {title}. {formData.nombre}
        </Text>
      </Box>,
      ...Object.entries(formData)
        .filter(([key]) => key !== 'remember' && key !== 'dr' && key !== 'nombre')
        .map(([key, value]) => {
          const formattedKey = key.split('_').map(capitalizeFirstLetter).join(' ');
          
          return (
            <Box key={key} mb={2} align="left">
              <Text as="span" fontWeight="bold">
                {formattedKey}:  
              </Text>
              <br></br>
              <Text as="span">• {value}</Text>
            </Box>
          );
        }),
    ];
  
    return previewItems;
  };
  
  // Función para copiar el texto al portapapeles
  export const copyToClipboard = (formData, formatText, toast) => {
    const textToCopy = formatText(formData);
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'Texto copiado.',
      description: "El texto ha sido copiado al portapapeles.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Función para validar el formulario
  export const validateForm = (formData, toast, formatText) => {
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
        })
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
    copyToClipboard(formData, formatText, toast);
    return true;
  };
  