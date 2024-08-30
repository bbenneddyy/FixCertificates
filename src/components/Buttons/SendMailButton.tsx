"use client"

import { sendingLastMail } from "@/utils/action"

export default function SendingMailButton(){
    return(
        <button
            onClick={() => sendingLastMail()}
            className="border-4 p-2 border-red-600 bg-red-600 rounded-lg text-white hover:border-red-700 transition block"
        >
            ส่งเมล
        </button>
    )
}