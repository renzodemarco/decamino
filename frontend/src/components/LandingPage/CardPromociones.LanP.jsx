import PropTypes from 'prop-types';
import { Card, CardFooter } from "@nextui-org/react";
import IMG_Promociones_01 from "../../assets/Img/Promociones_01.webp";
import IMG_Promociones_02 from "../../assets/Img/Promociones_02.webp";
import IMG_Promociones_03 from "../../assets/Img/Promociones_03.webp";
import IMG_Promociones_04 from "../../assets/Img/Promociones_04.webp";
import IMG_Promociones_05 from "../../assets/Img/Promociones_05.webp";

export const CardPromociones = ({img}) => {

  const listImages = [IMG_Promociones_01, IMG_Promociones_02, IMG_Promociones_03, IMG_Promociones_04, IMG_Promociones_05]

  return (
    <Card
      radius="lg"
      className=" h-[240px] md:h-[245px] w-full  overflow-hidden"
    >
      <div className="relative w-full h-full">
        <img
          alt="Promocion 05"
          src={listImages[img]}
          className="w-full h-full object-cover"
        />
      </div>
      <CardFooter className="justify-between bg-black/55 border-black/70 border-1 overflow-hidden absolute bottom-0 w-full shadow-small z-10">
        <div>
          <h4 className="text-freshMint text-md font-nunito">Lorem ipsum</h4>
          <div className="flex items-center ">
            <p className="text-lg font-bold text-white">$4500</p>
            <p className="text-freshMint text-md mx-2 font-nunito">Precio por persona</p>
          </div>
        </div>
       
      </CardFooter>
    </Card>
  );
};


CardPromociones.propTypes = {
  img: PropTypes.number.isRequired
};
