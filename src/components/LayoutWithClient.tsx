'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const LayoutWithClient = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const tokenInParam = searchParams.get('token');
  const platformInParam = searchParams.get('platform');
  const langInParam = searchParams.get('lang');
  const [currentToken, setCurrentToken] = React.useState('');

  React.useEffect(() => {
    const tokenInStorage = localStorage.getItem('token') as string | undefined;
    const platformInStorage = localStorage.getItem('platform');
    const langInStorage = localStorage.getItem('lang');
    setCurrentToken(tokenInStorage as string);

    // 쿼리 파라미터에 (token/platform/lang)이 있는지 검사. 있으면 localStorage 업데이트
    // 쿼리 파라미터에 (token/platform/lang)이 없는경우
    //   localStorage에 (token/platform/lang)이 없으면 에러

    if (tokenInParam) {
      setCurrentToken(tokenInParam);
      localStorage.setItem('token', tokenInParam);
    } else {
      if (!tokenInStorage) {
        console.error(
          '[Webview Error] token 정보가 유효하지 않습니다. token: ',
          tokenInParam,
        );
      }
    }

    if (platformInParam) {
      localStorage.setItem('platform', platformInParam);
    } else {
      if (!platformInStorage) {
        console.error(
          '[Webview Error] platform 정보가 유효하지 않습니다. platform: ',
          platformInParam,
        );
      }
    }

    if (langInParam) {
      localStorage.setItem('lang', langInParam);
    } else {
      if (!langInStorage) {
        console.error(
          '[Webview Error] lang 정보가 유효하지 않습니다. lang: ',
          langInParam,
        );
      }
    }
  }, [langInParam, platformInParam, tokenInParam, currentToken]);

  return <div className="w-full max-w-xl">{currentToken && children}</div>;
};

export default LayoutWithClient;
