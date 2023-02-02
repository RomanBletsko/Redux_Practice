import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { useGoogleLogin } from "@react-oauth/google";
import FormComponent from "./Form";
import "./styles.css";
import styled from "styled-components";




const Login = () => {
  const context = useContext(UserContext);
 
  const logInUseGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      context.saveAccessToken(tokenResponse.access_token);
    },
  });
 
  
  return (
    <div className="auth">
      
      {context.isLoggedIn ? (
        <MasedgeStyled>Login is succeeded</MasedgeStyled>
      ) : (
        
        <FormComponent />
      )}
      
      <h2>Token is:</h2>
      <hr />
      <span>{context.token || "Not assigned"}</span>
      <hr />
      {context.token ? (
        <button onClick={() => context.logOut()}>Logout</button>
      ) : (
        <button onClick={() => logInUseGoogle()}>
          Sign in with Google 🚀
        </button>
      )}
    </div>
  );
};

const MasedgeStyled = styled.h3({
  color: "green",
})



export default Login;
