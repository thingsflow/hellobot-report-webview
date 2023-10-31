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
  const platform = searchParams.get('platform');
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const requestAPI = async () => {
    setLoading(true);
    const data = await getData(token);
    setData(data);
    setLoading(false);
  };

  const sendEvent = ({ action, parameter }: any) => {
    // IOS
    console.log(
      'IOS인가요?',
      !!window.webkit?.messageHandlers?.hbReport?.postMessage,
    );
    if (window.webkit?.messageHandlers?.hbReport?.postMessage) {
      console.log(
        'window.webkit.messageHandlers.hbReport.postMessage의 인자로',
        {
          action,
          ...(parameter && { parameter }),
        },
        '을 넣어 호출하였습니다.',
      );
      window.webkit.messageHandlers.hbReport.postMessage({
        action,
        ...(parameter && { parameter }),
      });
      return;
    }

    // Web
    console.log('웹인가요?', !!window.parent);
    if (window.parent) {
      console.log(
        'window.webkit.messageHandlers.hbReport.postMessage의 인자로',
        {
          action,
          ...(parameter && { parameter }),
        },
        '을 넣어 호출하였습니다.',
      );
      window.parent.postMessage(
        {
          action,
          ...(parameter && { parameter }),
        },
        '*',
      );
      return;
    }

    // Android
    console.log('안드인가요우?', !!window.androidHellobotWebViewApi?.hbReport);
    if (window.androidHellobotWebViewApi?.hbReport) {
      console.log(
        'window.androidHellobotWebViewApi.hbReport의 인자로',
        {
          action,
          ...(parameter && { parameter }),
        },
        '을 넣어 호출하였습니다.',
      );
      window.androidHellobotWebViewApi.hbReport(
        JSON.stringify({
          action,
          ...(parameter && { parameter }),
        }),
      );
      return;
    }
  };

  return (
    <div>
      <h1>관계도 페이지</h1>
      api요청을 위한 데이터는 url의 쿼리 파라미터로 받을 예정이에요.
      <br />
      <br />
      {
        'https://report.dev.hellobot.co/relationship?lang={현재_시스템_언어}&token={유저_토큰}&platform={플랫폼_정보}'
      }
      <br />
      형태의 url로 요청을 보내주세용
      <br />
      <br />
      <strong>- 받은 데이터</strong>
      <br />
      token:{token} <br />
      lang: {lang} <br />
      platform: {platform}
      <br />
      <strong>- API 요청 테스트</strong>
      <br />
      전달해주신 토큰으로 요청 보내볼게여
      <br />
      <button onClick={requestAPI}>API 요청 보내기 버튼</button>
      <br />
      요청 결과(일부만 보여집니다):
      {loading ? '로딩중...' : JSON.stringify(data)?.slice(0, 500)}
      <br />
      <br />
      <strong>- 공유 버튼 테스트</strong>
      <br />
      <button onClick={() => sendEvent({ action: 'shareButtonClick', parameter: {
        shareLink: "https://hellobot.co/skills/33556", 
        shareTitle: "2024년 신년운세 보고서"
      } })}>
        공유 버튼
      </button>
      <br />
      - action: shareButtonClick
      <br />
      {'- parameter: { shareLink: "https://hellobot.co/skills/33556", shareTitle: "2024년 신년운세 보고서"}'}
      <br />
      <br />
      <strong>- 닫기 버튼 테스트</strong>
      <br />
      <button onClick={() => sendEvent({ action: 'closeButtonClick' })}>
        닫기 버튼
      </button>
      <br />
      - action: closeButtonClick
      <br />
      <br />
      <strong>- 스킬 배너 테스트</strong>
      <br />
      <button
        onClick={() =>
          sendEvent({
            action: 'skillBannerClick',
            parameter: {
              skillId: 2141,
            },
          })
        }
      >
        스킬 배너
      </button>
      <br />
      - action: skillBannerClick
      <br />
      {'- parameter: { skillId: 2141 }'}
      <br />
      <br />
      <strong>- 챗봇 배너 테스트</strong>
      <br />
      <button
        onClick={() =>
          sendEvent({
            action: 'chatBotBannerClick',
            parameter: {
              chatBotId: 'lamama-ko',
            },
          })
        }
      >
        챗봇 배너
      </button>
      <br />
      - action: chatBotBannerClick
      <br />
      {'- parameter: { chatBotId: lamama-ko}'}
    </div>
  );
};

export default TestData;
