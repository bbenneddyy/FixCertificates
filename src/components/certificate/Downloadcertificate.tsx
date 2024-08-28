import React from "react";
import {useState } from 'react'
import Modal from "./modal";
import Certificate from "./certificate";

export default function Downloadcertificate({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) {
    const [isOpenModal, setIsOpenModal] = useState(false)
  const handleDownloadCertificate = () =>{
    alert("downloaded certificate")
    if (name && lastname) {
        alert('going well')
        setIsOpenModal(true)
      } else {
        alert('huh?')
      }
  };

return (
  <>
    <button
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      onClick={() => handleDownloadCertificate()}
    >
      ${name} ${lastname}
    </button>
    <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
        <Certificate name={name} lastname={lastname} />
    </Modal>
  </>
);
}