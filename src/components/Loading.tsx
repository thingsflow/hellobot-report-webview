import * as React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="fixed z-100 top-0 left-0 w-full h-full flex justify-center items-center">
      <Image
        src="/images/loading.svg"
        alt="Loading Image"
        width={60}
        height={60}
      />
    </div>
  );
};

export default Loading;
