import Navbar from "@/components/Navbar/Navbar";
import RegisterationForm from "@/components/RegisterationForm/RegisterationFrom";
import { webStatus } from "@/utils/config";
import { redirect } from "next/navigation";

export default function Register() {
  if (webStatus === "open") {
    return (
      <>
        <Navbar />
        <RegisterationForm />
      </>
    );
  } else {
    redirect('/');
  }
}
