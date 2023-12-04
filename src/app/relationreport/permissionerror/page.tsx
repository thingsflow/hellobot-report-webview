'use client';
import { t } from '@/utils/translate';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { environment } from '../../../../environments/environment';
const PermissionErrorPage = () => {
  const route = useRouter();
  const onMainMove = () => {
    route.push(environment.url);
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
            src="/images/panming_sad.svg"
            width={200}
            height={200}
            alt="Notfound Image"
          />

          <p className="m-4 text-gray-900 text-[22px] font-bold text-center">
            이 관계도는 방장에 의해
            <br />
            비공개처리되었습니다.
          </p>
          {/* {t('relationshipmap_alert_private', { value: '관계도' })} */}
          {/* todo:// localise 필요 */}

          <p className="text-center text-gray-500 text-base mx-3">
            방장은 프로필 - "내 관계도/결과 모아보기" 리스트를 통해 확인할 수
            있습니다.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default PermissionErrorPage;
