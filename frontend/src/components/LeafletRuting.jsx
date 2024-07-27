import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

export const LeafletRouting = ({ onReceiveWaypoints, onRouteFound }) => {
  const map = useMap();
  const controlRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]);
  const [intermediatePoints, setIntermediatePoints] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const routingControl = new L.Routing.Control({
      waypoints: [L.latLng(-34.6047, -58.3995), L.latLng(-34.6036, -58.3985)],
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 1,
            weight: 5,
          },
        ],
      },
      routeWhileDragging: true,
      show: true,
      addWaypoints: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: true,
      geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    controlRef.current = routingControl;

    // Acceso a la información de las rutas
    const waypointsFromControl = routingControl.getWaypoints();

    setWaypoints(waypointsFromControl); // Actualiza el estado con los waypoints obtenidos
    onReceiveWaypoints(waypointsFromControl);

    routingControl.on("routesfound", function (e) {
      const distance = e.routes[0].summary.totalDistance;

      setTotalDistance(distance); // Actualiza el estado con la distancia total

      const points = e.routes[0].coordinates.map((coord) => ({
        lat: coord.lat,
        lng: coord.lng,
      }));
      setIntermediatePoints(points); // Actualiza el estado con los puntos intermedios

      const instructions = e.routes[0].instructions;

      // Llamamos a onRouteFound pasando las instrucciones
      onRouteFound({ distance, intermediatePoints, instructions });
    });

    return () => {
      if (controlRef.current) {
        controlRef.current._map.removeControl(controlRef.current);
      }
    };
  }, []);

  return null;
};
