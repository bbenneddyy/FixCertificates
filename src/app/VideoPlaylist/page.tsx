"use client";
import React from "react";
import Slider from "@/components/Video/slider";
const page = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      {user.firstname && user.lastname ? (
        <>
          <div className="flex flex-col items-center justify-center h-12 bg-cyan-950">
            <h1 className="text-4xl font-bold text-white mb-4 my-24">
              Welcome, {user.firstname} {user.lastname}!
            </h1>
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

export default page;
