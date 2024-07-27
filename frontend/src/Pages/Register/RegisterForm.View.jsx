import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import fondo_register from '../../assets/Img/bg-login.webp';
import {RadioGroup, Radio} from "@nextui-org/react";
import { PrivacyPolicy } from '../../components/UI/Modal_PrivacyPolicy';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    notRobot: false,
    role: '',
  });

  const [acceptedPolicy, setAcceptedPolicy] = useState(false)

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!acceptedPolicy){
      Swal.fire({
        title: 'Politicas de Privacidad',
        text: 'Debe aceptar los terminos y condiciones',
        icon: 'info',
      });
      return;
    }

    if(!formData.role){
      Swal.fire({
        title: 'Role no valido',
        text: 'Por favor, seleccione un rol',
        icon: 'info',
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico válido.',
        icon: 'error',
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      Swal.fire({
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial.',
        icon: 'error',
      });
      return;
    }

    setLoading(true);

// eslint-disable-next-line no-unused-vars
    const { notRobot, ...submitData } = formData;

    try {
      const response = await axios.post('https://decamino-back.onrender.com/api/user/register', submitData);
      console.log(response.data);

      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Serás redirigido a la página principal.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          navigate('/home');
        }
      });
    } catch (err) {
      console.log(err.response)
      if (err.response.data.message) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al registrarse. Por favor, verifica los datos e intenta nuevamente.',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-[center_-8rem] bg-cover xs:bg-center flex flex-row items-center justify-center" style={{ backgroundImage: `url(${fondo_register})`}}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1200]/60 to-[#454545]/5"></div>
        <form className="w-full xs:max-w-md mx-auto rounded-t-3xl mt-[275px] xs:mt-8 p-6 bg-white z-10" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-4">Regístrate</h2>
          <p className="text-center text-gray-600 mb-6">Crea tu cuenta para empezar el viaje</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nombre de Usuario"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Yourmail@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4 ">
            <RadioGroup
              label="Selecciona tu rol"
              orientation="horizontal"
              name='role'
              id='role'
              value={formData.role}
              onChange={handleChange}
              required
              classNames={{
                label: "text-sm font-medium text-gray-700"
              }}
            >
              <Radio value="traveler"
                color='success'
              >Viajero</Radio>
              <Radio value="merchant"
                color='success'
              >Comercio</Radio>
            </RadioGroup>
          </div>
          <div className="pb-2 flex items-center">
            <input
              type="checkbox"
              name="notRobot"
              id="notRobot"
              checked={formData.notRobot}
              onChange={handleChange}
              className="h-4 w-4 text-freshMint border-gray-300 rounded hover:cursor-pointer hover:text-freshMint hover:ring-freshMint"
              required
              color='#50EDC2'
            />
            <label htmlFor="notRobot" className="ml-2 block text-sm text-gray-900">No soy un robot</label>
          </div>
          <div className="mb-6 flex items-center text-sm gap-1">
            <p>Para registrarse acepta estos</p>
            <PrivacyPolicy acceptedPolicy={setAcceptedPolicy}>
              <b className='underline text-greenT hover:cursor-pointer'>terminos y condiciones</b>
            </PrivacyPolicy>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrarme'}
          </button>
          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta? <a href="/login" className="text-teal-500 hover:text-teal-700">Inicia sesión</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
