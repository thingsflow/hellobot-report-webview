import { useRouter } from 'next/navigation';
import * as React from 'react';

const RelationReportFooter = () => {
  const router = useRouter();

  return (
    <div className="px-6 py-8">
      <p className="text-gray-700 text-center">
        🤔 다른 모임과의 관계가 궁금하다면?
      </p>
      <div
        className="cursor-pointer w-full h-12 bg-[#FFE967] flex items-center justify-center font-bold rounded-[26px] mt-4"
        onClick={() => router.push('/relationreport/create')}
      >
        새로운 모임 만들기
      </div>
    </div>
  );
};

export default RelationReportFooter;
