import React from "react";
import { useLocation } from "react-router-dom";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginImage from "../../assets/imagini/loginForm.jpg";
import style from "./Onboarding.module.scss";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";

const Onboarding = () => {
  const location = useLocation().pathname;
  return (
    <div className={style.mainContainer}>
      {/* <div className={style.container}> */}
      <div className={style.leftSide}>
        <div className={style.contentContainer}>
          {/* <img
            src={AssistLogo}
            className={style.logoImageOnboarding}
            alt="Login Logo"
          /> */}

          {location === "/login" && <LoginForm />}
          {location === "/register" && <RegisterForm />}
          {location === "/forgot-password" && <ForgotPasswordForm />}
          {location === "/reset-password" && <ResetPasswordForm />}
        </div>
      </div>
      {/* End leftSide */}
      <img
        src={LoginImage}
        className={style.rightImageOnboarding}
        alt="Login"
      />
    </div>
  );
};

export default Onboarding;
