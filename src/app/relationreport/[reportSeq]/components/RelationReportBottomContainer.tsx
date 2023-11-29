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

const RelationReportBottomContainer = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  return (
    <motion.div
      className={`z-50 absolute top-0 w-full bg-white rounded-tl-2xl rounded-tr-2xl shadow-popup will-change-transform overflow-scroll h-[calc(100svh-100px)]`}
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
          onClick={() => setIsOpened((prev) => !prev)}
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
          onClick={() => {
            webview.goSkillDetailPage({ skillSeq: data?.skill?.seq });
          }}
        />
        {/* 바텀시트 컨텐츠 */}
        <RelationReportDetail />
        <Divider />
        <RelationReportShare />
        <Divider />
        <RelationReportFooter />
      </div>
    </motion.div>
  );
};

export default RelationReportBottomContainer;
