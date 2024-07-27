import { useEffect } from "react";
import { Input, DateInput, Button } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { setStartLocation, setEndLocation } from "../../store/route.slice";
import "leaflet/dist/leaflet.css";
import { MapComponent } from "../../components/Route/MapComponent.Route";

export const RoutePlanner = () => {
  const dispatch = useDispatch();
  const { startLocation, endLocation } = useSelector((state) => state.route);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setStartLocation([latitude, longitude]));
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("Geolocalización no disponible");
    }
  }, [dispatch]);

  return (
    <>
      <div className=" flex flex-col gap-4 ">
        <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 mr-6 ml-5 mt-16 gap-4 ">
          <Input
            variant={"bordered"}
            type="text"
            label="Primer Destino"
            labelPlacement={"outside"}
            placeholder="Ingrese su Destino"
          />

          <Input
            variant={"bordered"}
            type="text"
            label="Segundo Destino"
            labelPlacement={"outside"}
            placeholder="Ingrese su Destino"
          />

          <DateInput
            label="Día de Llegada"
            placeholderValue={new CalendarDate(1995, 11, 6)}
            variant={"bordered"}
            labelPlacement={"outside"}
          />

          <DateInput
            label="Día de Salida "
            placeholderValue={new CalendarDate(1995, 11, 6)}
            variant={"bordered"}
            labelPlacement={"outside"}
          />

          <Button className="" color="success">Buscar</Button>
        </div>
      </div>
      <MapContainer center={startLocation} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker center={startLocation} radius={10} />
        <CircleMarker center={endLocation} radius={10} />
        <MapComponent center={startLocation} />
      </MapContainer>
    </>
  );
};
