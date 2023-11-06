'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';

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
  const platform = searchParams.get('platform') as
    | 'ios'
    | 'web'
    | 'android'
    | null;
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
    if (platform === 'ios') {
      if (window?.webkit?.messageHandlers?.hbReport?.postMessage) {
        console.log(
          'window.webkit.messageHandlers.hbReport.postMessage의 인자로',
          {
            action,
            ...(parameter && { parameter }),
            version: '1.1.0',
          },
          '을 넣어 호출하였습니다.',
        );

        window.webkit.messageHandlers.hbReport.postMessage({
          action,
          ...(parameter && { parameter }),
        });
        return;
      }
    }

    // Android
    console.log('안드인가요우?', !!window.androidHellobotWebViewApi?.hbReport);
    if (window.androidHellobotWebViewApi?.hbReport) {
      console.log(
        'window.androidHellobotWebViewApi.hbReport의 인자로',
        {
          action,
          ...(parameter && { parameter }),
          version: '1.1.0',
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

    // Web
    console.log('웹인가요?', !!window.parent);
    if (window.parent) {
      console.log('window.parent.postMessage의 인자로', {
        action,
        ...(parameter && { parameter }),
        version: '1.1.0',
      });

      window.parent.postMessage(
        {
          action,
          ...(parameter && { parameter }),
        },
        '*',
      );
    }
    return;
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
      <hr />
      <br />
      <strong>- 받은 데이터</strong>
      <br />
      token:{token} <br />
      lang: {lang} <br />
      platform: {platform}
      <br />
      <hr />
      <br />
      <strong>- API 요청 테스트</strong>
      <br />
      전달해주신 토큰으로 요청 보내볼게여
      <br />
      <button
        onClick={requestAPI}
        className="border border-black border-solid rounded-medium p-1"
      >
        API 요청 보내기 버튼
      </button>
      <br />
      요청 결과(일부만 보여집니다):
      {loading ? '로딩중...' : JSON.stringify(data)?.slice(0, 500)}
      <br />
      <br />
      <hr />
      <br />
      <strong>- 공유 기능 테스트</strong>
      <br />
      <button
        onClick={() =>
          sendEvent({
            action: 'doShare',
            parameter: {
              shareLink: 'https://hellobot.co/skills/33556',
              shareTitle: '2024년 신년운세 보고서',
            },
          })
        }
        className="border border-black border-solid rounded-medium p-1"
      >
        보내기
      </button>
      <br />
      - action: doShare
      <br />
      {
        '- parameter: { shareLink: "https://hellobot.co/skills/33556", shareTitle: "2024년 신년운세 보고서"}'
      }
      <br />
      <br />
      <hr />
      <br />
      <strong>- 닫기 기능 테스트</strong>
      <br />
      <button
        className="border border-black border-solid rounded-medium p-1"
        onClick={() => sendEvent({ action: 'goBack' })}
      >
        액션 보내기
      </button>
      <br />
      - action: goBack
      <br />
      <br />
      <hr />
      <br />
      <strong>- 스킬 상세페이지로 이동 테스트</strong>
      <br />
      <button
        onClick={() =>
          sendEvent({
            action: 'goSkillDetailPage',
            parameter: {
              skillId: 2141,
            },
          })
        }
        className="border border-black border-solid rounded-medium p-1"
      >
        보내기
      </button>
      <br />
      - action: goSkillDetailPage
      <br />
      {'- parameter: { skillId: 2141 }'}
      <br />
      <br />
      <hr />
      <br />
      <strong>- 챗봇 상세페이지로 이동 테스트</strong>
      <br />
      <button
        className="border border-black border-solid rounded-medium p-1"
        onClick={() =>
          sendEvent({
            action: 'goChatBotDetailPage',
            parameter: {
              chatBotId: 'lamama-ko',
            },
          })
        }
      >
        보내기
      </button>
      <br />
      - action: goChatBotDetailPage
      <br />
      {'- parameter: { chatBotId: lamama-ko}'}
      <br />
      <br />
      <hr />
      <br />
      <strong>- 관계도 리스트로 이동 테스트</strong>
      <br />
      <button
        className="border border-black border-solid rounded-medium p-1"
        onClick={() =>
          sendEvent({
            action: 'goRelationReportListPage',
          })
        }
      >
        보내기
      </button>
      <br />
      - action: goRelationReportListPage
      <br />
      <br />
      <hr />
      <br />
      <strong>- 채팅방 페이지로 이동 테스트</strong>
      <br />
      <button
        className="border border-black border-solid rounded-medium p-1"
        onClick={() =>
          sendEvent({
            action: 'goChatRoomPage',
            parameter: {
              chatRoomId: 52,
            },
          })
        }
      >
        보내기
      </button>
      <br />
      - action: goChatRoomPage
      <br />
      {'- parameter: { chatRoomId: 52 }'}
    </div>
  );
};

export default TestData;
