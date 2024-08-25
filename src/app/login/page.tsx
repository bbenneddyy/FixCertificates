"use client"
import UserLoginForm from "@/components/Forms/Userlogin";
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Navbar from "@/components/Navbar/Navbar";

export default function login() {
  return (
    <Router>
    <div>
      <Navbar />

      <UserLoginForm />
    </div>
    </Router>

  );
}
