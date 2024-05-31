'use client'
import React from "react";
import { useSession, signOut , signIn } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign out
        </button>
      </div>
    );
  }

  return <Link href="/api/auth/signin" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Sign in
    </Link>;
};

export default SigninButton;