import axios from "axios";
import { Link } from "react-router-dom";
import { Estrellas } from "./UI/Estrellas";
import { useState, useEffect } from "react";

export const RestaurantDetail = () => {
  const [restaurante, setRestaurante] = useState([]);
  useEffect(() => {
    const dataRestaurant = `https://decamino-back.onrender.com/api/restaurants`;
    axios
      .get(dataRestaurant)
      .then((response) => {
        const dataRes = response.data;
        setRestaurante(dataRes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setRestaurante]);

  return (
    <>
      {restaurante.map((resto, id) => {
        return (
          <div key={id}>
            <div className="flex max-w-sm w-full bg-white shadow-md  mx-auto">
              <div></div>

              <div
                className="w-full rounded-xl relative shadow-lg hover:shadow-2xl movie-item text-black movie-card"
                data-movie-id="438631"
              >
                <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-white via-gray-900 to-transparent"></div>
                <div
                  className="relative cursor-pointer group z-10 px-10space-y-6 movie_info"
                  data-lity=""
                >
                  <div className="poster__info align-self-end w-full">
                    <div className="h-40"></div>
                    <h3 className="text-2xl font-semibold  text-white text-center pb-12">
                      {resto.title}
                    </h3>
                    <div className="space-y-6  bg-white rounded-t-xl p-5">
                      <div className="flex flex-col space-y-2 inner">
                        <div className="mb-0 text-lg text-gray-900 font-semibold ">
                          About {resto.title}
                        </div>
                        <p className="text-xs text-black mb-5">
                          {resto.description}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between datos">
                        <div className="flex flex-col datos_col">
                          <div className="popularity"></div>
                          <div className="text-sm text-gray-400">
                            <Estrellas />
                          </div>
                        </div>
                        <div className="flex flex-col datos_col">
                          <div className="release"></div>
                        </div>
                        <div className="flex flex-col datos_col">
                          <div className="release"></div>
                          <div className="text-sm text-gray-400">
                            <Link to="/">Ver reviews</Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col overview">
                        <div className="flex flex-col"></div>
                        <div className="text-lg text-gray-900 font-semibold mt-2.5 mb-5">
                          Menu
                        </div>

                        <div className="text-lg text-gray-900 font-semibold mt-2.5 flex items-center justify-between ">
                          Asado libre con bebida
                        </div>
                        <p className="text-xs text-black mb-5">
                          Desde $10 por persona
                        </p>
                        <div className="text-lg text-gray-900 font-semibold mt-2.5 flex items-center justify-between ">
                          Empanadas
                        </div>
                        <p className="text-xs text-black mb-5">
                          Desde $10 la docena
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="absolute inset-0 transform w-full -translate-y-4"
                  src={resto.photos[0]}
                />
                <div className="bg-white flex flex-row relative pb-10 space-x-4 z-10 ">
                  <Link
                    className="flex items-center py-2 px-28 rounded-lg mx-auto h-full text-white bg-greenT hover:bg-freshMint"
                    to="#"
                    target="_blank"
                    data-unsp-sanitized="clean"
                  >
                    <div className="text-sm text-white ml-2">
                      Añadir a mi ruta
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
