'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

async function getData(token?: string | null) {
  const res = await fetch('https://dev-api.hellobot.co/v1/chatbots/27', {
    method: 'GET',
    headers: {
      Authorization: `user ${token}`,
    },
  });

  return res.json();
}

const TestData = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const lang = searchParams.get('lang');
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const requestAPI = async () => {
    setLoading(true);
    const data = await getData(token);
    setData(data);
    setLoading(false);
  };

  const handleCloseButtonClick = () => {
    // IOS
    if (window.webkit?.messageHandlers?.hbReport?.postMessage) {
      window.webkit.messageHandlers.hbReport.postMessage({
        action: 'closeButtonClick',
      });
    }

    // Web
    if (window.parent) {
      window.parent.postMessage(
        {
          action: 'closeButtonClick',
        },
        '*',
      );
    }

    // Android
    if (window.androidHellobotWebViewApi?.hbReport) {
      window.androidHellobotWebViewApi.hbReport(
        JSON.stringify({
          action: 'closeButtonClick',
        }),
      );
    }
  };

  return (
    <div>
      <h1>관계도 페이지</h1>
      api요청을 위한 데이터는 url의 쿼리 파라미터로 받을 예정이에요.
      <br />
      <br />
      {
        'https://report.dev.hellobot.co/relationship?lang={현재_시스템_언어}&token={유저_토큰}'
      }
      <br />
      형태의 url로 요청을 보내주세용
      <br />
      <br />
      <strong>- 받은 데이터</strong>
      <br />
      token:{token} <br />
      lang: {lang} <br />
      <br />
      <strong>- API 요청 테스트</strong>
      <br />
      <button onClick={requestAPI}>API 요청 보내기 버튼</button>
      <br />
      요청 결과(일부만 보여집니다):
      {loading ? '로딩중...' : JSON.stringify(data)?.slice(0, 500)}
      <br />
      <br />
      <strong>- 닫기 버튼 테스트</strong>
      <br />
      <button onClick={handleCloseButtonClick}>닫기 버튼</button>
      <br />
      닫기버튼을 누르면 closeButtonClick이라는 액션이 전달됩니다.
      <br />
      <br />
      <strong>- 친구 추가 페이지로 이동 버튼 테스트</strong>
      <br />
      <Link href="/addfriends">친구추가 페이지로 이동 버튼</Link>
    </div>
  );
};

export default TestData;
