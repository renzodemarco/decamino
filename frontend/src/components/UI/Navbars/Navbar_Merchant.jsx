import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    DropdownTrigger,
    Avatar,
} from "@nextui-org/react";
import logo from "/logosinFondo.png";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../../store/navbar.slice";
import { Sidebar_Merchant } from "./SideBar_Merchant";
import { logout } from "../../../store/auth.slice";

export const Navbar_Merchant = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const active = useSelector((state)=> state.navbars.navbar_public.active)
    const user_profile = useSelector((state) => state.authLogin.user)
    const location = useLocation()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    if(!(active == location.pathname)){
      dispatch(setActive(location.pathname))
    }

    const menuItems = [
      {
        name: "Inicio",
        href: "/Home",
        isActive: (active == "/Home")
      },
      {
        name: "Perfil",
        href: "/Profile",
        isActive: (active == "/Profile")
      }
    ];
    
    const DropDownItems = [

        {
            name: "Notificaciones"
        },
        {
            name:"Configuraciones"
        },
    ]
  
    return (
      <Navbar
        position="static"
        className="w-full bg-[#0a1200]/90 text-white z-[9000]"
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        classNames={{
          item: [
            "flex",
            "relative",
            "pb-1",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-freshMint",
            "data-[active=true]:text-greenT",
            "data-[active=false]:text-white"
          ],
          menu:"bg-transparent scrollbar-hide py-0 px-2"
        }}
  
      >
        <NavbarContent className="flex justify-between items-center">
          <NavbarBrand>
            <img className="w-[60px] h-[56px]" src={logo} alt="DeCamino" />
            <p className="font-bold font-nunito text-2xl md:text-3xl">DeCamino</p>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden ml-auto"
          />
        </NavbarContent>

        <NavbarContent justify="end" className="hidden md:flex">
          {menuItems.map((item) => (
            <NavbarItem className="px-1" key={item.name} isActive={item.isActive}>
              <Link color="foreground" to={item.href}>
                  <p className="font-nunito hover:text-greenT">{item.name}</p>
              </Link>
            </NavbarItem>
          ))}
          <Dropdown placement="bottom-end" classNames={{
            content: "bg-[#0a1200]/90"
          }}>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform ring-freshMint"
                name={user_profile.username}
                size="md"
                src={user_profile.profileImg}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="text-white"
            >
              {DropDownItems.map((item) => (
              <DropdownItem className="px-1" key={item.name} textValue={item.name}>
                <Link color="foreground">
                    <p className="font-nunito hover:text-greenT">{item.name}</p>
                </Link>
              </DropdownItem>
              ))}
              <DropdownItem key="logout" color="danger" textValue="Log Out"
                onClick={()=>{dispatch(logout()); navigate("/Home")}}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
  
        {/* MENU HAMBURGUESA */}
        <NavbarMenu>
            <Sidebar_Merchant closeMenu={setIsMenuOpen} />
        </NavbarMenu>
        
      </Navbar>
    );
  };
  