import { config } from "@/utils/auth";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
export default async function tttt() {
    const session = await getServerSession(config)
    if(!session){
    return <div className="text-5xl text-center text-purple-500 font-bold my-10 shadow-lg">
        pls login no session
      </div>
    }
    return (
      <div className="text-5xl text-center text-purple-500 font-bold my-10 shadow-lg">
        logined session have
      </div>
    );
}