import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { setStartLocation } from "../store/route.slice";
import "leaflet/dist/leaflet.css";
import { MapComponent } from "./MapComponent";
import { LeafletRouting } from "./LeafletRuting";
import { Markers } from "./Markers";

import { LuMapPin } from "react-icons/lu";

import logo from "/logosinFondo.png";
import "leaflet-routing-machine";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";

export const RoutePlanner = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //Geolocalizacion:
  const dispatch = useDispatch();
  const { startLocation } = useSelector((state) => state.route);
  const [childWaypoints, setChildWaypoints] = useState([]);
  const [routeInfo, setRouteInfo] = useState({
    distance: 0,
    intermediatePoints: [],
    instructions: [],
  });
  console.log(routeInfo);

  const handleReceiveWaypoints = (receivedWaypoints) => {
    setChildWaypoints(receivedWaypoints);
  };

  const handleRouteFound = ({ distance, intermediatePoints, instructions }) => {
    setRouteInfo({ distance, intermediatePoints, instructions }); // Almacenamos las instrucciones también
  };

  //useEffect para ubicar al usuario en la geolocalizcion actual
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setStartLocation([latitude, longitude]));
        },

        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        },
        {
          enableHighAccuracy: true, // activa la ubicacion de gps mas precisa
        }
      );
    } else {
      console.error("Geolocalización no disponible");
    }
  }, [dispatch]);

  return (
    <>
      <MapContainer center={startLocation} zoom={13}>
        <LeafletRouting
          onReceiveWaypoints={handleReceiveWaypoints}
          onRouteFound={handleRouteFound}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapComponent center={startLocation} />
        <Markers />
      </MapContainer>
      {/* Renderiza los waypoints */}
      <section className="w-full h-16 bg-greenT flex justify-center px-8">
          <Button onClick={onOpen} isIconOnly className="text-greenT text-3xl rounded-full flex justify-center items-center w-14 h-14 border-2 border-greenT bg-white font-semibold mt-[-20px] z-[2000]">
            <LuMapPin/>
          </Button>
      </section>

      <Modal
          backdrop="opaque"
          size="2xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={true}
          placement="top"
          classNames={{
            wrapper: "z-[2000]",
            backdrop: "z-[2000] bg-gradient-to-br from-[#94B9FF]/45 to-[#CDFFD8]/45 backdrop-opacity-10",
            base: "z-[2000]",
            header: "flex justify-center bg-greenT",
            body:"gap-2 pb-[52px] relative",
            footer:"bg-woodLogo relative",
            closeButton:"bg-white/45"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <h2 className="text-xl text-white font-bold">Información de Ruta</h2>
                </ModalHeader>
                <ModalBody>
                  <div>                  
                    <div >
                      {/* Waypoints */}
                      {childWaypoints.map((wp, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-6">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-softWood text-white">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <p className="mb-2 text-medium font-semibold">{wp.name}</p>
                            <p className="text-gray-700">{wp.description}</p>
                          </div>
                        </div>
                      ))}
                      

                      {/* Información de Ruta */}
                      
                      <h2 className="mb-2">
                        <strong className="text-lg text-greenT font-semibold">Distancia Total:</strong> {routeInfo.distance} metros
                      </h2>
                      <h2 className="mb-2 text-lg text-greenT font-semibold">
                        Puntos Intermedios:
                      </h2>
                      <ul className="list-none pl-5">
                        {routeInfo.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-center space-x-2 mb-2">
                            <span className="flex items-center justify-center w-10 h-10 border rounded-full bg-softWood text-white">
                              {index + 1}.
                            </span>
                            <div>
                              <strong>{instruction.type}</strong>
                              <br />
                              {instruction.text}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </ModalBody>
                <ModalFooter>
                  <div className="absolute top-[-46px] w-full left-0">
                    <img className="w-[60px] h-[56px]" src={logo} alt="DeCamino" />
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  );
};
