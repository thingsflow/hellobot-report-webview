'use client';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

interface IAuthContainer {
  children: React.ReactNode;
}

const AuthContainer = ({ children }: IAuthContainer) => {
  const searchParams = useSearchParams();
  const tokenInParam = searchParams.get('token');
  const platformInParam = searchParams.get('platform');
  const langInParam = searchParams.get('lang');

  React.useEffect(() => {
    // 쿼리 파라미터에서 정보 가져와서 로컬에 저장.
    // 쿼리에 없으면 로컬에서 가져와봄.
    // 로컬에도 없으면 에러 발생.
    const tokenInStorage = localStorage.getItem('token');
    const platformInStorage = localStorage.getItem('platform');
    const langInStorage = localStorage.getItem('lang');
    if (tokenInStorage && platformInStorage && langInStorage) return;

    if (tokenInParam) {
      localStorage.setItem('token', tokenInParam);
    } else {
      console.error(
        '[Webview Error] token 정보가 유효하지 않습니다. token: ',
        tokenInParam,
      );
    }

    if (platformInParam) {
      localStorage.setItem('platform', platformInParam);
    } else {
      console.error(
        '[Webview Error] platform 정보가 유효하지 않습니다. platform: ',
        platformInParam,
      );
    }

    if (langInParam) {
      localStorage.setItem('lang', langInParam);
    } else {
      console.error(
        '[Webview Error] lang 정보가 유효하지 않습니다. lang: ',
        langInParam,
      );
    }
  }, [tokenInParam, platformInParam, langInParam]);

  return <>{tokenInParam && platformInParam && langInParam && children}</>;
};

export default AuthContainer;
