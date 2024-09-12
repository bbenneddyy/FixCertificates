"use client"

import { sendingLastMail } from "@/utils/action";
import { useState, MouseEvent } from "react";

export default function SendMailButton() {
  const [message, setMessage] = useState<string>("");

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    if (!confirm("หากดำเนินการต่อจะทำการส่งเมลให้ผู้เข้าร่วมทุกคน")) {
      e.preventDefault();
      return;
    }

    setMessage("Mail is sending...");
    
    sendingLastMail("accepted")
      .then(() => {
        setMessage("Mail sent successfully!");
      })
      .catch(() => {
        setMessage("Failed to send mail.");
      });
  };

  return (
    <div>
      <button
        onClick={onSubmit}
        className="border-4 p-2 border-red-600 bg-red-600 rounded-lg text-white hover:border-red-700 transition block"
      >
        ส่งเมล
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}