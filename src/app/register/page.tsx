import Navbar from "@/components/Navbar/Navbar";
import RegistrationForm from "@/components/Forms/RegistrationForm";
import { webStatus } from "@/utils/config";
import { redirect } from "next/navigation";

export default function Register() {
  if (webStatus === "open") {
    return (
      <>
        <Navbar />
        <RegistrationForm />
      </>
    );
  } else {
    redirect('/');
  }
}
