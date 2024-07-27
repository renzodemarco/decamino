import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../store/auth.slice';
import fondo_login from '../../assets/Img/Destinos_04.webp';
import { axios_JSON_Send } from '../../services/peticiones_back';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      //const response = await axios.post('https://decamino-back.onrender.com/api/user/login', { email, password });
      const response = await axios_JSON_Send({
        data: { email, password }, 
        method: "post", 
        url: `/api/user/login`, 
        token : ""
      })
      const { token } = response;

      // Decodifica el token
      const data_token = jwtDecode(token);

      //Guardando los datos del usuario en LocalStorage y estados globales
      dispatch(login({ token, user: data_token }));

      navigate('/home');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-no-repeat min-h-screen bg-[top_-8rem_right_-8rem] bg-auto xs:bg-cover xs:bg-center flex flex-row items-center justify-center" style={{ backgroundImage: `url(${fondo_login})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1200]/60 to-[#454545]/5"></div>
        <form className="w-full xs:max-w-md mx-auto rounded-t-3xl bg-white px-8 mt-[275px] xs:mt-0 pt-6 pb-8 mb-4 z-10" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Inicia sesión</h2>
          <p className="text-center mb-6 text-gray-600">Ingresa tus credenciales para comenzar</p>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Yourmail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <input id="robot-check" type="checkbox" className="mr-2 leading-tight" required />
            <label className="text-gray-700 text-sm font-bold" htmlFor="robot-check">No soy un robot</label>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </div>

          <p className="text-center mt-4">
            ¿Aún no tienes una cuenta? <a href="/register" className="text-teal-500 hover:text-teal-600">Regístrate</a>
          </p>
        </form>
    </div>
  );
};

export default LoginForm;
