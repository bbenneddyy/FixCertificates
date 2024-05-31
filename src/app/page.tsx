import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar /><h1 className="text-2xl font-bold">This is home pagee</h1><div className="bg-red-500 text-white p-4">TailwindCSS is working!</div><Link
        href="/api/auth/signin"
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in
      </Link><Link
        href="/secretpage"
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        secret page
      </Link><Link
        href="/sessionchecker"
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        session check
      </Link><Link
        href="/api/auth/signout"
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        signout
      </Link>
    </>
  );
}


