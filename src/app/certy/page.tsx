import Image from 'next/image';
import Print from '@/components/Print';

const name = "Salt"
const lastName = "Pepper"
export default function certy() {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">certy</h1>
        <Image src="/images/certy.jpg" alt="Description of image" width={500} height={300} />
        <Print />
      </div>
    );
  }
