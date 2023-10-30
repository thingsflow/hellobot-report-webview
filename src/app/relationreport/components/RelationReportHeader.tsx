import Image from 'next/image';
import * as React from 'react';

const RelationReportHeader = () => {
  return (
    <header className="w-full flex justify-between px-4 pt-4">
      <Image
        src="/images/buttons-btn-modal-share.svg"
        alt="Share Icon"
        width={32}
        height={32}
        priority
      />
      <Image
        src="/images/buttons-btn-modal-close.svg"
        alt="Close Icon"
        width={32}
        height={32}
        priority
      />
    </header>
  );
};

export default RelationReportHeader;
