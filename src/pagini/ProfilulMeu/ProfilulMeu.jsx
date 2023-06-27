import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// icons
import { ReactComponent as ProfileIcon } from "../../assets/icons/person.svg";
import { ReactComponent as SecuritateIcon } from "../../assets/icons/security.svg";
import { MdOutlineTravelExplore } from "react-icons/md";
import { PiCastleTurretFill } from "react-icons/pi";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-circle.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

// tabs
import Profil from "./Profil/Profil";
import Securitate from "./Securitate/Securitate";
import Preferinte from "./Preferinte/Preferinte";
import Recomandari from "./Recomandari/Recomandari";

// styles
import styles from "./ProfilulMeu.module.scss";

// useauth
import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";

// import bootstrap spiiner
import { Spinner } from "react-bootstrap";
import { updateUser } from "../../api/API";

const ProfilulMeu = () => {
  const { setAlert } = useStateProvider();
  const { user, logout, fetchUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.split("/")[2];
  const tabSelector = () => {
    switch (currentTab) {
      case "profil":
        return <Profil />;
      case "securitate":
        return <Securitate />;
      case "preferinte":
        return <Preferinte />;
      case "recomandari":
        return <Recomandari />;
      default:
        break;
    }
  };

  // preview image
  const [preview, setPreview] = useState(null);

  // loading image
  const [loading, setLoading] = useState(false);

  // handle image update
  const handleAvatarChange = async () => {
    setLoading(true);
    try {
      const response = await updateUser(user?.id, {
        photo: preview && preview,
      });
      if (response.status === 200) {
        setAlert({
          type: "success",
          message: "Imaginea a fost schimbata cu succes!",
        });
        setPreview(null);
        setLoading(false);
        fetchUser();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Ups... probleme la server",
      });
    }
  };

  // handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setAlert({
      type: "success",
      message: "Acces in website ca vizitator",
    });
  };

  return user ? (
    <section className={styles.container}>
      {/* navigation section */}
      <div>
        {!preview ? (
          <div className={styles.profile}>
            <img
              src={user?.imagine}
              alt="Poza de profil"
              className={`${styles.avatar} text-white`}
            />
            {/* <label className={styles.editAvatar} htmlFor="image">
              <EditIcon />
            </label> */}
            {/* image input */}
            {/* <input
              className={styles.imageInput}
              type="file"
              name="image"
              id="image"
              accept="image/x-png"
              onChange={handleChange}
            /> */}
          </div>
        ) : (
          <div className={styles.profile}>
            {loading ? (
              <div className={styles.loading}>
                <Spinner animation="border" />
              </div>
            ) : (
              <img className={styles.avatar} src={preview} alt="profil" />
            )}
            <div className={styles.actions}>
              <button
                className={styles.apply}
                onClick={() => handleAvatarChange()}
              >
                <CheckIcon />
              </button>
              <button
                className={styles.delete}
                onClick={() => setPreview(null)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        )}
        <nav className={`${styles.navigation}`}>
          <button
            className={currentTab === "profil" ? styles.active : ""}
            onClick={() => navigate("/profilulMeu/profil")}
          >
            <ProfileIcon />
            <span>Profil</span>
          </button>
          <button
            className={currentTab === "securitate" ? styles.active : ""}
            onClick={() => navigate("/profilulMeu/securitate")}
          >
            <SecuritateIcon />
            <span>Login & securitate</span>
          </button>
          <button
            className={currentTab === "preferinte" ? styles.active : ""}
            onClick={() => navigate("/profilulMeu/preferinte")}
          >
            <MdOutlineTravelExplore size={"25px"} fill={"black"} />
            <span>Preferinte</span>
          </button>

          <button
            className={currentTab === "recomandari" ? styles.active : ""}
            onClick={() => navigate("/profilulMeu/recomandari")}
          >
            <PiCastleTurretFill size={"25px"} fill={"black"} />
            <span>Recomandări</span>
          </button>
          <button onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        </nav>
      </div>
      {/* main section */}
      <div className={styles.content}>{tabSelector()}</div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfilulMeu;
