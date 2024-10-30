import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export default function DownloadCertificate({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCertificate = async () => {
    if (!name || !lastname) {
      alert("Please provide both name and lastname.");
      return;
    }

    setIsDownloading(true);

    try {
      const pdfResponse = await fetch("/pdf/certificatetemplate.pdf");
      if (!pdfResponse.ok) {
        throw new Error("PDF fetch failed. Ensure the PDF path is correct.");
      }
      const certificateBytes = await pdfResponse.arrayBuffer();
      const pdfDoc = await PDFDocument.load(certificateBytes);

      pdfDoc.registerFontkit(fontkit);
      const thaiFontBytes = await fetch("/font/TH Sarabun New Bold.ttf").then(
        (res) => res.arrayBuffer()
      );
      const thaiFont = await pdfDoc.embedFont(thaiFontBytes);

      // Get the first page of the PDF template
      const [templatePage] = pdfDoc.getPages();
      const { width, height } = templatePage.getSize();

      const text = `${name} ${lastname}`;
      const textWidth = thaiFont.widthOfTextAtSize(text, 30); // the font size

      templatePage.drawText(text, {
        x: (width - textWidth) / 2, // Center by subtracting half the text width from half the page width
        y: height / 2 + 25, // Adjust as needed
        size: 30,
        font: thaiFont,
        color: rgb(0, 0, 0),
      });

      // Save the modified PDF document
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
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={handleDownloadCertificate}
        >
          {isDownloading ? "(～￣▽￣)～ Processing..." : "(≧∇≦)ﾉ Download Certificate"}
        </button>
      )}
    </>
  );
}
