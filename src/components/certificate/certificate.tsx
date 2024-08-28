import Image from "next/image";
import html2canvas from "html2canvas";
import { useRef } from "react";
import jsPDF from "jspdf"
const Certificate = ({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) => {
  const certificateRef = useRef(null)
  const handleDownloadpdf = () => {
    alert("downloading ");
    if (certificateRef.current) { // Check if current is not null
        html2canvas(certificateRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', [1000, 670]);
            pdf.addImage(imgData, "PNG", 0, 0, 1000, 667);
            pdf.save(`${name}_${lastname}_certificate.pdf`);
        });
    } else {
        alert("Certificate reference is not available."); // Handle null case
    }
};
  return (
    <>
    <div ref={certificateRef} className="bg-gray-800 h-screen flex flex-col items-center justify-center text-white overflow-auto">
      <div className="border border-white p-8 rounded-lg mt-8 mb-12">
        <div>Logo Here</div>

        <h1>CERTIFICATE OF APPRECIATION</h1>

        <span className="text-sm">This certificate is proudly awarded to</span>

        <p className="text-blue-500 text-5xl font-bold italic my-4">
          {name} {lastname}
        </p>

        <span className="text-sm">for successfully completing the course</span>

        <h2> Course </h2>

        <span className="text-sm">conducted from 10 day ago</span>

        <div className="mt-12 inline-block">
          <Image
            src="/images/placeholder.jpg"
            alt="placeholder"
            layout="fixed"
            objectFit="contain"
            width={300} // Set a specific width
            height={200} // Set a specific height

            // className="relative rounded-xl overflow-hidden"
          />

          <span className="block mx-auto h-px w-48 bg-black mb-4" />

          <span className="text-sm">signatureDetails</span>
        </div>
      </div>
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
