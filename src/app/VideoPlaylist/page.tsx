import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

export default function VideoPlaylist() {
  return (
    <>
      <Navbar />
      <h1 className="text-center my-5 text-4xl font-bold">หัวข้อบรรยาย</h1>
      <div>
        <div className=" text-white text-center text-xl bg-slate-500">
          <div>วันที่ 31 กมภา 25xx</div>
          <div className="">Please click at .......</div>
        </div>
        <div>
          <Link className="flex px-20 font-bold hover:text-green-500 text-green-600" href="/VideoPage">
            แพทย์...ทางเลือกที่ใช่?
            <br />
            เวลา
          </Link>
        </div>
      </div>
    </>
  );
}
