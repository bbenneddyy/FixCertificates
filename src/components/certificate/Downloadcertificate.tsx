import React from "react";

export default function Downloadcertificate({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) {
  const handleDownloadCertificate = () =>{
    console.log("downloaded certificate");
    alert("downloaded certificate")
  };

return (
  <>
    <button
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      onClick={() => handleDownloadCertificate()}
    >
      ${name} ${lastname}
    </button>
  </>
);
}