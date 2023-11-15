import { t } from '@/utils/translate';
import Image from 'next/image';
import * as React from 'react';

const RelationReportDetail = () => {
  return (
    <div className="flex flex-col px-6 ">
      {/* item */}
      <div className="pt-[52px] pb-10 border-b border-solid border-gray-200">
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={` bg-[#20DB93] flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
            >
              수지
            </div>
            <div className="flex absolute w-[70px] top-[70px] absolute-center justify-center">
              <div className="text-gray-600 text-[13px] pt-[1px] line-clamp-2">
                병오일주
              </div>
            </div>
          </div>
          <Image
            className="px-2"
            src="/images/double-arrow.svg"
            width={74}
            height={74}
            alt="double arrow"
          />
          <div className="relative">
            <div
              className={` bg-[#20DB93] flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
            >
              채현아
            </div>
            <div className="flex absolute w-[70px] top-[70px] absolute-center justify-center">
              <div className="text-gray-600 text-[13px] pt-[1px] line-clamp-2">
                병오일주
              </div>
            </div>
          </div>
        </div>
        <h5 className="mt-[60px] text-lg font-bold text-gray-900 text-center">
          두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!
        </h5>
        <p className="text-gray-900 mt-4">
          그리킹이라고도 채움 출판이나 전에 그래픽 입숨은 이용된다. 입숨을 채움
          입숨은 그리킹이라고도 문장 입숨을 사용할 분야에서 그래픽 차지하는
          연출을 그리킹이라고도 레이아웃 분야에서 시각 사용된다. 이용된다. 문장
          디자인 무언가를 공간만 타이포그래피, 채움 그래픽 전에 사용된다. 시각적
          모형의 내용이 레이아웃 지칭하는 때 디자인 차지하는 입숨은 같은
          무언가를 시각 채움 그래픽 사용하는 레이아웃 분야에서 폰트, 폰트,{' '}
        </p>
      </div>
      <div className="my-4 flex gap-[10px] text-gray-800 items-center justify-center w-full h-12 border border-solid border-gray-300 rounded-[6px] bg-white">
        {t('common_more')}
        <Image
          src="/images/button-lg-btn-arrow-down.svg"
          width={16}
          height={16}
          alt="Arrow Down Icon"
        />
      </div>
    </div>
  );
};

export default RelationReportDetail;
