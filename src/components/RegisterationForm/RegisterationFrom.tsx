"use client";

import { createParticipant } from "@/utils/action";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      aria-disabled={pending}
    >
      สมัคร
    </button>
  );
}

export default function RegisterationForm() {
  const [state, formAction] = useFormState(createParticipant, initialState);
  return (
    <form className="flex-col space-y-10 mx-auto py-9" action={formAction}>
      <div className="flex flex-col items-center space-y-3 rounded-lg shadow-sm">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-bold leading-7 text-gray-900">ลงทะเบียน</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">ระดับชั้นการศึกษา</label>
              <div className="mt-2">
                <select
                  id="education"
                  name="education"
                  autoComplete="education-level"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>มัธยมศึกษาตอนต้น</option>
                  <option>มัธยมศึกษาปีที่ 4</option>
                  <option>มัธยมศึกษาปีที่ 5</option>
                  <option>มัธยมศึกษาปีที่ 6</option>
                  <option>ผู้ปกครอง</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">คำนำหน้าชื่อตามบัตรประชาชน</label>
              <div className="mt-2">
                <select
                  id="title"
                  name="title"
                  autoComplete="title-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                  <option>ด.ช.</option>
                  <option>ด.ญ.</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">ชื่อ (ภาษาไทย)</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="first-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">นามสกุล (ภาษาไทย)</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="last-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">อีเมล</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">หมายเลขโทรศัพท์</label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                เหตุผลที่อยากเข้าร่วม (ถ้ามี)
              </label>
              <div className="mt-2">
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="slip"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>โปรดแนบหลักฐานการชำระเงิน</span>
                      <input id="slip" name="slip" type="file" accept="image/*" className="sr-only" />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG หรือ JPG ไม่เกิน 2MB</p>
                </div>
              </div>
            </div>
            <SubmitButton />
          </div>
          {state?.message}
        </div>
      </div>
    </form>
  );
}
