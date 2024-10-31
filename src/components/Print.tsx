"use client"
import { PDFDocument, rgb } from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export default function Print({
  name,
  lastname,
}: {
  name: string;
  lastname: string;
}) {
    const handlePrint = async () => {
        const jpgUrl = '/images/certy.jpg'; 
        const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);
        //ถ้าเปลี่ยน font ต้องไปปรับค่า y บนบรรทัด 52
        const fontUrl = '/fonts/Charm-Bold.ttf';
        const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
        const openSansFont = await pdfDoc.embedFont(fontBytes, { subset: true }); // Embed the TTF font

        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
        const jpgDims = jpgImage.scale(0.5); // Scale the image
        const page = pdfDoc.addPage([jpgDims.width, jpgDims.height]); 

        page.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: jpgDims.width,
            height: jpgDims.height,
        });
        const fullName = `${name} ${lastname}`; // Concatenate name and lastname

        const fontSize = 40; // Font size
        const textWidth = openSansFont.widthOfTextAtSize(fullName, fontSize);
        const xPosition = (jpgDims.width - textWidth) / 2;
        const yPosition = jpgDims.height / 2 + fontSize / 2;

          page.drawText(fullName, {
              x: xPosition,
              y: yPosition,
              size: fontSize,
              font: openSansFont,
              color: rgb(0, 0, 0),
          });

        const pdfBytes = await pdfDoc.save();
        const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = `${name}_${lastname}.pdf`;
        a.click();
        URL.revokeObjectURL(pdfUrl);
    };

    return (
      <div className="">
        <button onClick={handlePrint} className="font-bold text-5xl text-red-900">Print Image as PDF</button>
      </div>
    );
}