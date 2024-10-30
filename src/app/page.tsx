import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">This is home page</h1>
      <Link href="/tryout">
        <button className="rounded-md bg-pink-200 border border-black px-4 py-2 text-black font-bold hover:bg-pink-300">
          Go to Tryout
        </button>
      </Link>
      <Link href="/certy">
        <button className="rounded-md bg-pink-200 border border-black px-4 py-2 text-black font-bold hover:bg-pink-300">
          Go to Certy
        </button>
      </Link>
    </div>
  );
}