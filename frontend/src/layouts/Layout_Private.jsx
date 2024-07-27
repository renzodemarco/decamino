import PropTypes from 'prop-types';
import { Footer } from '../components/UI/Footer';
import { Navbar_Traveler } from '../components/UI/Navbars/Navbar_Traveler';
import { useSelector } from 'react-redux';
import { Navbar_Merchant } from '../components/UI/Navbars/Navbar_Merchant';


export const Layout_Private = ({ children }) => {

    const user_profile = useSelector((state) => state.authLogin.user)


    return (
        <div className="font-nunito">
            {/* Encabezado */}
            {(user_profile.role == "traveler") && (
                <Navbar_Traveler/>
            )}

            {(user_profile.role == "merchant") && (
                <Navbar_Merchant/>
            )}
    
            {/* Contenido principal */}
            {children}
            
    
            {/* Pie de página */}
            <Footer/>
        </div>
    );
};

Layout_Private.propTypes = {
    children: PropTypes.node.isRequired,
};
