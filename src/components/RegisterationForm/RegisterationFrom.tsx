'use client';

import { createParticipant } from "@/utils/action";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit"
      className=" bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-2xl"
      aria-disabled={pending}
    >
      สมัคร
    </button>
  )
}
export default function RegisterationForm() {
  const [state, formAction] = useFormState(createParticipant, initialState);
  return (
    <form className="flex-col space-y-10 mx-auto py-9" action={formAction}>
      <h1 className="text-center font-bold">ลงทะเบียน</h1>
      <div className="flex rounded-lg shadow-sm flex-col space-y-3 items-center">
        <label>ระดับชั้นการศึกษา
          <select
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
            name="education"
          >
            <option>มัธยมศึกษาตอนต้น</option>
            <option>มัธยมศึกษาปีที่ 4</option>
            <option>มัธยมศึกษาปีที่ 5</option>
            <option>มัธยมศึกษาปีที่ 6</option>
            <option>ผู้ปกครอง</option>
          </select>
        </label>
        <label>คำนำหน้าชื่อตามบัตรประชาชน
          <select
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
            name="title"
          >
            <option>นาย</option>
            <option>นาง</option>
            <option>นางสาว</option>
            <option>ด.ช.</option>
            <option>ด.ญ.</option>
          </select>
        </label>
        <input
          type="text"
          name="firstname"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="ชื่อจริง (*ภาษาไทย โปรดตรวจสอบข้อมูลให้ถูกต้อง เนื่องจากใช้สำหรับทำเกียรติบัตร)"
        />
        <input
          type="text"
          name="lastname"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="นามสกุล (*ภาษาไทย โปรดตรวจสอบข้อมูลให้ถูกต้อง เนื่องจากใช้สำหรับทำเกียรติบัตร)"
        />
        <input
          type="email"
          name="email"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="อีเมล"
        />
        <input
          type="text"
          name="phone"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="หมายเลขโทรศัพท์"
        />
        <input
          type="text"
          name="reason"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="เหตุผลที่อยากเข้าร่วม"
        />
        <label className="block mb-2 text-sm text-gray-900 dark:text-white font-bold">
          โปรดแนบหลักฐานการชำระเงิน
          <input
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-auto"
            name="slip"
            type="file"
            accept="image/*"
          />
        </label>
        <SubmitButton />
        {state?.message}
      </div>
    </form>
  );
}