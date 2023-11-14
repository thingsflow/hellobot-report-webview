import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import { RelationReportModalContext } from '../../page';
import Image from 'next/image';
import Toggle from '@/components/Toggle';
import useUpdateRelationReport from '@/apis/useUpdateRelationReport';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';

const EditMoimPopup = () => {
  const params = useParams();
  const { editMoimPopupInfo, setEditMoimPopupInfo } = React.useContext(
    RelationReportModalContext,
  );
  const { trigger, loading } = useUpdateRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const [title, setTitle] = React.useState<string>(
    editMoimPopupInfo?.title || '',
  );
  const [isPrivate, setIsPrivate] = React.useState(
    !!editMoimPopupInfo?.isPrivate,
  );

  const handleCloseButtonClick = () => {
    setEditMoimPopupInfo(null);
  };

  const handleConfirmButtonClick = async () => {
    await trigger({
      title,
      shareScope: isPrivate ? 'PRIVATE' : 'PUBLIC',
    });

    setEditMoimPopupInfo(null);
  };

  return (
    <>
      <CommonPopup title={'모임 수정'} onClose={handleCloseButtonClick}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[9px]">
            <p className="text-[#7E8185] text-xs font-normal">모임 이름</p>
            <div className="relative">
              <input
                type="text"
                className="w-full h-12 bg-[#f5f5f5] rounded-lg text=[#242526] px-4 py-3 pr-11"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Image
                className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 bg-[#f5f5f5]"
                src="/images/btn-input-clear.svg"
                width={24}
                height={24}
                alt="Clear Icon"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[9px]">
            <p className="text-[#7E8185] text-xs font-normal">공개 여부</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center h-12">
                <Image
                  src="/images/coaching-lock.svg"
                  width={24}
                  height={24}
                  alt="Lock Icon"
                />
                <p className="text=[#242526]">이 관계도 나만보기</p>
              </div>
              <Toggle
                isOn={isPrivate}
                onToggle={() => setIsPrivate((prev) => !prev)}
              />
            </div>
          </div>
          <div
            className="cursor-pointer bg-[#FFE967] w-full flex items-center justify-center font-bold text-[#242526] h-12 rounded-3xl"
            onClick={handleConfirmButtonClick}
          >
            확인
          </div>
        </div>
      </CommonPopup>
      {loading && <Loading />}
    </>
  );
};

export default EditMoimPopup;
