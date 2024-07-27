
import { useState , useEffect} from "react";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Icon } from "leaflet";

import { ModalRestaurant } from "./ModalRestaurant";

export const Markers = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const dataMarkers = `https://decamino-back.onrender.com/api/restaurants`;
    axios
      .get(dataMarkers)
      .then((response) => {
        const dataRes = response.data;
        const filteredData = dataRes.filter(marker => marker.location && Array.isArray(marker.location) && marker.location.length === 2);
        setMarkers(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setMarkers]);

  // create custom icon
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",

    iconSize: [38, 38], // size of the icon
  });
  return (
    <>
       {markers.map((marker  , id) => (
        <> 
        
        <Marker  key={id} position={marker.location} icon={customIcon}>
          <Popup position={marker.location}>
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-semibold text-gray-800 py-1">
                {marker.title}
              </h2>
              <ModalRestaurant marker={marker}/>
            </div>
          </Popup>
        </Marker>
        </>
      ))}

    </>
  );
};
