import React from 'react';
import Image from 'next/image';
import CommonPopup from '@/components/CommonPopup';
import shareWithKakao from '@/utils/shareWithKakao';
import { RelationReportModalContext } from '../../page';
import { copyToClipboard } from '@/utils';
import { toast } from 'react-toastify';
import { t } from '@/utils/translate';
import { useParams } from 'next/navigation';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { environment } from '../../../../../../environments/environment';

interface IInviteFriendsPopup {
  onClose: () => void;
}

const InviteFriendsPopup = ({ onClose }: IInviteFriendsPopup) => {
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { isInviteFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  const handleCopyLinkButtonClick = () => {
    copyToClipboard(
      environment.relationReportShareBaseUrl + `?relationSeq=${data?.seq}`,
    );
    toast(t('relationshipmap_invite_popup_toast_copied'));
  };

  const handleShareWithKakaoButtonClick = () => {
    shareWithKakao({
      title: data?.title,
      description: '뭐가 들어가야하지?',
      imageUrl: data?.imageUrl,
      shareUrl:
        environment.relationReportShareBaseUrl + `?relationSeq=${data?.seq}`,
    });
  };

  if (!isInviteFriendsPopupOpen) {
    return null;
  }

  return (
    <CommonPopup
      title={t('relationshipmap_screen_button_invite')}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <p className="text-[#7E8185] text-[14px]">
          {t('relationshipmap_invite_popup_description')}
        </p>
        <div>
          <div className="flex w-full mb-2">
            <div className="flex items-center h-12 p-2 overflow-hidden text-gray-600 rounded-l-lg bg-gray-50 basis-2/3 grow whitespace-nowrap">
              {environment.relationReportShareBaseUrl +
                `?relationSeq=${data?.seq}`}
            </div>
            <div
              className="cursor-pointer bg-gray-200 font-semibold rounded-r-lg rounded-sm w-[91px] text-gray-900 h-12 flex items-center justify-center"
              onClick={handleCopyLinkButtonClick}
            >
              {t('relationshipmap_invite_popup_button_copy')}
            </div>
          </div>
          <div
            className="cursor-pointer basis-1/3 flex gap-2 w-full bg-[#FEE500] h-[45px] justify-center items-center rounded-lg"
            onClick={handleShareWithKakaoButtonClick}
          >
            <div>
              <Image
                src="/images/kakao.svg"
                width={18}
                height={18}
                alt="Kakao Icon"
              />
            </div>
            <p className="rounded-[6px] font-semibold text-[15px] text-black/[.85]">
              {t('relationshipmap_invite_popup_button_kakao')}
            </p>
          </div>
        </div>
      </div>
    </CommonPopup>
  );
};

export default InviteFriendsPopup;
