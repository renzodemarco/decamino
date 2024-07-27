import { Button } from "@nextui-org/react";
import HeroBg from "../../assets/Img/IMG_Hero02.webp";
import { Planea_Tu_Ruta } from "./sections/Planea_Tu_Ruta";


export const HeroLandPage = () => {
  
  return (
    <>
      <main
        className="relative bg-cover bg-center h-[942px] pt-[120px] md:pt-[170px] flex flex-col justify-between"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom 15%",
        }}
      >
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1200]/80 to-[#454545]/5"></div>

        <section className="relative mx-5 md:mx-[194px] flex flex-col items-center md:items-start text-center md:text-left">
          <div className="">
            <h1 className="text-white font-nunito font-[700] text-[42px] md:text-[50px] lg:text-[64px]">
              Explora el turismo rural, descubre tu próxima aventura
            </h1>
          </div>

          <div >
            <p  className="font-nunito font-[500] text-[20px] text-white mt-20 md:mt-10 ">
              Sumérgete en una experiencia única explorando las joyas de los
              pueblos rurales. Planifica tus rutas gastronómicas, apoya a pequeños
              negocios y disfruta de auténticas tradiciones locales.
            </p>
          </div>

          <div className="w-full">
            <Button
              className="mt-[20rem] md:mt-10   font-nunito text-white font-[600] bg-greenT w-full  md:w-[209px] text-lg"
              radius="full"
            >
              Descubrir
            </Button>
          </div>
        </section>

        {/* Visible pantalla grande */}
        <section className="hidden md:block bg-black/75 w-full h-[254px]">
          <Planea_Tu_Ruta />
        </section>
      </main>

      {/* Visible pantalla chica */}
      <section className="block md:hidden bg-woodLogo w-full h-[618px]">
        <Planea_Tu_Ruta />
      </section>
    </>
  );
};