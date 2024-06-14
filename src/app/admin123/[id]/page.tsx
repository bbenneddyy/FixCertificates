"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Registration {
  id: string;
  education: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  reason: string;
  status: string;
}
export default function Approvepage() {
  const [userData, setUserdata] = useState<Registration[]>();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    async function getUserdata() {
      const res = await fetch("/api/registration/" + params.id);
      if (!res.ok) {
        console.error("Failed to fetch user data:", res.status, res.statusText);
        return;
      }
      const userdata = await res.json();

      if (Array.isArray(userdata)) {
        setUserdata(userdata);
      } else {
        setUserdata([userdata]);
      }
    }
    getUserdata();
  }, [params.id]);
  return (
    <div className="w-full flex justify-center font-bold pt-5">
      {userData?.map((Udata) => (
        <div className="py-1" key={Udata.id}>
          <p className="py-2 border-2 rounded-md p-2 bg-slate-100">
            {Udata.registration.email} {// "registration" may get error just ignore it
}
          </p>
        </div>
      ))}
    </div>
  );
}
