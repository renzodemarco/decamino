import { useEffect, useState } from "react";
import { ReservationsSlider } from "./ReservationsSlider";
import { axios_JSON_Send } from "../../services/peticiones_back";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Loader } from "../UI/Loader";




export const ReservationsMerchants = () => {
  const [reservationsData, setReservationsData] = useState([]);

  const [actives, setActives] = useState([])
  const [finished, setFinished] = useState([])
  const [cancelled, setCancelled] = useState([])

  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.authLogin);

  const fetchReservationData = async () => {
    
    try {

      setLoading(true);

      const response = await axios_JSON_Send({
        method: "get",
        url: `/api/reservations/restaurant`,
        token: token,
      });
      setReservationsData(response);
      
      const today = new Date();

      const actives = response.filter((reserv) => {
        const reservationDate = new Date(reserv.date);
        return (reserv.status === "confirmada" || reserv.status === "pendiente") && reservationDate >= today;
      });

      const finished = response.filter((reserv) => {
        const reservationDate = new Date(reserv.date);
        return reservationDate < today;
      });

      const cancelled = response.filter((reserv) => {
        const reservationDate = new Date(reserv.date);
        return reserv.status === "cancelada" && reservationDate >= today;
      });

      setActives(actives);
      setCancelled(cancelled);
      setFinished(finished);
      
      setLoading(false);
      
    } catch (error) {
      console.error("Error al obtener los datos de reserva", error);
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    const result = await Swal.fire({
      title: '¿Cancelar esta reserva?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No, mantener'
    });
  
    if (result.isConfirmed) {
      try {
        await axios_JSON_Send({
          method: 'put',
          url: `/api/reservations/${id}`,
          token: token,
          data: { status: "cancelada" }
        });
        Swal.fire(
          'Cancelada!',
          'La reserva ha sido cancelada.',
          'success'
        );
        fetchReservationData();
      } catch (error) {
        console.log(error, "No se pudo cancelar la reserva");
        Swal.fire(
          'Error!',
          'No se pudo cancelar la reserva.',
          'error'
        );
      }
    }
  };

  const confirmReservation = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirmar reserva?',
      text: "¡Esta acción confirmará la reserva!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7ACAB4',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar!',
      cancelButtonText: 'No, cancelar'
    });
  
    if (result.isConfirmed) {
      try {
        await axios_JSON_Send({
          data: { status: "confirmada" },
          method: "put",
          url: `/api/reservations/${id}`,
          token: token,
        });
        Swal.fire(
          'Confirmada!',
          'La reserva ha sido confirmada.',
          'success'
        );
        fetchReservationData();
      } catch (error) {
        console.log(error, "No se pudo confirmar la reserva");
        Swal.fire(
          'Error!',
          'No se pudo confirmar la reserva.',
          'error'
        );
      }
    }
  };
  
  useEffect(() => {
    fetchReservationData();
  }, []);

  

  if (reservationsData.length === 0 && loading === false) {
    return (
      <div className="flex justify-center items-center h-[240px] bg-[#fff] rounded-3xl">
        <h1 className="text-2xl">No hay reservas realizadas</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[240px] bg-[#fff] rounded-3xl">
        <Loader hidden={false} classNames={"size-[5rem] before:size-[2.5rem]"}/>
      </div>
    );
  }

  return (
    <div  className=" flex flex-col justify-center bg-[#fff] rounded-3xl">
      <h3 className="text-xl text-center bg-greenT py-1 text-white font-semibold rounded-t-3xl">Activas</h3>
      <ReservationsSlider reservationsData={actives} confirmReservation={confirmReservation} cancelReservation={cancelReservation} />
      <h3 className="text-xl text-center bg-greenT py-1 text-white font-semibold">
        Terminadas
      </h3>
      <ReservationsSlider reservationsData={finished}  />
      <h3 className="text-xl text-center bg-greenT py-1 text-white font-semibold">
        Canceladas
      </h3>
      <ReservationsSlider reservationsData={cancelled}  />
      <div className="h-[36px] bg-greenT rounded-b-3xl"></div>
    </div>
  );
};
