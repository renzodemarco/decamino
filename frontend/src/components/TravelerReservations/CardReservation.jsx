import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Reservations-Merchant/slider.css";
import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";

import { MdCancel } from "react-icons/md";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} a las ${formattedTime}`;
};

const getStatusColor = (status) => {
  switch (status) {
    case "confirmada":
      return "bg-green-500";
    case "pendiente":
      return "bg-yellow-500";
    case "cancelada":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const ReservationsSliderTraveler = function ({
  reservationsData,
  cancelReservation
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
            spaceBetween: 8,
          },
        }}
        className="mySwiper "
      >
        {reservationsData.map((reserv) => (
          <SwiperSlide key={reserv.id} className="relative text-center">
            <CardReservation reservation={reserv} cancelReservation={cancelReservation}/>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export const CardReservation = ({ reservation, cancelReservation }) => {
  const navigate = useNavigate();
  const formattedDateTime = formatDateTime(reservation.date);
  const statusColor = getStatusColor(reservation.status);

  const handlePayClick = () => {
    navigate(`/Payment/${reservation.id}`);
  };

  return (
    <div className="bg-white px-2 py-1 md:p-4 rounded-lg shadow-lg max-w-sm overflow-hidden">
      <div className="flex justify-between">
        <h2 className="text-base md:text-lg font-bold mb-2 flex justify-center">
          {reservation.restaurant}
        </h2>

        <div
          className={`ml-auto ${
            reservation.status === "cancelada" && "hidden"
          }`}
        >
          <Button
            onClick={() => cancelReservation(reservation.id)}
            isIconOnly
            color="danger"
            aria-label="Eliminar"
            size="sm"
          >
            <MdCancel size={24} />
          </Button>
        </div>
      </div>

      <div className="flex mb-4">
        <div className="flex flex-col items-start">
          <p>
            Para <span>{reservation.numberOfPeople}</span> personas.
          </p>
          <p className="text-gray-700 flex items-center">
            Estado:
            <span
              className={`inline-block w-4 h-4 rounded-full ${statusColor} ml-2`}
            ></span>
            <span className="ml-2">
              {reservation.status.charAt(0).toUpperCase() +
                reservation.status.slice(1)}
            </span>
          </p>
          <p className="text-sm md:text-base font-semibold text-start">
            Reservado para el día: <span>{formattedDateTime}</span>
          </p>
        </div>
      </div>

      {reservation.status === "confirmada" && (
        <div className="flex justify-end mt-4">
          <Button color="primary" size="sm" onClick={handlePayClick}>
            Pagar
          </Button>
        </div>
      )}
    </div>
  );
};

CardReservation.propTypes = {
  reservation: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    numberOfPeople: PropTypes.number.isRequired,
    restaurant: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    restaurantId: PropTypes.string.isRequired
  }).isRequired,
  cancelReservation: PropTypes.func.isRequired,
};

ReservationsSliderTraveler.propTypes = {
  reservationsData: PropTypes.any.isRequired,
  cancelReservation: PropTypes.func.isRequired,
};
