
import  { useState } from 'react';
import { inputClass, selectClass } from './js/classes';
import { Alert, Button } from '@rewind-ui/core';


export const Formulario = () => {
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
  const [formValidated, setFormValidated] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);

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

    let formattedText = '';

    // Agregar "Dr" o "Dra" al inicio del nombre si corresponde
    const title = formData.dr === 'Dr.' ? 'Dr' : 'Dra';
    formattedText += `*Formato de Presentación*\n_${title}. ${formData.nombre}_\n`;

    // Resto del formato para otros campos
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'remember' || key === 'dr' || key === 'nombre') {
        continue;
      }

      // Reemplaza los guiones bajos con espacios y capitaliza la primera letra de cada palabra
      const formattedKey = key.split('_').map(capitalizeFirstLetter).join(' ');

      formattedText += `*${formattedKey}:* \n • ${value}\n`;
    }
    return formattedText;
  };

  const handleValidateForm = () => {
    // Verificar si todos los campos obligatorios están llenos
    const allFieldsFilled = Object.values(formData).every(val => val !== '');
    setFormValidated(allFieldsFilled);
    setShowIncompleteAlert(!allFieldsFilled); // Mostrar alerta si el formulario no está completo
  };

  const handleCopy = () => {
    const textToCopy = formatText();
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
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
    });
    setFormValidated(false);
    setShowIncompleteAlert(false);
    setCopySuccess(false);
    document.getElementById("dr").selectedIndex = 0;
  document.getElementById("cedula").selectedIndex = 0;
  document.getElementById("titulo").selectedIndex = 0;

  // Limpia los valores de los inputs
  document.getElementById("nombre").value = "";
  document.getElementById("colonia_de_residencia").value = "";
  document.getElementById("experiencia").value = "";
  document.getElementById("material_que_requiero").value = "";
  document.getElementById("material_que_llevo").value = "";
  document.getElementById("procedimientos_que_no_realizo").value = "";
  document.getElementById("comentarios_adicionales").value = "";
  };

return (
  <div className="flex justify-center items-center h-auto mt-10 ">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full md:max-w-md">
      <div className=" items-end justify-end flex ">
        <a  href="/" ><Button variant="danger">X</Button></a>
    </div>  
    <form className=" space-y-6">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="dr" className="block text-sm font-medium mb-2">Dr(a).</label>
            <select id="dr" name="dr" className={selectClass} required onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              <option value="Dr.">Dr.</option>
              <option value="Dra.">Dra.</option>
            </select>
        </div>
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input type= "text"id= "nombre" name= "nombre" className={inputClass} placeholder="Nombre y Apellido" onChange={handleChange}  required />
          </div>
          <div>
            <label htmlFor="colonia_de_residencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colonia de Residencia</label>
            <input type= "text" id= "colonia_de_residencia" name= "colonia_de_residencia" className={inputClass} placeholder="Colonia Americana" onChange={handleChange}  required />
          </div>
          <div>
          <label htmlFor="cedula" className="block text-sm font-medium mb-2">Tipo de Cedula</label>
            <select id="cedula" name="cedula" className={selectClass} required onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              <option value="Federal">Federal</option>
              <option value="Provicional">Provicional</option>
              <option value="Estatal">Estatal</option>
            </select>
        </div>
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium mb-2">¿Cuentas con titulo?</label>
            <select id="titulo" name="titulo" className={selectClass} required onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
        </div>
        
        <div>
            <label htmlFor="experiencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experiencia</label>
            <textarea type= "text"id= "experiencia" name= "experiencia" className={inputClass} placeholder="Experiencia laboral" onChange={handleChange}  required />
          </div>
          <div>
            <label htmlFor="material_que_requiero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material que requiero</label>
            <textarea type= "text" id= "material_que_requiero" name= "material_que_requiero" className={inputClass} placeholder="Requiero..." onChange={handleChange}  required />
          </div>
          <div>
            <label htmlFor="material_que_llevo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material que llevo</label>
            <textarea type= "text"id= "material_que_llevo" name= "material_que_llevo" className={inputClass} placeholder="Mi material es..." onChange={handleChange}  required />
          </div>
          <div>
            <label htmlFor="procedimientos_que_no_realizo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Procedimientos que no realizo</label>
            <textarea type= "text"id= "procedimientos_que_no_realizo" name= "procedimientos_que_no_realizo" className={inputClass} placeholder="No indico vitaminas..." onChange={handleChange}  required />
          </div>
          <div>
            <label htmlFor="comentarios_adicionales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comentarios Adicionales</label>
            <textarea type= "text"id= "comentarios_adicionales" name= "comentarios_adicionales" className={inputClass} placeholder="Otros..." onChange={handleChange}  required />
          </div>
      </div>
      <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="10"
            readOnly value={formatText()} ></textarea>
       <div className='text-center items-center'>
            <button
            type="button"
            onClick={handleValidateForm}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Validar Formulario
          </button>
          {formValidated && (
            <button
              type="button"
              onClick={handleCopy}
              className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Copiar
            </button>
            )}
            {showIncompleteAlert && (
              <Alert variant="danger" title="Error!">Uno o más campos están incompletos</Alert>
            )}
            {formValidated && copySuccess && (
              <Alert variant="success" title="Copiado!">Texto copiado exitosamente</Alert>
            )}
            <div className="w-full">
            <button
              type="button"
              onClick={handleResetForm}
              className="focus:outline-none w-full  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Reiniciar
            </button>
            </div>
        </div>
    </form>
 
  </div>
</div>
  )
}
