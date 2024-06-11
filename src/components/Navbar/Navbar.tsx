import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex items-center px-8 space-x-6 bg-gray-100">
      <Image src="/images/chulalogo.png" alt="Chula Logo" width={100} height={150} />
      <h1 className="font-bold text-2xl hidden md:block">เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34</h1>
      <ul className="flex text-center space-x-6">
        <li>
          <Link href="/" className="border-4 p-2 rounded-lg bg-gray-200 hover:border-slate-300 transition ease-in-out">หน้าหลัก</Link>
        </li>
        <li>
          <Link href="/register" className="border-4 p-2 rounded-lg bg-gray-200 hover:border-slate-300 transition ease-in-out">สมัคร</Link>
        </li>
      </ul>
    </header>
  );
}
