import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom"

export const Private_Routes = ({ children }) => {
    const stateUser = localStorage.getItem("auth") || false;

    if(!stateUser){
        return <Navigate to='/Home' />
    }

    const json = JSON.parse(stateUser)

    if(!json.token){
        return <Navigate to='/Home' />
    }

    const data_token = jwtDecode(json.token);

    if (data_token.username){
        return children
    }
    return <Navigate to='/Home' />
}

Private_Routes.propTypes = {
    children: PropTypes.node,
};