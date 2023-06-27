import React, { useState, useEffect } from "react";
import RowItem from "../RowItem/RowItem";

import styles from "./Preferinte.module.scss";
// import { updateNotification } from "../../../api/API";
import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";
import PreferinteModal from "../../../componente/Modal/PreferinteModal";
import { updateUser } from "../../../api/API";

const Notifications = () => {
  // show modal
  const [show, setShow] = useState(false);

  // user
  const { user, fetchUser } = useAuth();

  // state provider
  const { setAlert, preferinteUserProfil, setPreferinteUserProfil } = useStateProvider();

  // current modal
  const [currentModal, setCurrentModal] = useState("atractiiNaturale");
  let preferinte = "";

  const stringFromBackend = user?.preferinte;

  useEffect(() => {
    if (stringFromBackend) {
      const valuesToCheck = stringFromBackend.split(" ");

      setPreferinteUserProfil((prevState) => {
        const newState = { ...prevState };

        Object.keys(newState).forEach((category) => {
          Object.keys(newState[category]).forEach((key) => {
            if (valuesToCheck.includes(newState[category][key].value)) {
              newState[category][key].checked = "1";
            }
          });
        });
        return newState;
      });
    }
  }, []);

  // handle modal show
  const handleModalShow = (modal) => {
    setCurrentModal(modal);
    setShow(true);
  };

  // handle modal hide
  const handleModalHide = () => {
    // setCurrentModal(null);
    setShow(false);
  };

  // dynamic modal title
  const modalTitle = (modal) => {
    switch (modal) {
      case "atractiiNaturale":
        return "Atractii naturale";
      case "cultura":
        return "Cultura";
      case "gastronomie":
        return "Experiente alimentare si culinare";
      case "divertisment":
        return "Divertisment";
      default:
        break;
    }
  };

  // dynamic modal description
  const modalDescription = (modal) => {
    switch (modal) {
      case "atractiiNaturale":
        return "Descriere pt Atractii naturale | Atractii in aer liber";
      case "cultura":
        return "Descriere pt cultura";
      case "gastronomie":
        return "Descriere pt experiente culinare";
      case "divertisment":
        return "Descriere pt divertisment";
      default:
        break;
    }
  };

  function handleSwitchChange(modal, valueName, isChecked) {
    setPreferinteUserProfil((prevState) => {
      const newState = { ...prevState };
      newState[modal][valueName].checked = isChecked ? "1" : "0";
      return newState;
    });
  }

  useEffect(() => {
    Object.values(preferinteUserProfil).forEach((values) => {
      Object.values(values).forEach((val) => {
        if (val.checked === "1") {
          preferinte = preferinte + val.value + " ";
        }
      });
    });
    // const time = setTimeout(updatePersoana(), 1000);
    // clearTimeout(time);
    updatePersoana();
  }, [preferinteUserProfil]);


  const updatePersoana = async () => {
    try {
      const response = await updateUser(user, preferinte);
      if (response.status === 200) {
        fetchUser();
      }
    } catch (e) {
      console.log("Eroare updatePersoana");
    }
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      //   const response = await updateNotification(user?.id, notificationSettings);
      //   if (response.status === 200) {
      //     console.log("Success");
      //     setAlert({
      //       type: "success",
      //       message: "Notifications updated successfully",
      //     });
      //     fetchUser();
      //   }
      console.log("update notifications - submit");
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Something went wrong on server",
      });
    }
  };

  // const [skip, setSkip] = useState(true);

  // useEffect(() => {
  //   if (skip) setSkip(false);
  //   if (!skip) handleSubmit();
  // }, [notificationSettings]);

  return (
    <>
      <div>
        <h4 className={styles.title}>Preferinte</h4>
        <RowItem
          title="Atractii naturale"
          info={"Selecteaza preferinte"}
          action="Edit"
          onAction={() => handleModalShow("atractiiNaturale")}
        />
        <RowItem
          title="Cultura"
          info={"Selecteaza preferinte"}
          action="Edit"
          onAction={() => handleModalShow("cultura")}
        />
        <RowItem
          title="Experiente alimentare si culinare"
          info={"Selecteaza preferinte"}
          action="Edit"
          onAction={() => handleModalShow("gastronomie")}
        />
        <RowItem
          title="Divertisment"
          info={"Selecteaza preferinte"}
          action="Edit"
          onAction={() => handleModalShow("divertisment")}
        />
      </div>
      <PreferinteModal
        title={modalTitle(currentModal)}
        description={modalDescription(currentModal)}
        show={show}
        onHide={handleModalHide}
        currentModal={currentModal}
        preferinteUserProfil={preferinteUserProfil}
        onSwitchChange={handleSwitchChange}
      />
    </>
  );
};

export default Notifications;
