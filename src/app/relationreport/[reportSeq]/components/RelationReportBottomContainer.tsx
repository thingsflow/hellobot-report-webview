'use client';
import * as React from 'react';
import {
  RelationReportDetail,
  RelationReportFooter,
  RelationReportShare,
} from '.';
import Divider from '@/components/Divider';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SkillBanner from '@/components/SkillBanner';
import { useParams, useSearchParams } from 'next/navigation';
import useGetRelationReport from '@/apis/useGetRelationReport';
import webview from '@/utils/webview';
import useGetUser from '@/apis/useGetUser';
import { environment } from '../../../../../environments/environment';
import { STORAGE_KEY } from '@/consts/common';

const RelationReportBottomContainer = () => {
  const [isBottomSheetOpening, setIsBottomSheetOpening] = React.useState(false); // 바텀시트를 열거나 닫는 영역을 터치했는지 여부
  const [isBottomSheetOpened, setIsBottomSheetOpened] = React.useState(false); // 바텀시트가 완전히 열리거나 닫혔는지 여부
  const params = useParams();
  const searchParams = useSearchParams();
  const share = searchParams.get('isShare');
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const { data: userData } = useGetUser({});

  const toggleBottomSheet = (isOpen?: boolean) => {
    setIsBottomSheetOpening((prev) => (isOpen !== undefined ? isOpen : !prev));
    setTimeout(() => {
      // 바텀시트가 완전히 열린 후 state를 업데이트한다.
      // delay는 열고 닫는 transition의 duration인 500에서 약간의 여유를 두기위해 450으로 설정
      setIsBottomSheetOpened((prev) => (isOpen !== undefined ? isOpen : !prev));
    }, 450);
  };

  const handleSkillBannerClick = () => {
    const isKeepAnonymous = localStorage.getItem('isKeepAnonymous');

    if (
      userData?.type === 'anonymous' &&
      isKeepAnonymous !== 'true' &&
      share === 'true'
    ) {
      if (
        confirm(
          '로그인 하시겠습니까? 로그인을 하지 않고 진행하게 될 시, 관계도 및 결과가 저장되지 않습니다.',
        )
      ) {
        webview.doLoginWithRedirectUrl({
          redireactUrl:
            environment.relationReportShareBaseUrl +
            `?relationSeq=${params.reportSeq}`,
        });
      } else {
        localStorage.setItem('isKeepAnonymous', 'true');
      }
    }

    if (isBottomSheetOpening) {
      webview.goSkillDetailPage({ skillSeq: data?.skill?.seq });
      return;
    }

    toggleBottomSheet();
  };

  const handleBackgroundOverlayClick = () => {
    toggleBottomSheet(false);
  };

  const handleBottomSheetHeaderTouchStart = () => {
    const platform = localStorage.getItem(STORAGE_KEY.PLATFORM);

    // 현재 바텀시트가 열려있고, 웹이면 touchStart 이벤트로 닫지 못하게 막는다.
    // => 웹 최상단에서 아래로 스크롤 이벤트가 발생했을 때 새로고침(브라우저 내장 기능)이 발생할 가능성이 있다.
    if (isBottomSheetOpening === true && platform === 'web') return;

    toggleBottomSheet();
  };

  const handleBottomSheetHeaderClick = () => {
    if (isBottomSheetOpening === false) return;

    toggleBottomSheet();
  };

  return (
    <>
      <motion.div
        animate={isBottomSheetOpening ? 'opened' : 'closed'}
        className={`absolute top-0 left-0 w-full h-[100vh] bg-black ${
          isBottomSheetOpening ? 'z-50' : 'z-0'
        } opacity-0`}
        variants={{
          opened: {
            backdropFilter: 'blur(1px)',
            pointerEvents: 'all',
            opacity: 0.2,
          },
          closed: {
            backdropFilter: 'blur(0px)',
            pointerEvents: 'none',
            opacity: 0,
          },
        }}
        onClick={handleBackgroundOverlayClick}
      ></motion.div>
      <motion.div
        className={`transition-all duration-500 z-50 absolute top-0 w-full bg-white rounded-tl-2xl rounded-tr-2xl shadow-bottomSheet will-change-transform h-[calc(100svh-100px)] scrollbar-hide ${
          isBottomSheetOpening
            ? 'top-[115px]'
            : 'top-[calc(var(--vh)*100-100px)]'
        } ${isBottomSheetOpened ? 'overflow-scroll' : 'overflow-hidden'}`}
        initial="closed"
        animate={isBottomSheetOpening ? 'opened' : 'closed'}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }} // transition tailwind로 적용하기
      >
        {/* 바텀시트 헤더 */}
        <div className="flex-grow cursor-grab select-none">
          <div
            className="flex px-5 py-4 justify-between sticky top-0 bg-white z-10 w-full"
            onTouchStart={handleBottomSheetHeaderTouchStart}
            onClick={handleBottomSheetHeaderClick}
          >
            <div className="flex">
              <Image
                className="mr-2"
                src="/images/connect-idea.svg"
                width="16"
                height={16}
                alt="Alert Icon"
              />
              <p className="text-gray-900 font-bold">상세보기</p>
            </div>
            <div>
              <Image
                style={{
                  transition: 'transform duration-500 ease-in',
                  transform: `${
                    isBottomSheetOpening ? 'rotate(-180deg)' : 'rotate(0deg)'
                  }`,
                }}
                src="/images/list-up.svg"
                width="24"
                height="24"
                alt="List Up Icon"
              />
            </div>
          </div>
          <SkillBanner
            name={data?.skill?.name}
            image={data?.skill?.newSkillBannerImageUrl}
            evalAvgScore={data?.skill?.evalAvgScore}
            badgeTitle={data?.skill?.badge?.title}
            onTouchStart={handleSkillBannerClick}
            onClick={handleSkillBannerClick}
          />
          {/* 바텀시트 컨텐츠 */}
          <RelationReportDetail />
          <Divider />
          <RelationReportShare />
          <Divider />
          <RelationReportFooter />
        </div>
      </motion.div>
    </>
  );
};

export default RelationReportBottomContainer;
