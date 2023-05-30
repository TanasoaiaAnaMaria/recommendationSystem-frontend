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
  const { setAlert } = useStateProvider();

  // current modal
  const [currentModal, setCurrentModal] = useState("atractiiNaturale");
  let preferinte = "";

  const [formValue, setFormValue] = useState({
    atractiiNaturale: {
      park: {
        label: "Parcuri",
        value: "park",
        checked: "0",
      },
      garden: {
        label: "Gradini",
        value: "garden",
        checked: "0",
      },
      campground: {
        label: "Camping",
        value: "campground",
        checked: "0",
      },
      zoo: {
        label: "Zoo",
        value: "zoo",
        checked: "0",
      },
    },
    cultura: {
      library: {
        label: "Librarii",
        value: "library",
        checked: "0",
      },
      university: {
        label: "Universitati",
        value: "university",
        checked: "0",
      },
      theater: {
        label: "Teatre",
        value: "theater",
        checked: "0",
      },
      museum: {
        label: "Muzee",
        value: "museum",
        checked: "0",
      },
      art_galery: {
        label: "Galerii de arta",
        value: "art_galery",
        checked: "0",
      },
      church: {
        label: "Biserici",
        value: "church",
        checked: "0",
      },
    },

    gastronomie: {
      bakery: {
        label: "Brutarii / Patiserii",
        value: "bakery",
        checked: "0",
      }, // nu bakery?
      restaurants: {
        label: "Restaurante",
        value: "restaurants",
        checked: "0",
      },
    },

    divertisment: {
      amusement_park: {
        label: "Parcuri de distractie",
        value: "amusement_park",
        checked: "0",
      },
      bar: {
        label: "Pub / Bar",
        value: "bar",
        checked: "0",
      },
      casino: {
        label: "Casino",
        value: "casino",
        checked: "0",
      },
      movie: {
        label: "Cinema",
        value: "movie",
        checked: "0",
      },
    },
  });

  const stringFromBackend = user?.preferinte;

  useEffect(() => {
    if (stringFromBackend) {
      const valuesToCheck = stringFromBackend.split(" ");

      setFormValue((prevState) => {
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
    setFormValue((prevState) => {
      const newState = { ...prevState };
      newState[modal][valueName].checked = isChecked ? "1" : "0";
      return newState;
    });
  }

  useEffect(() => {
    Object.values(formValue).forEach((values) => {
      Object.values(values).forEach((val) => {
        if (val.checked === "1") {
          preferinte = preferinte + val.value + " ";
        }
      });
    });
    // const time = setTimeout(updatePersoana(), 1000);
    // clearTimeout(time);
    updatePersoana();
  }, [formValue]);


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
        <h4 className={styles.title}>Notifications</h4>
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
        formValue={formValue}
        onSwitchChange={handleSwitchChange}
      />
    </>
  );
};

export default Notifications;
