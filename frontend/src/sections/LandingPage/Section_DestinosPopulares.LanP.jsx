import { SliderDestinosPopulares } from "../../components/LandingPage/SliderDestinosPopulares.LanP"

export const Section_DestinosPopulares = () => {
    return (
      <main className="bg-white w-full px-2 xl:px-32 lg:px-24 md:px-16 sm:px-8 xs:px-6 2xs:px-3">
          <section className="py-8 ">
              <h4 className="text-freshMint text-md">INSPIRACIÓN</h4>
              <h1 className="text-2xl font-bold">Destinos populares</h1>
              <p className="text-[#073D37] pt-2 pb-8">
              Descubre los lugares más encantadores y ricos en tradición gastronómica. 
              Desde pueblos pintorescos en el interior hasta localidades costeras con experiencias inolvidables. 
              Planifica tu ruta a estos destinos populares y sumérgete en la cultura y sabores locales.
              </p>
              
          </section>
          
          <div className="pb-16">
              <SliderDestinosPopulares />
          </div>
          
      </main>
  
    )
  }
  