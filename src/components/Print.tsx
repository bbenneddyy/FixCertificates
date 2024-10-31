"use client"
import { PDFDocument, rgb } from 'pdf-lib';
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
        const openSansFont = await pdfDoc.embedFont(fontBytes); // Embed the TTF font

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
        let xPosition = (jpgDims.width - openSansFont.widthOfTextAtSize(fullName, fontSize)) / 2;
        const yPosition = (jpgDims.height - openSansFont.heightAtSize(fontSize)) / 2;

        // Define sets for characters that need to be moved
        // พวกสระกับวรรณยุกต์มันซ้อนกันไม่ต้องตกใจ อย่าลบบบบบ!!!
        const moveUpChars = new Set('ัํี๊้็่๋ิฺื์');
        const moveDownChars = new Set('ุู');
        const moveDownAfterChars = new Set('ฎฏฐ');

        // Draw the text in the center of the page
        let previousChar = '';
        for (const char of fullName) {
          const charWidth = openSansFont.widthOfTextAtSize(char, fontSize);
          let adjustedYPosition = yPosition + 40;

          // Check if the current character should be moved up
          if (moveUpChars.has(char) && moveUpChars.has(previousChar)) {
              adjustedYPosition += 15; // Move up
          }

          // Check if the current character should be moved down
          if (moveDownChars.has(char) && moveDownAfterChars.has(previousChar)) {
              adjustedYPosition -= 10; // Move down
          }

          page.drawText(char, {
              x: xPosition,
              y: adjustedYPosition,
              size: fontSize,
              font: openSansFont,
              color: rgb(0, 0, 0),
          });
          // Update x position and previous character
          xPosition += charWidth;
          previousChar = char;
      }

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