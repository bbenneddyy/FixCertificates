import Navbar from "@/components/Navbar/Navbar";

export default function VideoPlaylist() {
  return (
    <>
      <Navbar />
      <h1 className="text-center my-5 text-4xl font-bold">หัวข้อบรรยาย</h1>
      <div>
        <div className=" text-white text-center text-xl bg-slate-500">
          <div>วันที่ 31 กมภา 25xx</div>
          <div>Please click at .......</div>
        </div>
        <div>
          <div className="px-6">
            <h1>ชื่อหัวข้อ</h1>
            <h1>เวลา</h1>
          </div>
        </div>
      </div>
    </>
  );
}
