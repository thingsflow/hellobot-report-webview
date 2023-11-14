'use client';
import webview from '@/utils/webview';
import Image from 'next/image';

export default function NotFound() {
  const handleBackButtonClick = () => {
    webview.goBack();
  };

  return (
    <div className="z-10 flex flex-col items-center w-full h-screen overflow-hidden bg-gray-200">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white">
        <Image
          src="/images/img_search_notfound.svg"
          width={200}
          height={200}
          alt="Notfound Image"
        />
        <p className="m-4 text-xl font-medium text-gray-600">
          {'문제가 발생했어요!'}
        </p>
        <button
          className="w-40 h-12 mt-1 flex items-center justify-center font-bold bg-[#FFE967] rounded-[26px] cursor-pointer"
          onClick={handleBackButtonClick}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
