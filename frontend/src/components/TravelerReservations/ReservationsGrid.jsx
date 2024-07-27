import { ReservationsSliderTraveler } from "./CardReservation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axios_JSON_Send } from "../../services/peticiones_back";
import { Loader } from "../UI/Loader";
import Swal from "sweetalert2";



export const ReservationsGrid = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [actives, setActives] = useState([])
  const [finished, setFinished] = useState([])
  const [cancelled, setCancelled] = useState([])
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.authLogin);

  const fetchReservationData = async () => {
      setLoading(true);
    try {
      const response = await axios_JSON_Send({
        method: "get",
        url: `/api/reservations`,
        token: token,
      });
      
    /*
    const sortedReservations = response.sort((a, b) => {
      const order = { aceptada: 1, pendiente: 2, cancelada: 3 };

      const stateComparison = order[a.status] - order[b.status];
      if (stateComparison !== 0) {
        return stateComparison;
      }

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    */
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
    Swal.fire({
      title: '¿Estás seguro de cancelar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios_JSON_Send({
            method: "put",
            url: `/api/reservations/${id}/cancel`,
            token: token,
          });
          fetchReservationData();
          Swal.fire(
            '¡Cancelado!',
            'Tu reserva ha sido cancelada.',
            'success'
          );
        } catch (error) {
          console.log(error, "no se pudo cancelar la reserva");
        }
      }
    });
  };


  useEffect(() => {
    
    fetchReservationData();
  }, []);

  

  if (reservationsData.length === 0 && loading === false) {
    return (
      <div className="flex justify-center items-center h-[240px] bg-[#fff] rounded-3xl">
        <h1 className="text-2xl">No ha hecho reservas todavía</h1>
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
      <ReservationsSliderTraveler reservationsData={actives} cancelReservation={cancelReservation}/>
      <h3 className="text-xl text-center bg-greenT py-1 text-white font-semibold">
        Terminadas
      </h3>
      <ReservationsSliderTraveler reservationsData={finished} cancelReservation={cancelReservation}   />
      <h3 className="text-xl text-center bg-greenT py-1 text-white font-semibold">
        Canceladas
      </h3>
      <ReservationsSliderTraveler reservationsData={cancelled} cancelReservation={cancelReservation}   />
      <div className="h-[36px] bg-greenT rounded-b-3xl"></div>
    </div>
  );
};
