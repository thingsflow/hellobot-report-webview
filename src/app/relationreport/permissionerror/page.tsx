'use client';

import { t } from '@/utils/translate';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PermissionErrorPage = () => {
  const route = useRouter();
  const onMainMove = () => {
    route.push(process.env.NEXT_PUBLIC_SKILLSTORE_URL || '/');
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-center items-center text-[17px] font-bold py-2"
        onClick={onMainMove}
      >
        <Image
          className="cursor-pointer"
          src={'/images/img_hellobotlogo_kr.svg'}
          width={106}
          height={32}
          alt="logo"
        />
      </div>
      <div className="w-full h-[1px] bg-[#F5F5F5]" />
      <div className="z-10 flex flex-col items-center w-full h-screen overflow-hidden bg-gray-200 ">
        <div className="flex flex-col items-center justify-center w-full h-full bg-white pb-[40%]">
          <Image
            src="/images/panming_sad.png"
            width={200}
            height={200}
            alt="Notfound Image"
          />

          <p className="m-4 text-gray-900 text-[22px] font-bold text-center">
            {t('relationshipmap_alert_private')}
          </p>
          <p className="text-center text-gray-500 text-base mx-3">
            {t('relationshipmap_alert_private_sub')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PermissionErrorPage;
