'use client';
import * as React from 'react';
import CreateRelationReportHeader from './components/CreateRelationReportHeader';
import CreateRelationReportTitle from './components/CreateRelationReportTitle';
import Divider from '@/components/Divider';
import CreateRelationReportForm from './components/CreateRelationReportForm';
import { ToastContainer, toast } from 'react-toastify';

// 새로운 모임 만들기 페이지
const CreateRelationReportPage = () => {
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
