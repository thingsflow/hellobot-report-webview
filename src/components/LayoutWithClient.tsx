'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { STORAGE_KEY } from '@/consts/common';

const LayoutWithClient = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const tokenInParam = searchParams.get('token');
  const platformInParam = searchParams.get('platform');
  const langInParam = searchParams.get('lang');
  const [currentToken, setCurrentToken] = React.useState('');

  React.useEffect(() => {
    const tokenInStorage = localStorage.getItem(STORAGE_KEY.TOKEN) as
      | string
      | undefined;
    const platformInStorage = localStorage.getItem(STORAGE_KEY.PLATFORM);
    const langInStorage = localStorage.getItem(STORAGE_KEY.LANG);
    setCurrentToken(tokenInStorage as string);

    // 쿼리 파라미터에 (token/platform/lang)이 있는지 검사. 있으면 localStorage 업데이트
    // 쿼리 파라미터에 (token/platform/lang)이 없는경우
    //   localStorage에 (token/platform/lang)이 없으면 에러

    if (tokenInParam) {
      setCurrentToken(tokenInParam);
      localStorage.setItem(STORAGE_KEY.TOKEN, tokenInParam);
    } else {
      if (!tokenInStorage) {
        console.error(
          '[Webview Error] token 정보가 유효하지 않습니다. token: ',
          tokenInParam,
        );
      }
    }

    if (platformInParam) {
      localStorage.setItem(STORAGE_KEY.PLATFORM, platformInParam);
    } else {
      if (!platformInStorage) {
        console.error(
          '[Webview Error] platform 정보가 유효하지 않습니다. platform: ',
          platformInParam,
        );
      }
    }

    if (langInParam) {
      localStorage.setItem(STORAGE_KEY.LANG, langInParam);
    } else {
      if (!langInStorage) {
        console.error(
          '[Webview Error] lang 정보가 유효하지 않습니다. lang: ',
          langInParam,
        );
      }
    }
  }, [langInParam, platformInParam, tokenInParam, currentToken]);

  React.useEffect(() => {
    // 카카오톡 sdk 초기화
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);

    // 반응형 vh값 설정
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`,
      );
    };

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', setVh);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return <div className="w-full max-w-xl">{currentToken && children}</div>;
};

export default LayoutWithClient;
