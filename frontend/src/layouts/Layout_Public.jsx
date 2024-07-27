import PropTypes from 'prop-types';
import { Footer } from '../components/UI/Footer';
import { Navbar_Public } from '../components/UI/Navbars/Navbar_Public';


export const Layout_Public = ({ children }) => {
    return (
      <div className="font-nunito">
        {/* Encabezado */}
        <Navbar_Public/>
  
        {/* Contenido principal */}
        {children}
        
  
        {/* Pie de página */}
        <Footer/>
      </div>
    );

    
};

  Layout_Public.propTypes = {
    children: PropTypes.node.isRequired,
  };
