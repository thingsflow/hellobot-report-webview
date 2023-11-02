import * as React from 'react';

interface IBridgeReportTitle {
  title: string;
}

const BridgeReportTitle = ({ title }: IBridgeReportTitle) => {
  return (
    <div className="px-5 pt-6">
      <div className="flex flex-col mb-3">
        <h1 className="text-[22px] font-bold mr-1">{title}</h1>
        <p className="text-gray-600 text-[13px]">
          아래 스킬을 보고 관계도를 완성해 보세요
        </p>
      </div>
    </div>
  );
};

export default BridgeReportTitle;
