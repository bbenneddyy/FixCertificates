'use client';

import { UserLogin } from "@/utils/action";
import { useFormState, useFormStatus } from "react-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const prevState = {
    message: "",
    status: 0,
    user: "",
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
      <button
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mx-auto flex justify-center" // Center the button horizontally using Tailwind CSS
          aria-disabled={pending}
      >
          เช้าสู่ระบบ
      </button>
  );
}

export default function UserLoginForm(){
  const navigate = useNavigate(); // Initialize useNavigate
  const [state, formAction] = useFormState(UserLogin, prevState);
  if (state?.status === 200) {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: state.user }),
    }).then(() => {
        navigate('/VideoPlaylist');
        window.location.reload();
    });
    return null;
}
    return (
      
        <>
        <div className="flex justify-center items-center h-screen bg-emerald-700">
        <div className="w-1/2">
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
       <form className="space-y-4" action={formAction}>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-100">Phone:</label>
                <input type="text" id="phone" name="phone" placeholder="Enter your phone number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-100">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <SubmitButton/>        
        </form>
      <p className="text-center text-red-500">{state?.message}</p>
    </div>
    </div>
    </div>
    </>
  );
}