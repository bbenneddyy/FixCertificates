'use client';
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

export default function Admin123() {
  const [regisdata, setRegisdata] = useState<Registration[]>([]);

  useEffect(() => {
    async function fetchRegData() {const response = await fetch('/api/registration');
    if (response.ok) {
      const data: Registration[] = await response.json();
      setRegisdata(data);
    } else {
        console.error("Error fetching data: " + response.status);
      // Handle the case where the response is not OK
    }}
    fetchRegData();
  }, []);

  return (
    <div>
      {regisdata?.map((regdata) => (
        <div className="py-1" key={regdata.id}>
          <p className="py-2 border-2 rounded-md p-2 bg-slate-100">
            {regdata.firstname}
          </p>
        </div>
      ))}
    </div>
  );
}

// Admin123.getInitialProps = async () => {
//   const regis = await prisma.registration.findMany();
//   console.log(regis); // Log regis here
//   return { regis };
// };
