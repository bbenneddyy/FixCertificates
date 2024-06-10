import Link from "next/link";

function RegisterationForm() {
  return (
    <form className="flex-col space-y-10 mx-auto py-9">
      <h1 className="text-center font-bold">ลงทะเบียน</h1>

      <div className="flex rounded-lg shadow-sm flex-col space-y-3 items-center">
        <select
          id="years"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
        >
          <option>- โปรดระบุระดับชั้นการศึกษา -</option>
          <option>- มัธยมศึกษาปีที่4 -</option>
          <option>- มัธยมศึกษาปีที่5 -</option>
          <option>- มัธยมศึกษาปีที่6 -</option>
          <option>- ผู้ปกครอง -</option>
        </select>
        <input
          type="text"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="คำนำหน้าชื่อ"
        />
        <input
          type="text"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="ชื่อจริง (*ภาษาไทย โปรดตรวจสอบข้อมูลให้ถูกต้อง เนื่องจากใช้สำหรับทำเกียรติบัตร)"
        />
        <input
          type="text"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="นามสกุล (*ภาษาไทย โปรดตรวจสอบข้อมูลให้ถูกต้อง เนื่องจากใช้สำหรับทำเกียรติบัตร)"
        />
        <input
          type="text"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="Email"
        />
        <input
          type="text"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="หมายเลขโทรศัพท์"
        />
        <input
          type="text"
          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
          placeholder="เหตุผลที่อยากเข้าร่วม"
        />
        <label className="block mb-2 text-sm text-gray-900 dark:text-white font-bold">
          โปรดแนบหลักฐานการชำระเงิน
        </label>
        <input
          className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-auto"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
        />
        <Link
          href="/register"
          className=" bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-2xl"
        >
          Register Now!
        </Link>
      </div>
    </form>
  );
}
export default RegisterationForm;
