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
      <iframe src="https://player.vimeo.com/video/991156993?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write"  ></iframe>
      
    </>
  );
}
