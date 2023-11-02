'use client';
import * as React from 'react';
import CreateRelationReportHeader from './components/CreateRelationReportHeader';
import CreateRelationReportTitle from './components/CreateRelationReportTitle';
import Divider from '@/components/Divider';
import CreateRelationReportForm from './components/CreateRelationReportForm';

// 새로운 모임 만들기 페이지
const CreateRelationReportPage = () => {
  return (
    <div className="bg-white">
      <CreateRelationReportHeader />
      <CreateRelationReportTitle />
      <Divider color="gray" />
      <CreateRelationReportForm />
    </div>
  );
};

export default CreateRelationReportPage;
