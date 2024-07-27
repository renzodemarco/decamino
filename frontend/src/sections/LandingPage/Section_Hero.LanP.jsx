import { Button } from "@nextui-org/react";
import HeroBg from "../../assets/Img/IMG_Hero02.webp";
import { Planea_Tu_Ruta } from "../../components/LandingPage/Planea_Tu_Ruta.LanP";

export const Section_HeroLandPage = () => {
  return (
    <>
      <main
        className="relative bg-cover bg-center min-h-screen pt-[48px] md:pt-[64px] flex flex-col justify-between"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom 15%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1200]/80 to-[#454545]/5"></div>

        <section className="relative px-2 xl:px-32 lg:px-24 md:px-16 sm:px-8 xs:px-6 2xs:px-3 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            <h1 className="text-white font-nunito font-[600] text-[42px] xs:text-[42px] sm:text-[48px] md:text-[50px] lg:text-[64px]">
              Explora el turismo rural, descubre tu próxima aventura
            </h1>
            <p className="font-nunito font-[400] text-[16px] sm:text-[20px] md:text-[16px] lg:text-[20px] text-gray-300 mt-5 md:mt-2 w-full sm:w-2/3  md:w-2/3">
              Sumérgete en una experiencia única explorando las joyas de los
              pueblos rurales. Planifica tus rutas gastronómicas, apoya a
              pequeños negocios y disfruta de auténticas tradiciones locales.
            </p>
          </div>

          <div className="w-full mt-10 md:mt-10">
            
            <Button
              className="font-nunito text-white font-[600] bg-greenT w-[209px] text-lg"
              radius="full"
            >
              Descubrir
            </Button>
          </div>
        </section>

        {/* Visible pantalla grande */}
        <section className="hidden md:block bg-black/75 w-full h-auto px-2 
        xl:px-32 lg:px-24 md:px-16 sm:px-8 xs:px-6 2xs:px-3">
          <Planea_Tu_Ruta />
        </section>
      </main>

      {/* Visible pantalla chica */}
      <section className="block md:hidden bg-woodLogo w-full h-[618px] px-3 py-5">
        <Planea_Tu_Ruta />
      </section>
    </>
  );
};
