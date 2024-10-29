import RegisForm from "@/components/RegisForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Register</h1>
      <RegisForm />
    </div>
  );
}