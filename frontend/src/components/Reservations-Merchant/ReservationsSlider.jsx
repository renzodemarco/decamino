import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import { Button } from "@nextui-org/react";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} a las ${formattedTime}`;
};

export const ReservationsSlider = function ({
  reservationsData,
  confirmReservation = null,
  cancelReservation = null,
}) {
  return (
    <div className="swiper-container ">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
          type: undefined,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 4,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 4,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
        }}
        className="mySwiper "
        loop={true}
      >
        {reservationsData.map((reserv) => (
          <SwiperSlide key={reserv.id} className="relative text-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg p-2 ">
              <div className="px-6 py-4">
                <div className="font-bold  mb-2 text-sm md:text-base">
                  {formatDateTime(reserv.date)}
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  Personas: {reserv.numberOfPeople}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex flex-col justify-end space-x-2">
                {reserv.status === "pendiente" &&
                  new Date(reserv.date) >= new Date() && (
                    <div className="w-full flex justify-around">
                      {cancelReservation && (
                        <Button
                          size="sm"
                          onClick={() => cancelReservation(reserv._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
                        >
                          Cancelar
                        </Button>
                      )}
                      {confirmReservation && (
                        <Button
                          size="sm"
                          onClick={() => confirmReservation(reserv._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
                        >
                          Aceptar
                        </Button>
                      )}
                    </div>
                  )}

                {reserv.status === "confirmada" ? (
                  <p className="text-green-500 font-bold">Aceptada</p>
                ) : reserv.status === "cancelada" ? (
                  <p className="text-red-500 font-bold">Cancelada</p>
                ) : null}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

ReservationsSlider.propTypes = {
  reservationsData: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      numberOfPeople: PropTypes.number.isRequired,
      restaurant: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  confirmReservation: PropTypes.func,
  cancelReservation: PropTypes.func,
};
