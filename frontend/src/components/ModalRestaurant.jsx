import {
    Modal,
    ModalContent,
    useDisclosure,
    Button
} from "@nextui-org/react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import { Estrellas } from "./UI/Estrellas";
import { ModalReservations } from "./ModalReservations";

export const ModalRestaurant = ({marker}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
        <Button size="sm" className="bg-greenT text-white" onClick={onOpen}>
            Ver Restaurante
        </Button>

        <Modal
            backdrop="opaque"
            size="sm"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={true}
            placement="top"
            classNames={{
              wrapper: "z-[2000]",
              backdrop: "z-[2000] bg-gradient-to-br from-[#94B9FF]/45 to-[#CDFFD8]/45 backdrop-opacity-10",
              base: "bg-gray-200",
              body:"",
              closeButton:"z-[200] bg-white/75"
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <div>
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
                              {marker.title}
                            </h3>
                            <div className="space-y-6  bg-white rounded-t-xl p-5">
                              <div className="flex flex-col space-y-2 inner">
                                <div className="mb-0 text-lg text-gray-900 font-semibold ">
                                  About {marker.title}
                                </div>
                                <p className="text-xs text-black mb-5">
                                  {marker.description}
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
                          src={marker.photos[0]}
                        />
                        <div className="bg-white flex flex-row justify-center items-center relative pb-10 space-x-4 z-10 ">
                            <ModalReservations restaurant={marker}>
                                    Hacer una reservacion
                            </ModalReservations>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </ModalContent>
          </Modal>
    </>
  )

}

ModalRestaurant.propTypes = {
    marker: PropTypes.any
};