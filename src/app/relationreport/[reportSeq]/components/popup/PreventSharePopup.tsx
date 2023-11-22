import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import { RelationReportModalContext } from '../../page';
import { t } from '@/utils/translate';

interface IInviteFriendsPopup {
  onClose: () => void;
}

const PreventSharePopup = ({ onClose }: IInviteFriendsPopup) => {
  const { isPreventSharePopupOpen, setIsPreventSharePopupOpen } =
    React.useContext(RelationReportModalContext);

  if (!isPreventSharePopupOpen) {
    return null;
  }

  return (
    <CommonPopup
      title={t('relationshipmap_share_popup_title')}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2 pt-9">
        <div className="bg-[#FF5D7A]/[0.08] text-[#FF5D7A] w-full px-4 py-1 flex items-center h-[34px]">
          <p className="text-[14px]">
            {t('relationshipmap_share_popup_description_status')}
          </p>
        </div>
        <p className="text-[#7E8185]">
          {t('relationshipmap_share_popup_description')}
        </p>
        <div
          className="w-full flex item-center justify-center pt-4 cursor-pointer"
          onClick={() => setIsPreventSharePopupOpen(false)}
        >
          <div className="w-[98px] h-[48px] bg-[#FFE967] flex items-center justify-center rounded-[26px]">
            <p className="font-bold text-[#242526]">{t('common_label_ok')}</p>
          </div>
        </div>
      </div>
    </CommonPopup>
  );
};

export default PreventSharePopup;
