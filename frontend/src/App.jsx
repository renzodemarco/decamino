import { Chip } from "@nextui-org/react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout_Public } from "./layouts/Layout_Public";
import { Public_Routes } from "./Routes/Public_Routes";
import { Private_Routes } from "./Routes/Private_Routes";

import { Landing_Page } from "./Pages/LandingPage/Landing_Page.View";
import { RestaurantDetail } from "./components/RestaurantDetail";

import LoginForm from "./Pages/Login/LoginForm.View";
import RegisterForm from "./Pages/Register/RegisterForm.View";

import PaymentForm from "./Pages/Payment/PaymentForm.View"; 

import { Layout_Private } from "./layouts/Layout_Private";
import { Profile } from "./Pages/Profile/Profile.View";
import { AboutUs } from "./Pages/AboutUsPage/AboutUs_Page.View";
import { RoutePlanner } from "./components/RoutePlanner";





function App() {
  return (
    <>
      <Routes>
        <Route path="Home" element={
          <Public_Routes>
            <Landing_Page />
          </Public_Routes>
        } />

        <Route path="/Nosotros" element={
          <Layout_Public>
            <AboutUs />
          </Layout_Public>
        }/>

        <Route path="Profile" element={
          <Private_Routes>
            <Layout_Private>
              <Profile />
            </Layout_Private>
          </Private_Routes>
        } />

        <Route path="Payment/:id" element={
          <Private_Routes>
            <Layout_Private>
              <PaymentForm />
            </Layout_Private>
          </Private_Routes>
        } />

        <Route path="Filter" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-white font-bold" color="secondary" variant="shadow">FILTRO</Chip>
          </main>
        } />

         <Route path="Details" element={<RestaurantDetail />}></Route> 
        <Route path="Details" element={<RestaurantDetail />} />

        <Route path="Routes" element={
          <Private_Routes>
            <Layout_Private>
              <RoutePlanner/>
            </Layout_Private>
          </Private_Routes>
          
        }>

        </Route>

        <Route path="History" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-white font-bold" color="primary" variant="shadow">HISTORIAL</Chip>
          </main>
        } />

        <Route path="Settings" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-black font-bold" color="default" variant="shadow">Configuraciones</Chip>
          </main>
        } />

        <Route path="Analytics" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-white font-bold" color="danger" variant="shadow">Analiticas</Chip>
          </main>
        } />

        <Route path="Menu" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-white font-bold" color="warning" variant="shadow">MENU</Chip>
          </main>
        } />

        <Route path="Login" element={
          <Public_Routes>
            <Layout_Public>
              <LoginForm />
            </Layout_Public>
          </Public_Routes>
        } />

        <Route path="Register" element={
          <Public_Routes>
            <Layout_Public>
              <RegisterForm />
            </Layout_Public>
          </Public_Routes>
        } />

        <Route path="Reservations" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-white font-bold" color="secondary" variant="shadow">RESERVACIONES</Chip>
          </main>
        } />

        <Route path="Reviews" element={
          <main className="w-full h-screen bg-gray-800 flex justify-center items-center">
            <Chip className="text-white font-bold" color="danger" variant="shadow">RESEÑAS</Chip>
          </main>
        } />

        <Route path='/*' element={<Navigate to="/Home" />} />
      </Routes>
    </>
  );
}

export default App;