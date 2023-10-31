import React, { useEffect } from 'react';
import Portal from './Portal';
import Image from 'next/image';

interface ICommonPopup {
  title?: string;
  onClose?: () => void;
  children: JSX.Element[] | JSX.Element;
}

const CommonPopup = ({ title, onClose, children }: ICommonPopup) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Portal>
      <div className="fixed top-0 left-0 w-full min-h-full bg-gray-900 opacity-60" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[343px] shadow-popup rounded-[20px]">
        <div className="relative px-5 pt-[82px] pb-6">
          <h1 className="absolute top-8 right-1/2 translate-x-1/2 text-gray-900 text-[22px] font-bold mb-6">
            {title}
          </h1>
          <Image
            className="absolute top-4 right-4 cursor-pointer"
            src="/images/buttons-btn-modal-close.svg"
            width={24}
            height={24}
            alt="Close Icon"
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};

// const backDrop = css`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   min-height: 100%;
//   background: ${theme.colors.gray900};
//   opacity: 0.6;
//   overflow: hidden;
//   z-index: 20;
// `;

// const container = css`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   width: 19.5rem;
//   transform: translate(-50%, -50%);
//   padding: 1.5em 1.25em 1.5em;
//   background: ${theme.colors.white};
//   border-radius: 0.75em;
//   max-width: 20.9375em;
//   z-index: 29;

//   .popup-wrapper {
//     position: relative;
//     margin: auto;

//     .title {
//       font: ${theme.font.title1};
//       color: ${theme.colors.gray900};
//     }

//     .title.center {
//       text-align: center;
//     }

//     .close-button {
//       position: absolute;
//       width: 24px;
//       height: 24px;
//       top: 0;
//       right: 0;
//       background: none;
//       cursor: pointer;
//     }
//   }

//   .popup-wrapper.center {
//     text-align: center;
//   }

//   @media (max-width: ${theme.devices.mobile}) {
//     width: 100%;
//   }
// `;

export default CommonPopup;
