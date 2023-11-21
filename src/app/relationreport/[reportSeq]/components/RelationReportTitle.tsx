import Image from 'next/image';
import * as React from 'react';
import { RelationReportModalContext } from '../page';
import { useParams, useRouter } from 'next/navigation';
import { t } from '@/utils/translate';
import useGetRelationReport from '@/apis/useGetRelationReport';

const RelationReportTitle = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const { setInviteFriendsPopupOpen, setIsPreventSharePopupOpen } =
    React.useContext(RelationReportModalContext);

  const createNewMoimButtonClick = () => {
    router.push('/relationreport/create/' + data?.skillSeq);
  };

  const { setEditMoimPopupInfo } = React.useContext(RelationReportModalContext);

  const handleKakaoTalkButtonClick = () => {
    if (data?.shareScope === 'PRIVATE') {
      setIsPreventSharePopupOpen(true);
      return;
    }

    setInviteFriendsPopupOpen(true);
  };

  return (
    <div className="px-5 pt-6">
      <div className="flex item-center mb-3 gap-2">
        {data?.shareScope === 'PRIVATE' && (
          <Image
            src="/images/lock.svg"
            width={30}
            height={30}
            alt="Lock Icon"
          />
        )}
        <div>
          <div className="flex items-center ">
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
        </div>
      </div>
      <div className="flex gap-[6px]">
        <div
          className="z-50 flex gap-1 px-4 py-2 text-xs text-gray-700 bg-white border border-gray-200 border-solid cursor-pointer text-normal rounded-3xl"
          onClick={handleKakaoTalkButtonClick}
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
