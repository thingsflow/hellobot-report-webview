import * as React from 'react';

const RelationReportShare = () => {
  return (
    <div>
      <div className="py-10 flex flex-col items-center">
        <h3 className="font-bold text-[20px] mb-1">
          가족이 모이면 이런 관계도가 보여요!
        </h3>
        <div className="w-full h-[300px] bg-gray-300"></div>
        <p className="whitespace-pre-wrap text-[#7E8185] text-center mt-8">
          {'지금 링크를 공유하고\n우리 모임의 관계도를 확인해 보세요.'}
        </p>
        <div className="flex gap-3 mt-6">
          <div className="w-12 h-12 rounded-full bg-[#FFE812]"></div>
          <div className="w-12 h-12 rounded-full border border-solid border-[#E2E3E6]"></div>
        </div>
      </div>
    </div>
  );
};

export default RelationReportShare;
