'use client';
import Webview from '@/utils/webview';
import Image from 'next/image';
import * as React from 'react';

const data = [
    {
      id: 1,
      name: '수지',
      result: '병오일주',
      isAdded: true,
    },
    {
      id: 2,
      name: '현아',
      result: '병오일주',
      isAdded: true,
    },
    {
      id: 3,
      name: 'Daniel Lee',
      result: '결과가 긴 결과아하하 이게 뭔말이야 나도 몰라 하하하ㅏ',
      isAdded: false,
    },
    {
      id: 4,
      name: '써네쨩',
      result: '병오일주',
      isAdded: false,
    },
    {
      id: 5,
      name: '써네쨩',
      result: '병오일주',
      isAdded: false,
    },
    {
      id: 6,
      name: '써네쨩',
      result: '병오일주',
      isAdded: false,
    },
    {
      id: 7,
      name: '써네쨩',
      result: '병오일주',
      isAdded: false,
    },
    {
      id: 8,
      name: '써네쨩',
      result: '병오일주',
      isAdded: false,
    },
    {
        id: 6,
        name: '써네쨩',
        result: '병오일주',
        isAdded: false,
      },
      {
        id: 7,
        name: '써네쨩',
        result: '병오일주',
        isAdded: false,
      },
      {
        id: 8,
        name: '써네쨩',
        result: '병오일주',
        isAdded: false,
      },
      {
        id: 6,
        name: '써네쨩',
        result: '병오일주',
        isAdded: false,
      },
      {
        id: 7,
        name: '써네쨩',
        result: '병오일주',
        isAdded: false,
      },
      {
        id: 8,
        name: '써네쨩',
        result: '병오일주',
        isAdded: false,
      },
      {
          id: 6,
          name: '써네쨩',
          result: '병오일주',
          isAdded: false,
        },
        {
          id: 7,
          name: '써네쨩',
          result: '병오일주',
          isAdded: false,
        },
        {
          id: 8,
          name: '써네쨩',
          result: '병오일주',
          isAdded: false,
        },
  ];
  const emptyData: [] = [];
  
  const mockData: any[] | [] = data;

  
const CreateRelationReportMemberList = () => {
  const handleBackButtonClick = () => {
    Webview.closeButtonClick();
  };

  return (
    <div className="flex flex-col w-full">
    {mockData.map((item) => {
      return (
        <div className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid px-5 py-3" key={item.id}>
          <div className="flex flex-col">
            <div className="text-gray-900 font-medium">{item.name}</div>
            <div className="text-gray-600 text-[13px] line-clamp-1">
              {item.result}
            </div>
          </div>
          <div className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold">
            선택
        </div>
        </div>
      );
    })}
  </div>
  );
};

export default CreateRelationReportMemberList;
