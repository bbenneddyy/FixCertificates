import { config } from "@/utils/auth";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function SessionChecker() {
    const session = await getServerSession(config)
    if(!session){
    return <div className="text-5xl text-center text-purple-500 font-bold my-10 shadow-lg">
        pls login no session 
        <Link
        href="/api/auth/signin"
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </Link>
      </div>
      
    }
    return (
      <div className="text-5xl text-center text-purple-500 font-bold my-10 shadow-lg">
        logined session have
      </div>
    );
}