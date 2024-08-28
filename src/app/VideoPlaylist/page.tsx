"use client";
import React, { useEffect, useState } from "react";
import Slider from "@/components/Video/slider";
import Cookies from 'js-cookie'; // Import js-cookie
type User = {

  firstname: string;

  lastname: string;
};
const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const handleLogout = () => {

    Cookies.remove('user'); // Remove the user cookie
    setUser(null); // Clear the user state
  };
  useEffect(() => {
    // Check for user cookie
    const userCookie = Cookies.get('user'); // Get the user cookie
    if (userCookie) {
      setUser(JSON.parse(userCookie)); // Parse and set user from cookie
    } else {
      // Fetch user from API if cookie is not present
      const fetchUser = async () => {
        const response = await fetch('/api/login', { method: 'POST' });
        if (!response.ok) {
          console.error('Failed to fetch user:', response.statusText);
          return; // Exit if the response is not OK
        }
        const data = await response.json();
        setUser(data.user); // Set user from API response
        console.log('user:', data.user)
      };
      fetchUser();
    }
  }, []);
  

  return (
    <div>
      {user?.firstname && user?.lastname ? (
        <>
          <div className="flex flex-col items-center justify-center h-12 bg-cyan-950">
            <h1 className="text-4xl font-bold text-white mb-4 my-24">
              Welcome, {user.firstname} {user.lastname}!
            </h1>
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
              Logout
            </button> {/* Logout button added */}
         
          </div>
          <Slider />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-cyan-950">
          <h1 className="text-4xl font-bold text-white my-10 mb-4">
            Please log in
          </h1>
        </div>
      )}
    </div>
  );
};

export default Page;
