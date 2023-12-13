'use client';
import React, { useEffect } from 'react';
import Portal from './Portal';
import Image from 'next/image';

interface ICommonPopup {
  title?: string;
  onClose?: () => void;
  children: JSX.Element[] | JSX.Element;
  width?: number;
  isPadding?: boolean;
}

const CommonPopup = ({
  title,
  onClose,
  children,
  width = 343,
  isPadding = true,
}: ICommonPopup) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const contentClassName = isPadding
    ? 'relative px-5 pt-[88px] pb-8'
    : 'relative pt-[88px] pb-8';

  return (
    <Portal>
      <div className="fixed top-0 left-0 w-full min-h-[calc(var(--vh)*100)] bg-gray-900 opacity-60" />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-popup rounded-[20px]"
        style={{ width }}
      >
        <div className={contentClassName}>
          <h1 className="w-4/5 absolute top-8 right-1/2 translate-x-1/2 text-gray-900 text-[22px] font-bold mb-[24px] flex items-center justify-center whitespace-pre-wrap text-center">
            {title}
          </h1>
          {onClose && (
            <Image
              onClick={onClose}
              className="absolute top-4 right-4 cursor-pointer"
              src="/images/buttons-btn-modal-close.svg"
              width={24}
              height={24}
              alt="Close Icon"
            />
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default CommonPopup;
