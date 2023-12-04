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
import { useParams } from 'next/navigation';
import useGetRelationReport from '@/apis/useGetRelationReport';
import webview from '@/utils/webview';
import useGetUser from '@/apis/useGetUser';
import { environment } from '../../../../../environments/environment';

const RelationReportBottomContainer = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const { data: userData } = useGetUser({});

  const handleSkillBannerClick = () => {
    const isKeepAnonymous = localStorage.getItem('isKeepAnonymous');

    if (userData?.type === 'anonymous' && isKeepAnonymous !== 'true') {
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

    if (isOpened) {
      webview.goSkillDetailPage({ skillSeq: data?.skill?.seq });
      return;
    }

    setIsOpened(true);
  };

  const handleBackgroundOverlayClick = () => {
    setIsOpened(false);
  };

  const handleBottomSheetHeaderClick = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <>
      <motion.div
        animate={isOpened ? 'opened' : 'closed'}
        className={`absolute top-0 left-0 w-full h-[100dvh] bg-black ${
          isOpened ? 'z-50' : 'z-0'
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
        className={`z-50 absolute top-0 w-full bg-white rounded-tl-2xl rounded-tr-2xl shadow-bottomSheet will-change-transform h-[calc(100svh-100px)] ${
          isOpened ? 'overflow-scroll' : 'overflow-hidden'
        }`}
        initial="closed"
        animate={isOpened ? 'opened' : 'closed'}
        variants={{
          opened: { top: '115px' },
          closed: { top: 'calc(100dvh - 100px)' },
        }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
      >
        {/* 바텀시트 헤더 */}
        <div className="flex-grow cursor-grab select-none">
          <div
            className="flex px-5 py-4 justify-between sticky top-0 bg-white z-10 w-full"
            onClick={handleBottomSheetHeaderClick}
            onTouchStart={handleBottomSheetHeaderClick}
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
                  transition: 'transform 0.2s ease-in',
                  transform: `${isOpened ? 'rotate(-180deg)' : 'rotate(0deg)'}`,
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
            onClick={handleSkillBannerClick}
            onTouchStart={handleSkillBannerClick}
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
