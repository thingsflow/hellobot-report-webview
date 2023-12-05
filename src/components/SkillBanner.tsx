import * as React from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { t } from '@/utils/translate';

interface ISkillBanner {
  name?: string;
  image?: string;
  evalAvgScore?: number;
  badgeTitle?: string;
  loading?: boolean;
  onClick?: () => void;
  onTouchStart?: () => void;
}

const SkillBanner = ({
  name,
  image,
  evalAvgScore,
  badgeTitle,
  loading,
  onClick,
  onTouchStart,
}: ISkillBanner) => {
  return (
    <div
      className="relative w-full px-4 cursor-pointer z-60 "
      onClick={onClick}
      onTouchStart={onTouchStart}
    >
      {loading ? (
        <Skeleton
          className="py-[13px] rounded-lg"
          width={'100%'}
          height={'99px'}
          duration={0.9}
        />
      ) : (
        <div className="flex p-3 border border-gray-200 border-solid rounded-xl bg-gray-50">
          {/* TODO: inset border 적용하기 */}
          <Image
            className="flex-shrink-0 object-cover mr-3 rounded-lg w-[98px] h-[73px] shadow-inset"
            src={image || '/images/new-skill-banner-default.png'}
            alt="Banner Image"
            width={98}
            height={73}
            placeholder="empty"
          />
          <div className="flex flex-col">
            <h5 className="font-medium line-clamp-2 leading-[22px] mt-1">
              {name}
            </h5>
            <div className="flex">
              <div className="flex items-center gap-1">
                <Image
                  className="bg-gray300 fill-white"
                  src={'/images/ic-star.svg'}
                  width={16}
                  height={16}
                  alt="Skill Icon"
                />
                <div className="text-[#555759] pt-[4px] text-[13px]">
                  {evalAvgScore} ・{' '}
                  {t('home_screen_label_skill_view_count', {
                    value: badgeTitle,
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillBanner;
