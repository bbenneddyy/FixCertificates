"use client";

import { FormEvent, useState } from "react";

const initialState = {
  message: "",
  status: 0,
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ name: "", lastName: "" });
  const [state, setState] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setState(data);
    
    if (data.status === 200) {
      setSuccessMessage(`Successfully registered: ${formData.name} ${formData.lastName}`);
      setFormData({ name: "", lastName: "" })
      //router.push('/success');

    } else {
      setSuccessMessage("");
      setErrorMessage(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border border-black rounded-md px-3 py-2 text-lg"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="border border-black rounded-md px-3 py-2 text-lg"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
        Register
      </button>
      {state.message && <p>{state.message}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
}