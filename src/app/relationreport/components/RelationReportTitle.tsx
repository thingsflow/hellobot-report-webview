import Image from 'next/image';
import * as React from 'react';

interface IRelationReportTitle {
  title: string;
}

const RelationReportTitle = ({ title }: IRelationReportTitle) => {
  return (
    <div className="px-5 pt-6">
      <div className="flex">
        <h1 className="text-[22px] font-bold mr-1">{title}</h1>
        <Image
          src="/images/icon-modify-small.svg"
          alt="Modify Icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default RelationReportTitle;
