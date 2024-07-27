import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axios_JSON_Send } from '../../services/peticiones_back';

const PaymentForm = () => {
    const { id } = useParams();
    const [price, setPrice] = useState('');
    const type = 'reservation';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { token } = useSelector((state) => state.authLogin);

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const paymentData = {
            id,
            price,
            type,
        };

        try {
            const response = await axios_JSON_Send({
                data: paymentData,
                method: 'post',
                url: '/api/payment/create-checkout-session',
                token: token,
            });

            console.log(response);

            if (response.url) {
                window.location.href = response.url;
            } else {
                setError('La respuesta de la API no contiene una URL válida.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un problema al procesar el pago. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Formulario de Pago</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        ID de la Reserva
                    </label>
                    <input
                        disabled
                        value={id}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="id"
                        type="text"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Precio
                    </label>
                    <input
                        value={price}
                        onChange={handlePriceChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Ingrese el precio"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Tipo
                    </label>
                    <input
                        disabled
                        value={type}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="type"
                        type="text"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Pagar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
