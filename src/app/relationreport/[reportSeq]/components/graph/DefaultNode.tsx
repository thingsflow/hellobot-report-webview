import Image from 'next/image';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { t } from '@/utils';
import * as gaEvent from '@/utils/gaEvent';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { useParams, useSearchParams } from 'next/navigation';
import useGetPlayData from '@/apis/useGetPlayData';
import webview from '@/utils/webview';
import useGetUser from '@/apis/useGetUser';
import { useRelationReportContext } from '../../context';

const sourceHandleStyle: CSSProperties = {
  background: 'transparent',
  borderColor: 'transparent',
  right: '50%',
};
const targetHandleStyle: CSSProperties = {
  background: 'transparent',
  borderColor: 'transparent',
  left: '50%',
};

const DefaultNode: FC<NodeProps> = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const share = searchParams.get('isShare');

  const { setIsAddFriendsPopupOpen, setIsNoResultsToAddPopupOpen } =
    useRelationReportContext();
  const { data: relationReportData } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
    options: {
      revalidateOnMount: false,
    },
  });
  const { data: userData } = useGetUser({
    options: {
      revalidateOnMount: false,
    },
  });

  const { data } = useGetPlayData({
    fixedMenuSeq: String(relationReportData?.skill?.seq),
    reportSeq: params.reportSeq as string,
    options: {
      revalidateOnFocus: true,
    },
  });

  const handleNodeClick = () => {
    gaEvent.touchRelationAdd();

    const isKeepAnonymous = localStorage.getItem('isKeepAnonymous');
    if (
      userData?.type === 'anonymous' &&
      isKeepAnonymous !== 'true' &&
      share === 'true'
    ) {
      if (confirm(t('relationshipmap_popup_login_prompt'))) {
        webview.doLoginWithRedirectUrl({
          redireactUrl:
            process.env.NEXT_PUBLIC_SKILLSTORE_URL +
            `/relation-reports/diagram?reportSeq=${params.reportSeq}`,
        });
      } else {
        localStorage.setItem('isKeepAnonymous', 'true');
      }
    }

    setIsAddFriendsPopupOpen(true);
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={targetHandleStyle}
        isConnectableStart={false}
      />
      <div
        className="relative flex flex-col justify-center cursor-pointer"
        onClick={handleNodeClick}
      >
        <div className="flex items-center justify-center xs:w-[70px] xs:h-[70px] w-[60px] h-[60px] bg-yellow-400 rounded-full">
          <Image
            className="flex-shrink-0"
            src="/images/icon-plus-40.svg"
            alt="Plus Icon"
            width={24}
            height={24}
          />
        </div>
        <div className="flex w-[100px] absolute bottom-[-27px] absolute-center ml-[7px] justify-center items-center">
          <div className="inline-block text-gray-900 font-bold text-[14px] pt-[1px]">
            {t('relationshipmap_screen_button_add')}
          </div>
          <Image
            className="inline-block w-4 h-4 "
            src="/images/arrow-right.svg"
            alt="Arrow Icon"
            width={16}
            height={16}
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={sourceHandleStyle}
        isConnectableStart={false}
      />
    </>
  );
};

export default memo(DefaultNode);
