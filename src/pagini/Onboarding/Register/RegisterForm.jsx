import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import style from "../Authenticate.module.scss";
import Input from "../../../componente/Input/Input";
import Button from "../../../componente/Button/Button";

import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as View } from "../../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../../assets/icons/view-off.svg";

import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { register } from "../../../api/API";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {width} = useWindowDimensions();
  const { setAlert } = useStateProvider();
  const [passwordShown, setPasswordShown] = useState(true);
  const [formValue, setFormValue] = useState({
    nume: "",
    prenume: "",
    email: "",
    parola: "",
  });

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  const checkErrors = (field) => {
    // nume
    if (field === "nume") {
      if (formValue.nume.length < 3 && formValue.nume.length > 0) {
        return "Numele trebuie sa aiba cel putin 3 caractere!";
      } else if (formValue.nume.length > 50) {
        return "Numele trebuie sa fie de cel mult 50 de caractere!";
      } else if (formValue.nume.length === 0) {
        return "Numele este obligatoriu";
      }
    }
    //prenume
    if (field === "prenume") {
      if (formValue.prenume.length < 3 && formValue.prenume.length > 0) {
        return "Prenumele trebuie sa aiba cel putin 3 caractere!";
      } else if (formValue.prenume.length > 50) {
        return "Prenumele trebuie sa fie de cel mult 50 de caractere!";
      } else if (formValue.prenume.length === 0) {
        return "Prenumele este obligatoriu";
      }
    }

    //email
    if (field === "email") {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (formValue.email.length === 0)
        return "Adresa de email este obligatorie!";
      else if (reg.test(formValue.email) === false)
        return "Adresa de email este invalida!";
    }

    if (field === "parola") {
      if (formValue.parola.length < 7)
        return "Parola trebuie sa fie de cel putin 7 caractere!";
    }

    return "";
  };

  // check if form is valid
  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  // handle register
  const handleRegister = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
            const response = await register(formValue);
            if (response.status === 200) {
              navigate("/login");
              setAlert({
                type: "success",
                message: "Contul a fost creat cu succes!",
              });
        } 
      } catch (error) {
        console.log(error, "error");
        setAlert({
          type: "danger",
          message: "Ceva nu a mers bine...",
        });
      }
    }
  };

  return (
    <div className={style.containerAuth}>
      <div className={style.contentContainerForm}>
        <div className={style.form}>
          <div className={style.formTitle}>
            <h4 className={style.title}>Creaza cont</h4>
          </div>

          <div className={style.formInput}>
            <Button
              variant="secondary"
              icon={<Google />}
              position="left"
              label={width > 500 ?  "Inregistrare cu Google"  : "Google"}
            />
            <div className={style.registerSeparator}>
              <hr />
              <span> SAU </span>
              <hr />
            </div>
            
            <Input
              type="text"
              placeholder={"Nume"}
              required
              label="Nume"
              id="nume"
              name="nume"
              value={formValue.nume}
              onChange={handleChange}
              error={showErrors && checkErrors("nume") ? true : false}
              helper={showErrors ? checkErrors("nume") : ""}
            />
            
            <Input
              type="text"
              placeholder={"Prenume"}
              required
              label="Prenume"
              id="prenume"
              name="prenume"
              value={formValue.prenume}
              onChange={handleChange}
              error={showErrors && checkErrors("prenume") ? true : false}
              helper={showErrors ? checkErrors("prenume") : ""}
            />
            
            <Input
              type="email"
              placeholder={"Email"}
              required
              label="Email"
              id="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              error={showErrors && checkErrors("email") ? true : false}
              helper={showErrors ? checkErrors("email") : ""}
            />
            
            <Input
              type={passwordShown ? "password" : "text"}
              placeholder={"Parola"}
              required
              label="Parola"  
              id="parola"
              name="parola"
              value={formValue.parola}
              onChange={handleChange}
              error={showErrors && checkErrors("parola") ? true : false}
              helper={showErrors ? checkErrors("parola") : ""}
              icon={passwordShown ? <View /> : <ViewOff />}
              onIconClick={passToggleHandler}
            />

            <span className={style.textpwdInfo}>Cel putin 7 caractere.</span>
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={`${style.contentContainerButtons} ${style.register}`}>
          <Button
            id="register"
            variant="primary"
            label="Sign up"
            onClick={handleRegister}
          />
        </div>
        <div
          className={`${style.contentContainerAuthEndForm} ${style.authRegister}`}
        >
          <div className={style.textAuthEndForm}>
            Already have an account?{" "}
            <span
              className={style.textAuthEndForm}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
