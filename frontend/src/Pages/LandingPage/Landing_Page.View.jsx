import { Section_HeroLandPage } from "../../sections/LandingPage/Section_Hero.LanP";
import { Section_Actividades } from "../../sections/LandingPage/Section_Actividades.LanP";
import { Section_Promociones } from "../../sections/LandingPage/Section_Promociones.LanP";
import { Section_DestinosPopulares } from "../../sections/LandingPage/Section_DestinosPopulares.LanP";
import { Layout_Public } from "../../layouts/Layout_Public";


export const Landing_Page = () => {
  return (
    <>
      <Layout_Public>
        <Section_HeroLandPage/>
        <Section_Actividades />
        <Section_DestinosPopulares />
        <Section_Promociones />
      </Layout_Public>
    </>
  );
};