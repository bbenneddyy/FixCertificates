import React, { useState, useRef } from "react";
import Image from "next/image";
import { PDFDocument, rgb } from "pdf-lib"; // Ensure rgb is imported
import fontkit from "@pdf-lib/fontkit";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, handleClose, children }: ModalProps) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all 
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    onClick={handleClose}
  >
    <div
      className="p-6 w-[1100px] flex flex-col gap-4" // Added flex and gap
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default function DownloadCertificate({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadCertificate = () => {
    if (name && lastname) {
      setIsOpenModal(true);
    } else {
      alert("Please provide both name and lastname.");
    }
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const imageResponse = await fetch("/images/Certificatetemplate01.png");
      if (!imageResponse.ok) {
        throw new Error(
          "Image fetch failed. Ensure the image path is correct."
        );
      }
      const imageBytes = await imageResponse.arrayBuffer();
      const pngImage = await pdfDoc.embedPng(imageBytes);
      pdfDoc.registerFontkit(fontkit);
      const thaiFontBytes = await fetch("/font/Sarabun-BoldItalic.ttf").then(
        (res) => res.arrayBuffer()
      );
      const thaiFont = await pdfDoc.embedFont(thaiFontBytes);
      const page = pdfDoc.addPage([842, 595]);
      const pngDims = pngImage.scale(0.5);
      page.drawImage(pngImage, {
        x: page.getWidth() / 2 - pngDims.width / 2,
        y: page.getHeight() / 2 - pngDims.height / 2,
        width: pngDims.width,
        height: pngDims.height,
      });
      page.drawText(`${name} ${lastname}`, {
        x: page.getWidth() / 2 - 50,
        y: page.getHeight() / 2 - 10,
        size: 30,
        font: thaiFont,
        color: rgb(0, 0, 0),
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}_${lastname}_certificate.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_SHOW_DOWNLOAD_CERTIFICATE_BUTTON === "true" && (
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleDownloadCertificate}
        >
          Download Certificate
        </button>
      )}

      {isOpenModal && (
        <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
          <Certificate name={name} lastname={lastname} ref={certificateRef} />
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="border-2 border-black w-full bg-gray-300 py-4 px-6 text-lg cursor-pointer 
                       hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </Modal>
      )}
    </>
  );
}

type CertificateProps = {
  name: string;
  lastname: string;
};

const Certificate = React.forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, lastname }, ref) => (
    <div
      ref={ref}
      className="relative bg-gray-800 h-[600px] flex items-center justify-center text-white"
    >
      <Image
        src="/images/Certificatetemplate01.png"
        alt="Certificate Template"
        layout="fill"
        objectFit="contain"
        className="absolute inset-0"
      />
      <p
        className="relative text-stone-900 text-3xl font-bold italic"
        style={{ fontFamily: "Sarabun-Bold" }} // This will not affect PDF generation
      >
        {name} {lastname}
      </p>
    </div>
  )
);

Certificate.displayName = "Certificate";
