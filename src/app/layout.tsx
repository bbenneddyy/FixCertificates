import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Image, { StaticImageData } from "next/image";
import "./globals.css";
import Carousel from "./components/Carousel/Carousel";
import image1 from "./components/Carousel/assets/01.jpg";
import image2 from "./components/Carousel/assets/02.jpg";
import image3 from "./components/Carousel/assets/03.jpg";
import Carouseltailorginal from "./components/Carousel/Carouseloriginal/Carouseloriginal";
/*import image4 from "./components/Carousel/assets/04.jpg";
import image5 from "./components/Carousel/assets/05.jpg";
import image6 from "./components/Carousel/assets/06.jpg";
import image7 from "./components/Carousel/assets/S__5054522.jpg";
*/
const imgs: StaticImageData[] = [image1, image2, image3];
const layout = () => {
  return (
    <html>
      <body>
        <Carouseltailorginal slides={imgs} />
      </body>
    </html>
  );
};
export default layout;

/*
tried     
   <html>
      <body>
        <Carousel slides={imgs.map(img => img.src)} />
      </body>
    </html>
*/