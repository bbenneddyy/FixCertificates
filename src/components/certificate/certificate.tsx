import Image from "next/image";
import html2canvas from "html2canvas";
import { useRef } from "react";
import jsPDF from "jspdf";

const Certificate = ({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) => {
  const certificateRef = useRef(null);
  const handleDownloadpdf = () => {
    alert("downloading ");
    if (certificateRef.current) {
      // Check if current is not null
      html2canvas(certificateRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", [4000, 2821]);
        pdf.addImage(imgData, "PNG", 0, 0, 4000, 2821);
        pdf.save(`${name}_${lastname}_certificate.pdf`);
      });
    } else {
      alert("Certificate reference is not available."); // Handle null case
    }
  };

  return (
    <>
      <div
        ref={certificateRef}
        className="relative bg-gray-800 h-screen flex items-center justify-center text-white overflow-auto"
      >
        <Image
          src="/images/Certificatetemplate2.png"
          alt="placeholder"
          layout="fill"
          objectFit="contain" // Change to contain to maintain aspect ratio
          className="absolute inset-0 z-0"
        />
        <p className="relative z-10 text-blue-500 text-5xl font-bold italic my-4">
          {name} {lastname}
        </p>
      </div>
      <button
        onClick={handleDownloadpdf}
        className="border-2 border-black w-full outline-none bg-gray-300 py-4 px-6 text-lg shadow-[0px_0px_0px_2px_white] transition-all duration-300 ease cursor-pointer hover:bg-black hover:text-white"
      >
        Download PDF
      </button>
    </>
  );
};

export default Certificate;