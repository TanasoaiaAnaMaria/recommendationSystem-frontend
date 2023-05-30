import React, { useState, useEffect } from "react";
import Button from "../../../componente/Button/Button";
import Input from "../../../componente/Input/Input";
import RowItem from "../RowItem/RowItem";
import styles from "./Profil.module.scss";

import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";

import { updateUser } from "../../../api/API";

import moment from "moment";
import Select from "../../../componente/Select/Select";

const Profile = () => {
  // global states
  const { user, fetchUser, setUser } = useAuth();

  // state provider
  const { setAlert } = useStateProvider();

  // refetch trigger
  const [refetch, setRefetch] = useState(false);

  // active form
  const [activeForm, setActiveForm] = useState("");

  // state for full name
  const [fullName, setFullName] = useState({
    nume: user?.nume,
    prenume: user?.prenume,
  });

  // set full name on user change
  useEffect(() => {
    setFullName({
      nume: user?.nume,
      prenume: user?.prenume,
    });
  }, [user]);

  // form data
  const [formValue, setFormValue] = useState({
    id: user?.id,
    nume: user?.nume,
    prenume: user?.prenume,
    email: user?.email,
    parola: user?.parola,
    imagine: user?.imagine,
  });

  // refetch user data
  useEffect(() => {
    if (refetch) {
      fetchUser();
      setRefetch(false);
    }
  }, [fetchUser, refetch]);

  // set user details to formvalue on user or full name change
  useEffect(() => {
    if (user) {
      setFormValue({
        ...formValue,
        nume: fullName?.nume,
        prenume: fullName?.prenume,
      });
    }
  }, [user, fullName]);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  // handleCancel
  const handleCancel = () => {
    setActiveForm("");

    // form inital value
    setFormValue({
      nume: user?.nume, // fullName?
      prenume: user?.prenume, // fullName?
      parola: user?.parola,
    });

    setFullName({
      nume: user?.nume,
      prenume: user?.prenume,
    });
  };

  // isFormValid
  const checkErrors = (field) => {
    // // name
    // if (field === "fullName") {
    //   if (fullName?.nume?.length > 2 && fullName?.prenume?.length > 2) {
    //     return true;
    //   }
    // }

    // nume
    if (field === "nume") {
      if (fullName?.nume?.length < 2) {
        return "Numele este obligatoriu de introdus!";
      }
    }
    // lastName
    if (field === "prenume") {
      if (fullName?.prenume?.length < 2) {
        return "Prenumele este obligatoriu de introdus!";
      }
    }
    // email
    // if (field === "email") {
    //   const regex =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   if (regex.test(formValue[field])) {
    //     return "Emailul este obligatoriu de introdus!";
    //   }
    // }

    return "";
  };

  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  // show error message
  const [showErrors, setShowErrors] = useState(false);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFormValid()) {
      setShowErrors(true);
      setAlert({ type: "danger", message: "Câmpurile trebuie completate!" });
    }
    // check if form is valid
    if (isFormValid()) {
      // set error state
      setShowErrors(false);
      try {
        const response = await updateUser(formValue);
        if (response.status === 200) {
          setAlert({
            type: "success",
            message: "Profile updated successfully",
          });
          setRefetch(true);
          setUser(response.data);
          setActiveForm("");
        }
      } catch (error) {
        console.log(error, "error");
        setAlert({
          type: "danger",
          message: "Something went wrong on the server",
        });
      }
    } else {
      setShowErrors(true);
    }
  };

  return (
    <div>
      <h4 className={styles.title}>Profile</h4>
      {/* full name */}
      <RowItem
        title="Utilizator"
        info={
          fullName.nume && fullName.prenume
            ? fullName?.nume + " " + fullName?.prenume
            : user?.nume + " " + user?.prenume
        }
        action="Edit"
        active={activeForm === "name" ? true : false}
        onCancel={handleCancel}
        onAction={() => {
          setActiveForm("name");
        }}
      />
      {activeForm === "name" && (
        <div className={styles.form}>
          {/* firstName */}
          <Input
            type="text"
            name="nume"
            id="nume"
            label="Nume"
            value={fullName?.nume}
            onChange={(e) => {
              setFullName({ ...fullName, nume: e.target.value });
            }}
            error={showErrors && checkErrors("nume") ? true : false}
            helper={showErrors ? checkErrors("nume") : ""}
          />

          {/* lastName */}
          <Input
            type="text"
            name="prenume"
            id="prenume"
            label="Prenume"
            value={fullName?.prenume}
            onChange={(e) => {
              setFullName({ ...fullName, prenume: e.target.value });
            }}
            error={showErrors && checkErrors("prenume") ? true : false}
            helper={showErrors ? checkErrors("prenume") : ""}
          />
          <Button onClick={(e) => handleSubmit(e)} label="Save" />
        </div>
      )}

      {/* email */}
      <RowItem
        active={activeForm === "email" ? true : false}
        onAction={() => setActiveForm("email")}
        onCancel={handleCancel}
        title="Email address"
        info={user?.email}
        // action="Edit"
      />
      {/* {activeForm === "email" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={formValue.email}
            name="email"
            id="email"
            type="text"
            label="Email"
            error={showErrors && !checkErrors("email")? true : false}
            helper={
              showErrors && !checkErrors("email") ? "Email must be valid" : ""
            }
          />
          <Button onClick={(e) => handleSubmit(e, "email")} label="Save" />
        </div> 
      )}*/}
    </div>
  );
};

export default Profile;
