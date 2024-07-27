import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom"

export const Public_Routes = ({ children }) => {
  const stateUser = localStorage.getItem("auth") || false;
  
  if(!stateUser){
    return children
  }

  const json = JSON.parse(stateUser)

  if(!json.token){
    return children
  }

  const data_token = jwtDecode(json.token);

  if (data_token.username){
      return <Navigate to='/Profile' />
    }
    return children
}

Public_Routes.propTypes = {
  children: PropTypes.node, 
};