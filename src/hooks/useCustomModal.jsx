import { useState } from "react";

export default (initialState = false) => {
  const [showModal, setShowModal] = useState(initialState);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (e) => {
    setShowModal(false);
  };

  return { showModal, closeModal, openModal };
};
