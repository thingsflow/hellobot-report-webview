import useGetRelationReport from '@/apis/useGetRelationReport';
import { t } from '@/utils/translate';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';

// 외부 파일에서 불러오면 적용되지 않는 이슈가 있음
export const RELATION_REPORT_NODE_COLORS = [
  'bg-[#20DB93]',
  'bg-[#818CF8]',
  'bg-[#38BDF8]',
  'bg-[#FF5D7A]',
  'bg-[#F59E0B]',
  'bg-[#3B82F6]',
  'bg-[#7C42FF]',
  'bg-[#0DA4C9]',
  'bg-[#FF90CA]',
  'bg-[#0EA5E9]',
  'bg-[#BE7AFE]',
  'bg-[#E38A38]',
  'bg-[#10B981]',
  'bg-[#5B5FFF]',
  'bg-[#DD3588]',
  'bg-[#06C8D4]',
  'bg-[#0E7490]',
  'bg-[#EF4444]',
  'bg-[#7AB6FF]',
  'bg-[#3D41CD]',
];

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
        // 최초 생성자 한 명만 들어있는경우 디폴트 설명 노출
        (data.playDatas?.length === 1 ? (
          <>
            <div
              className="pt-[52px] pb-10 border-b border-solid border-gray-200"
              key={`${data.playDatas[0].seq}`}
            >
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`${RELATION_REPORT_NODE_COLORS[0]} flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
                  >
                    {data.playDatas[0]?.name}
                  </div>
                  <div className="flex w-[110px] justify-center text-center">
                    <div className="text-gray-600 text-[13px] line-clamp-2">
                      {data.playDatas[0]?.resultName}
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
                <div className="flex flex-col items-center">
                  <div
                    className={`bg-gray-900 flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
                  >
                    ?
                  </div>
                  <div className="flex absolute-center justify-center">
                    <div className="text-gray-600 text-[13px] pt-[1px] line-clamp-2">
                      -
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-20 text-gray-500">
                {t('relationshipmap_screen_description_alone')}
              </p>
            </div>
          </>
        ) : (
          <>
            {itemsToShow?.map((item, index) => {
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
                <div
                  className="pt-[52px] pb-10 border-b border-solid border-gray-200"
                  key={`${item.detail}${item.source}${index}`}
                >
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`${RELATION_REPORT_NODE_COLORS[sourceIndex]} flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
                      >
                        {sourceItem?.name}
                      </div>
                      <div className="flex w-[110px] justify-center text-center">
                        <div className="text-gray-600 text-[13px] pt-[10px] line-clamp-2">
                          {sourceItem?.resultName}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-[74px]">
                      <Image
                        className="absolute top-[px]"
                        src="/images/double-arrow.svg"
                        width={74}
                        height={74}
                        alt="double arrow"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`${RELATION_REPORT_NODE_COLORS[targetIndex]} flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
                      >
                        {targetItem?.name}
                      </div>
                      <div className="flex w-[110px] justify-center text-center">
                        <div className="text-gray-600 text-[13px] pt-[10px] line-clamp-2">
                          {targetItem?.resultName}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="mt-[25px] text-lg font-bold text-gray-900 text-center">
                    {item.label}
                  </h5>
                  <p className="mt-4 text-gray-900 whitespace-pre-line">
                    {item.detail?.split('\\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              );
            })}
          </>
        ))}
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
