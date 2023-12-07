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
  const { data, loading } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const [touchPosition, setTouchPosition] = React.useState({
    start: 0,
    end: 0,
  });

  const bottomSheetRef = React.useRef<HTMLDivElement | null>(null);

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
      // TODO: lokalise
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

    if (isBottomSheetOpened) {
      webview.goSkillDetailPage({ skillSeq: data?.skill?.seq });
      return;
    }

    toggleBottomSheet();
  };

  const handleBackgroundOverlayClick = () => {
    toggleBottomSheet(false);
  };

  const handleBottomSheetHeaderTouchStart = () => {
    // touchStart이벤트와 click이벤트가 동시에 일어나면서 state가 두 번 업데이트되어 열리거나 닫히지 않는 이슈가 있음
    // isBottomSheetOpened에 따라 분기처리하여 한 시점에 하나의 액션만 일어나도록 함.
    if (isBottomSheetOpened) {
      toggleBottomSheet(false);
    } else {
      toggleBottomSheet(true);
    }
  };

  const handleBottomSheetHeaderClick = () => {
    // touchStart이벤트와 click이벤트가 동시에 일어나면서 state가 두 번 업데이트되어 열리거나 닫히지 않는 이슈가 있음
    // isBottomSheetOpened에 따라 분기처리하여 한 시점에 하나의 액션만 일어나도록 함.
    if (isBottomSheetOpened) {
      toggleBottomSheet(false);
    } else {
      toggleBottomSheet(true);
    }
  };

  const goToOpen = () => {
    // 현재는 필요없는 코드이기는함.
    toggleBottomSheet(true);
  };

  const goToClose = () => {
    if (bottomSheetRef.current?.scrollTop === 0) toggleBottomSheet(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({ ...touchPosition, start: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({ ...touchPosition, end: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    const { start, end } = touchPosition;
    if (start - end > 100) {
      // goToOpen();
    } else if (start - end < -100) {
      goToClose();
    }
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
        ref={bottomSheetRef}
        className={`transition-all duration-500 z-50 absolute top-0 w-full bg-white rounded-tl-2xl rounded-tr-2xl shadow-bottomSheet will-change-transform h-[calc(100svh-100px)] scrollbar-hide ${
          isBottomSheetOpening
            ? 'top-[115px]'
            : 'top-[calc(var(--vh)*100-100px)]'
        } ${isBottomSheetOpened ? 'overflow-scroll' : 'overflow-hidden'}`}
        initial="closed"
        animate={isBottomSheetOpening ? 'opened' : 'closed'}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }} // transition tailwind로 적용하기
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
            loading={loading}
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
