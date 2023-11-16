import useGetRelationReport from '@/apis/useGetRelationReport';
import { RELATION_REPORT_NODE_COLORS } from '@/consts/common';
import { t } from '@/utils/translate';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';

const INITIAL_MAX_ITEM_LENGTH = 5;

const RelationReportDetail = () => {
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const [showAll, setShowAll] = React.useState(false);
  const itemsToShow = showAll
    ? data?.edges
    : data?.edges?.slice(0, INITIAL_MAX_ITEM_LENGTH);

  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <div className="flex flex-col px-6 ">
      {data &&
        itemsToShow?.map((item) => {
          const sourceIndex =
            data.playDatas?.findIndex(
              (playData) => playData.seq === item.source,
            ) || 0;
          const sourceItem = data.playDatas && data.playDatas[sourceIndex];
          const targetIndex =
            data.playDatas?.findIndex(
              (playData) => playData.seq === item.target,
            ) || 0;
          const targetItem = data.playDatas && data.playDatas[targetIndex];

          return (
            <>
              <div className="pt-[52px] pb-10 border-b border-solid border-gray-200">
                <div className="flex justify-center">
                  <div className="relative">
                    <div
                      className={`${RELATION_REPORT_NODE_COLORS[sourceIndex]} flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
                    >
                      {sourceItem?.name}
                    </div>
                    <div className="flex absolute w-[70px] top-[70px] absolute-center justify-center">
                      <div className="text-gray-600 text-[13px] pt-[1px] line-clamp-2">
                        {sourceItem?.resultName}
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
                      className={`${RELATION_REPORT_NODE_COLORS[targetIndex]} flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
                    >
                      {targetItem?.name}
                    </div>
                    <div className="flex absolute w-[70px] top-[70px] absolute-center justify-center">
                      <div className="text-gray-600 text-[13px] pt-[1px] line-clamp-2">
                        {targetItem?.resultName}
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="mt-[60px] text-lg font-bold text-gray-900 text-center">
                  {item.label}
                </h5>
                <p className="mt-4 text-gray-900">{item.detail}</p>
              </div>
            </>
          );
        })}
      {!showAll &&
        data?.edges &&
        data.edges.length > INITIAL_MAX_ITEM_LENGTH && (
          <div
            className="cursor-pointer my-4 flex gap-[10px] text-gray-800 items-center justify-center w-full h-12 border border-solid border-gray-300 rounded-[6px] bg-white"
            onClick={handleShowMore}
          >
            <button onClick={handleShowMore}>{t('common_button_more')}</button>
            <Image
              src="/images/button-lg-btn-arrow-down.svg"
              width={16}
              height={16}
              alt="Arrow Down Icon"
            />
          </div>
        )}
    </div>
  );
};

export default RelationReportDetail;
