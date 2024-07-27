import { FaKitchenSet } from "react-icons/fa6";
import { GiMountainRoad } from "react-icons/gi";
import { MdFestival, MdFoodBank } from "react-icons/md";

export const Section_Actividades = () => {
  return (
    <main className=" bg-gray100 md:bg-softWood w-full px-2 xl:px-32 lg:px-24 md:px-16 sm:px-8 xs:px-6 2xs:px-3">
      <section className="py-8 ">
        <h4 className="text-freshMint md:text-white text-md  text-md ">DESCUBRIR</h4>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">Actividades en el camino</h1>
          <p className="text-[#073D37] pt-2 pb-8 font-nunito">
            Explora y disfruta de talleres culinarios, rutas de senderismo,
            festivales locales y mercados artesanales. Participa en catas de
            productos frescos y sumérgete en la cultura rural, creando recuerdos
            auténticos y duraderos.
          </p>
        </div>
        <div className="w-full p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex flex-col items-center p-4  ">
              <FaKitchenSet size={70} className="mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-woodLogo md:text-white">
                Cocina rural
              </h3>
              <p className="text-center text-[#073D37]">
                Prueba platos tradicionales preparados por cocineros locales al
                aire libre
              </p>
            </div>

            <div className="flex flex-col items-center p-4  ">
              <GiMountainRoad size={70} className="mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-woodLogo md:text-white">
                Trekking
              </h3>
              <p className="text-center text-[#073D37]">
                Explora pueblos y paisajes con las rutas guiadas y come algo al
                paso
              </p>
            </div>

            <div className="flex flex-col items-center p-4  ">
              <MdFestival size={70} className="mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-woodLogo md:text-white">
                Festivales locales
              </h3>
              <p className="text-center text-[#073D37]">
                Disfruta de la cultura y tradiciones culinarias en los vibrantes
                festivales de cada pueblo
              </p>
            </div>

            <div className="flex flex-col items-center p-4  ">
              <MdFoodBank size={70} className="mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-woodLogo md:text-white">
                Gastronomía artesanal
              </h3>
              <p className="text-center text-[#073D37]">
                Visita restaurantes locales y descubre productos frescos y
                artesanales únicos
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
