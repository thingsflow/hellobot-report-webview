
'use client';
import * as React from 'react';
import CreateRelationReportHeader from './components/CreateRelationReportHeader';
import CreateRelationReportMemberList from './components/CreateRelationReportMemberList';

const CreateRelationReportPage = () => {
  return (
    <div className="bg-white">
      <CreateRelationReportHeader/>
      <CreateRelationReportMemberList/>
    </div> 
  );
};

export default CreateRelationReportPage;
