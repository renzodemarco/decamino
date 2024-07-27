import { Link, useNavigate } from "react-router-dom";
import logo from "/logosinFondo.png";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@nextui-org/react";
import { logout } from "../../../store/auth.slice";


export const Sidebar_Traveler = ({closeMenu}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const active = useSelector((state)=> state.navbars.navbar_public.active)
  const user_profile = useSelector((state) => state.authLogin.user)

  const menuItems = [
    {
        name: "Inicio",
        href: "/Main",
        isActive: (active == "/Home")
    },
    {
        name: "Perfil",
        href: "/Profile",
        isActive: (active == "/Profile")
    },
    {
        name: "Nueva ruta",
        href: "/Routes",
        isActive: (active == "/Route")
    },
    {
        name: "Restaurantes",
        href: "/Filter",
        isActive: (active == "/Filter")
    },
    {
        name: "Notificaciones",
        href: "#",
        isActive: false
    },
    {
      name:"Configuraciones",
      href:"#",
      isActive: false
    },
  ];

  return (
    <div className="flex flex-col justify-between bg-white rounded-b-2xl">
      <div className="px-2 pt-2">
        <div className="pt-1 pb-3 ml-5 flex gap-3 items-center">
          <Avatar
            disableAnimation={false}
            isBordered
            className="transition-transform ring-freshMint"
            name={user_profile.username}
            size="md"
            src={user_profile.profileImg}
          />
          <p className="font-bold">{user_profile.username}</p>
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name} className={`flex items-center p-2 text-base font-bold ${ item.isActive ? "text-greenT" : "text-gray-900"} border-t-1 border-woodLogo`}>
              <span className="ml-3">
                <Link
                  to={item.href}
                  onClick={()=> closeMenu(false)}
                >
                  {item.name}
                </Link>
              </span>
            </li>
          ))}
          <li className="flex items-center p-3 text-base font-bold text-white border-t-1 border-woodLogo">
            <span className="py-1 px-3 text-black hover:text-white hover:bg-red-600/75 hover:cursor-pointer rounded-full"
              onClick={()=>{dispatch(logout()); navigate("/Home")}}
            >
              Cerrar sesión
            </span>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 rounded-b-2xl mt-4">
          <div className="flex justify-end w-full pt-2 pr-2 h-8 bg-woodLogo rounded-b-2xl">
            <img className="w-[60px] h-[56px] mt-[-54px]" src={logo} alt="DeCamino" />
          </div>
      </div>
    </div>
  );
};

Sidebar_Traveler.propTypes = {
  closeMenu: PropTypes.any
};