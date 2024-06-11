import Link from "next/link";
import Image from "next/image";
//import logo from "../public/chulalogo.jpg";

export default function Navbar() {
  return (
    <header className="flex items-center px-8 py-10 space-x-6 bg-lime-600">
      <Image src="/images/chulalogo.png" alt="Chula Logo" width={100} height={200}/>
      <h1 className="font-bold text-2xl">เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34</h1>
      <ul className="flex text-center space-x-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </header>
  );
}
