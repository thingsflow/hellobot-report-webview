import Image from 'next/image';
import * as React from 'react';
import { RelationReportModalContext } from '../page';
import { useParams, useRouter } from 'next/navigation';
import { t } from '@/utils/translate';
import useGetRelationReport from '@/apis/useGetRelationReport';

interface IRelationReportTitle {
  onKakaoTalkButtonClick: () => void;
}

const RelationReportTitle = ({
  onKakaoTalkButtonClick,
}: IRelationReportTitle) => {
  const router = useRouter();
  const params = useParams();

  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const createNewMoimButtonClick = () => {
    router.push('/relationreport/create/' + data?.skillSeq);
  };

  const { setEditMoimPopupInfo } = React.useContext(RelationReportModalContext);

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center mb-3">
        <h1 className="text-[22px] font-bold mr-1">{data?.title}</h1>
        <Image
          className="z-50 cursor-pointer"
          onClick={() =>
            setEditMoimPopupInfo({
              title: data?.title || '',
              isPrivate: data?.shareScope === 'PRIVATE' ? true : false,
            })
          }
          src="/images/icon-modify-small.svg"
          alt="Modify Icon"
          width={20}
          height={20}
        />
      </div>
      <div className="flex gap-[6px]">
        <div
          className="z-50 flex gap-1 px-4 py-2 text-xs text-gray-700 bg-white border border-gray-200 border-solid cursor-pointer text-normal rounded-3xl"
          onClick={onKakaoTalkButtonClick}
        >
          <Image
            src="/images/icons-08-button-icon-btn-more.svg"
            alt="Invite Icon"
            width={16}
            height={16}
          />
          <p className="pt-[1px]">
            {t('relationshipmap_screen_button_invite')}
          </p>
        </div>
        <div
          className="z-50 flex gap-1 px-4 py-2 text-xs text-gray-700 bg-white border border-gray-200 border-solid cursor-pointer text-normal rounded-3xl"
          onClick={createNewMoimButtonClick}
        >
          <Image
            src="/images/new.svg"
            alt="newboard Icon"
            width={16}
            height={16}
          />
          <p className="pt-[1px]">
            {t('relationshipmap_create_screen_button_create')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelationReportTitle;
