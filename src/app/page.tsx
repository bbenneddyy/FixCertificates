import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-screen">
        <Image
          src="/images/placeholder.jpg"
          alt="placeholder"
          layout="fill"
          objectFit="cover"
        />

        <Image
          src="/images/placeholder2.jpg"
          alt="placeholder2"
          width={100}
          height={200}
          className="absolute top-16 left-8 rounded-3xl w-1/2 hover:brightness-75 transition-all duration-500"
        />
        <div
          style={{ top: "480px" ,width: "546.5px"}}
          className="absolute top-64 left-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transform hover:scale-110 transition-transform duration-500"
        >
          button
        </div>
      </div>
    </>
  );
}
