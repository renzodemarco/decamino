import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BG_MERCHANT from "../../assets/Img/profile_merchant.webp";
import BG_TRAVELER from "../../assets/Img/profile_traveler.webp";
import { useSelector } from "react-redux";
import { Edit_profile } from "../../components/Profile/Edit_profile.Prof";
import { Img_Profile } from "../../components/Profile/Img_Profile.Prof";
import { ReservationsGrid } from "../../components/TravelerReservations/ReservationsGrid";

export const Section_Tabs_Traveler_Mobil = () => {
  const user_profile = useSelector((state) => state.authLogin.user);

  return (
    <>
      <div
        className="block sm:hidden w-full h-[280px] bg-cover mb-[-74px]"
        style={{
          backgroundImage: `url(${
            user_profile.role == "traveler" ? BG_TRAVELER : BG_MERCHANT
          })`,
        }}
      ></div>
      <section className="block sm:hidden xs:px-6 2xs:px-3 px-2 w-[100%] min-h-screen border-x-2 border-t-2 border-woodLogo/45 bg-gray100 z-10 rounded-t-3xl">
        <Img_Profile />
        <Tabs
          radius="full"
          aria-label="Componente Tabs"
          classNames={{
            base: "flex w-full justify-center font-semibold",
            tabList: "bg-greenT",
          }}
        >
          <Tab key="Profile" title="Mis Datos">
            <Card>
              <Edit_profile />
            </Card>
          </Tab>
          <Tab key="Routes" title="Mis Rutas">
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab
            className="hidden xs:block"
            key="Reservaciones"
            title="Reservaciones"
          >
            <ReservationsGrid />
          </Tab>
          <Tab className="hidden xs:block" key="Favorites" title="Favoritos">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        <Tabs
          radius="full"
          aria-label="Componente Tabs"
          classNames={{
            base: "block xs:hidden flex flex-wrap w-full justify-center font-semibold",
            panel: "block xs:hidden",
            tabList: "bg-greenT",
          }}
        >
          <Tab key="Reservaciones" title="Reservaciones">
            <ReservationsGrid />
          </Tab>
          <Tab key="Favorites" title="Favoritos">
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </section>
    </>
  );
};
