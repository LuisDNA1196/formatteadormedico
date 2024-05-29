// src/FormularioPresent.jsx

import  { useState } from 'react';
import {
  FormLabel,
  Input,
  Container,
  Select,
  Textarea,
  Button,
  useToast,
  Text,
  
} from '@chakra-ui/react';
import { RepeatIcon, CopyIcon } from '@chakra-ui/icons';
import ReglaLink from './ReglaLink';
import ButtonWitha from './ButtonWitha';
import WhatsBox from './WhatsBox';
import { initialFormDataPresent } from '../assets/formDatas';
import {
  
  formatText,
  formatPreviewText,
  
  validateForm,
} from '../hooks/formatTextP.jsx';

export const FormularioPresent = () => {
  const [formData, setFormData] = useState(initialFormDataPresent);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = () => {
    validateForm(formData, toast, formatText);
  };

  const handleReset = () => {
    setFormData(initialFormDataPresent);
    toast({
      title: 'Formulario reiniciado',
      description: 'Todos los campos han sido reiniciados.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Container className="m-10 text-center">
        <Container className="items-end justify-end flex">
          <ButtonWitha name="Regresar" colorScheme="red" href="/" />
        </Container>
        <Text className="mb-8" fontSize="2xl">
          Formato Presentación
        </Text>
        <FormLabel htmlFor="dr">Dr(a).</FormLabel>
        <Select
          className="mb-2"
          variant="filled"
          size="lg"
          name="dr"
          id="dr"
          onChange={handleChange}
          placeholder="Selecciona una opción"
          value={formData.dr}
        >
          <option value="Dra.">Dra.</option>
          <option value="Dr.">Dr.</option>
        </Select>

        <FormLabel htmlFor="nombre">Nombre y Apellido</FormLabel>
        <Input
          className="mb-2"
          size="lg"
          name="nombre"
          id="nombre"
          placeholder="Juan Perez"
          onChange={handleChange}
          value={formData.nombre}
        />

        <FormLabel htmlFor="colonia_de_residencia">Colonia de Residencia</FormLabel>
        <Input
          className="mb-2"
          size="lg"
          name="colonia_de_residencia"
          id="colonia_de_residencia"
          placeholder="Americana"
          onChange={handleChange}
          value={formData.colonia_de_residencia}
        />

        <FormLabel htmlFor="cedula">Tipo de Cédula</FormLabel>
        <Select
          className="mb-2"
          variant="filled"
          size="lg"
          name="cedula"
          id="cedula"
          onChange={handleChange}
          placeholder="Selecciona una opción"
          value={formData.cedula}
        >
          <option value="Federal">Federal</option>
          <option value="Provicional">Provicional</option>
          <option value="Estatal">Estatal</option>
        </Select>

        <FormLabel htmlFor="titulo">¿Cuentas con Título?</FormLabel>
        <Select
          className="mb-2"
          variant="filled"
          size="lg"
          name="titulo"
          id="titulo"
          onChange={handleChange}
          placeholder="Selecciona una opción"
          value={formData.titulo}
        >
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </Select>

        <FormLabel htmlFor="experiencia">Experiencia</FormLabel>
        <Textarea
          className="mb-2"
          name="experiencia"
          onChange={handleChange}
          id="experiencia"
          placeholder="Experiencia Laboral..."
          value={formData.experiencia}
        />

        <FormLabel htmlFor="material_que_requiero">Material que requiero</FormLabel>
        <Textarea
          className="mb-2"
          name="material_que_requiero"
          onChange={handleChange}
          id="material_que_requiero"
          placeholder="Material Requerido..."
          value={formData.material_que_requiero}
        />

        <FormLabel htmlFor="material_que_llevo">Material que llevo</FormLabel>
        <Textarea
          className="mb-2"
          name="material_que_llevo"
          onChange={handleChange}
          id="material_que_llevo"
          placeholder="Material que tengo..."
          value={formData.material_que_llevo}
        />

        <FormLabel htmlFor="procedimientos_que_no_realizo">Procedimientos que no realizo</FormLabel>
        <Textarea
          className="mb-2"
          name="procedimientos_que_no_realizo"
          onChange={handleChange}
          id="procedimientos_que_no_realizo"
          placeholder="No receto vitaminas..."
          value={formData.procedimientos_que_no_realizo}
        />

        <FormLabel htmlFor="comentarios_adicionales">Comentarios Adicionales</FormLabel>
        <Textarea
          className="mb-2"
          name="comentarios_adicionales"
          onChange={handleChange}
          id="comentarios_adicionales"
          placeholder="Comentarios extras..."
          value={formData.comentarios_adicionales}
        />

        <WhatsBox contenidotxt={formatPreviewText(formData)} title="Formato Presentación" />

        <Container className="text-center mt-4">
          <div className="flex justify-evenly gap-4 sm:text-xs">
            <Button onClick={handleSubmit} colorScheme="green" rightIcon={<CopyIcon />}>
              Copiar
            </Button>
            <Button onClick={handleReset} colorScheme="orange" rightIcon={<RepeatIcon />}>
              Reiniciar
            </Button>
          </div>
          <div className="mt-4">
            <ReglaLink />
          </div>
        </Container>
      </Container>
    </>
  );
};
