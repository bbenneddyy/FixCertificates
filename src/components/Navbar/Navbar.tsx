import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>
        <h1>เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34</h1>
      </div>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
}
