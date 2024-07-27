import logo from "/logosinFondo.png";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import {PrivacyPolicy} from "./Modal_PrivacyPolicy"

export const Footer = () => {
  return (
    <footer className="bg-softWood text-gray-900/70 py-8 px-8 md:px-20 flex flex-col justify-between min-h-[200px] z-[100]">
  <div className="flex flex-col sm:flex-row justify-between w-full">
    <div className="hidden sm:block font-bold text-2xl">
      <div className="flex items-center">
        <img className="w-[60px] h-[56px]" src={logo} alt="DeCamino" />
        <h2>DeCamino</h2>
      </div>
    </div>
    <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0 sm:ml-auto font-semibold">
      <a href="/Nosotros" className="text-base font-nunito hover:underline hover:text-greenT/90" style={{transition:"0.5s"}}>Sobre Nosotros</a>
      <a href="#contact" className="text-base font-nunito hover:underline hover:text-greenT/90" style={{transition:"0.5s"}}>Contacto</a>
      <PrivacyPolicy lessBottoms={true} acceptedPolicy={()=>{}}>
        <a  className="text-base font-nunito hover:underline hover:text-greenT/90 hover:cursor-pointer" style={{transition:"0.5s"}}>Políticas de privacidad</a>
      </PrivacyPolicy>
    </div>
  </div>
  <div className="flex flex-col w-1/2 md-w-full mt-4">
    <div  className="flex items-center justify-start gap-2 px-4 sm:py-2">
      <img className="sm:hidden w-[60px] h-[56px]" src={logo} alt="DeCamino" />

      <a href="/">
        <span className="text-3xl hover:text-greenT/90 hover:cursor-pointer" style={{transition:"0.5s"}}>
          <FaFacebook/>
        </span>
      </a>

      <a href="/">
        <span className="text-3xl hover:text-greenT/90 hover:cursor-pointer" style={{transition:"0.5s"}}>
          <FaInstagram/>
        </span>
      </a>

      <a href="/">
        <span className="text-3xl hover:text-greenT/90 hover:cursor-pointer" style={{transition:"0.5s"}}>
          <FaXTwitter/>
        </span>
      </a>

    </div>
    
  </div>
  <hr className="border-t border-gray-900/70" />
    <div className="text-sm font-nunito text-center mt-2">
      © 2024 DeCamino - Todos los derechos reservados.
    </div>
</footer>

  
  );
};
