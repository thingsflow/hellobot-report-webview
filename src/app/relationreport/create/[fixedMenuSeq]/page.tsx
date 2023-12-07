'use client';
import * as React from 'react';
import CreateRelationReportHeader from './components/CreateRelationReportHeader';
import CreateRelationReportTitle from './components/CreateRelationReportTitle';
import Divider from '@/components/Divider';
import CreateRelationReportForm from './components/CreateRelationReportForm';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import useGetPlayData from '@/apis/useGetPlayData';
import * as gaEvent from '@/utils/gaEvent';

// 새로운 모임 만들기 페이지
const CreateRelationReportPage = () => {
  const params = useParams();
  const { data } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
    options: {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  });
  const isEventLoggedRef = React.useRef(false);

  React.useEffect(() => {
    if (data?.skill?.seq && isEventLoggedRef.current === false) {
      isEventLoggedRef.current = true;
      gaEvent.viewRelationCreateNew({
        menuSeq: data.skill?.seq,
        menuName: data.skill?.name,
      });
    }
  }, [data.skill?.seq]);

  return (
    <div className="bg-white h-[calc(var(--vh)*100)]">
      <CreateRelationReportHeader />
      <div className="pt-[44px]">
        <CreateRelationReportTitle />
        <Divider color="gray" />
        <CreateRelationReportForm />
      </div>
      {
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          icon={false}
          hideProgressBar={true}
          pauseOnHover={false}
          draggable={false}
          closeButton={false}
          className="toast-black"
          limit={1}
          autoClose={3000}
          enableMultiContainer={false}
        />
      }
    </div>
  );
};

export default CreateRelationReportPage;
