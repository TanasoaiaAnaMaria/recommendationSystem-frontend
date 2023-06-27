import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Switch from "../Switch/Switch";

import styles from "./PreferinteModal.module.scss";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const PreferinteModal = ({
  show,
  onHide,
  title,
  description,
  preferinteUserProfil,
  currentModal,
  onSwitchChange,
  // checkedEmail,
  // checkedSms,

  // onEmailChange,
  // onSmsChange,
}) => {
  // If there's no currentModal, return null or some fallback UI.
  if (!currentModal) return null;

  // Check if the currentModal key exists in preferinteUserProfil.
  if (!preferinteUserProfil.hasOwnProperty(currentModal)) {
    console.log(`Key ${currentModal} does not exist in preferinteUserProfil.`);
    return null;
  }

  const currentValues = preferinteUserProfil[currentModal];

  // Check if currentValues is undefined or null.
  if (!currentValues) {
    console.log(`currentValues is ${currentValues}.`);
    return null;
  }

  const entries = Object.values(currentValues);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.container}
    >
      <button className={styles.closeButton} onClick={onHide}>
        <CloseIcon />
      </button>
      <Modal.Body className={styles.modalBody}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>

        {/* email */}
        <div className={styles.actions}>
          {entries.map((entry, id) => (
            <div key={id}>
              {entry.label}
              <span>
                <Switch
                  name={entry.value}
                  checked={entry.checked === "1"}
                  onChange={(event) => {
                    onSwitchChange(
                      currentModal,
                      entry.value,
                      event.target.checked
                    );
                  }}

                  // checked={checkedSms}
                  // onChange={onSmsChange}
                />
              </span>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PreferinteModal;
