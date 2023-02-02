import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationRules } from "../../../../utils/Validation/validations";
import { SignupSchema } from "../../../../utils/Validation/validationShema";
import { UserContext } from "../../../../context/userContext";
import { useContext, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {fetchLogin} from "../../../../features/login/loginSlice"
import Loader from "../../../Loader/index.jsx"


const FormComponent = ()=>{
  const context = useContext(UserContext);
  const { loader } = useSelector((store)=>store.login)
  const dispatch = useDispatch();
  const [loginError, setLoginError]= useState(false)

  const handleLogin = (values)=>{
    setLoginError(false)
      dispatch(fetchLogin({...values}))
      .then((response) => context.saveAccessToken(response.payload.token))
      .catch(() => {setLoginError(true)});
    }
    
    return(<WraperStyled>
      { loader ? <Loader /> :(
        <>
        <h3>{loginError ? "Wrong login or password!": null}</h3>
        <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleLogin(values)}
      > 
      {({ errors }) => (
        <FormStyled>
          <LabelStyled>
              <FieldStyled
                  validate={validationRules.validateEmail}
                  type="email"
                  name="email"
                  placeholder={"email"}
                  className={errors.email ? "error" : null}
                />
          </LabelStyled>
          <ErrorMessage  name="email" />
          <br />
          <br />
          <LabelStyled>
              <FieldStyled
                  validate={validationRules.validatePassword}
                  type="password"
                  name="password"
                  placeholder={"password"}
                  className={errors.password ? "error" : null}
                />
          </LabelStyled>
          <ErrorMessage  name="password" />
          <br />
          <br />
          <button type="submit">Login</button>
        </FormStyled>
        )} 
      </Formik></>
        
      )}
        
    </WraperStyled>)
}
const WraperStyled = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  color: "red",
})
const FormStyled = styled(Form)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width:"80%",
  });
  const LabelStyled = styled.label({
    width: "100%",
    display: "flex",
    alignItems: "center",
  });
  
  const FieldStyled = styled(Field)`
    font-family: Arial;
    height: 50px;
    border: 2px solid lightgrey;
    border-radius: 5px;
    border-color: ${(props) =>
      props.className === "error" ? "red" : "lightgrey"};
    text-indent: 10px;
    width: 100%;
  `;
export default FormComponent