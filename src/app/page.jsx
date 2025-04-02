'use client';

import { useRouter } from 'next/navigation';

export default function Page(){
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={() => router.push('/dashboard')}
        className="bg-primary-green text-white px-8 py-4 rounded-xl shadow-lg hover:bg-[#31513f] transition-all duration-200 text-2xl font-semibold hover:shadow-xl hover:scale-105 active:scale-95"
      >
        Go to Dashboard
      </button>
    </div>
  );
}