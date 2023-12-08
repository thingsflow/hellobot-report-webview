import Image from 'next/image';
import * as React from 'react';
import { RelationReportModalContext } from '../page';
import { useParams, useRouter } from 'next/navigation';
import { t } from '@/utils/translate';
import useGetRelationReport from '@/apis/useGetRelationReport';
import * as gaEvent from '@/utils/gaEvent';
import useGetPlayData from '@/apis/useGetPlayData';
import webview from '@/utils/webview';

const RelationReportTitle = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { data: userPlayData } = useGetPlayData({
    fixedMenuSeq: String(data?.skill?.seq),
    reportSeq: params.reportSeq as string,
    options: {
      revalidateOnFocus: true,
    },
  });

  const { setInviteFriendsPopupOpen, setIsPreventSharePopupOpen } =
    React.useContext(RelationReportModalContext);

  const createNewMoimButtonClick = () => {
    gaEvent.touchRelationCreateNew({
      menuName: data?.skill?.name,
      menuSeq: data?.skillSeq,
    });

    if (!userPlayData.playDatas?.length) {
      webview.goSkillDetailPage({
        skillSeq: data?.skill?.seq,
      });
      return;
    }

    router.push('/relationreport/create/' + data?.skillSeq);
  };

  const { setEditMoimPopupInfo } = React.useContext(RelationReportModalContext);

  const handleKakaoTalkButtonClick = () => {
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
            <div className=" inline-flex ">
              <span className="text-[22px] font-bold mr-1 leading-7">
                {data?.title}
                {data?.isViewerOwner && (
                  <Image
                    className="z-50 cursor-pointer inline  "
                    style={{ transform: 'translateY(2px)' }}
                    onClick={() =>
                      setEditMoimPopupInfo({
                        title: data?.title || '',
                        isPrivate:
                          data?.shareScope === 'PRIVATE' ? true : false,
                      })
                    }
                    src="/images/icon-modify-small.svg"
                    alt="Modify Icon"
                    width={20}
                    height={20}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[6px]">
        {data?.shareScope === 'PUBLIC' && (
          <div
            className="z-50 flex gap-1 px-4 py-2 text-[14px] text-gray-700 bg-white border border-gray-200 border-solid cursor-pointer text-normal rounded-3xl"
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
        )}
        <div
          className="z-50 flex gap-1 px-4 py-2 text-[14px] text-gray-700 bg-white border border-gray-200 border-solid cursor-pointer text-normal rounded-3xl"
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
