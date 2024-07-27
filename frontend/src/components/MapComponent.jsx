import React, { useState } from "react";
import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";

import "leaflet-routing-machine";

export const MapComponent = ({ center }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};
