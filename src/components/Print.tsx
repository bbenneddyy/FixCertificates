"use client"
import { PDFDocument } from 'pdf-lib';

export default function Print() {
    return (
      <div className="">
        <button onClick={handlePrint} className="font-bold text-5xl text-red-900">Print Image as PDF</button>
      </div>
    );
  }

async function handlePrint() {
    const jpgUrl = '/images/certy.jpg'; 

    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    const jpgDims = jpgImage.scale(0.5);

    const page = pdfDoc.addPage([jpgDims.width, jpgDims.height]); 

    page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgDims.width,
        height: jpgDims.height,
    });

    const pdfBytes = await pdfDoc.save();
//ทำตาม docs เเล้วมันไม่โหลดเลยเพิ่มอันนี้มา
    // Create a URL for the PDF and trigger download
    const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'certy.pdf';
    a.click();
    URL.revokeObjectURL(pdfUrl);
}