import { environment } from '../../environments/environment';

const initializeKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(environment.kakaoAppJsKey);
      shareWithKakao()
      return;
    }
  }
}

const shareWithKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(environment.kakaoAppJsKey);
      shareWithKakao()
      return;
    }

    kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: 'feed',
      content: {
        title: '2023 관계도',
        description: '관계도 설명~~~어쩌구 저쩌구',
        imageUrl:
          'https://github.com/thingsflow/hellobot-report-webview/assets/116791055/36d4b1cf-d3ef-45a9-b6d4-cd9bea0ca390',
        imageWidth: 1200,
        imageHeight: 1200,
        link: {
          mobileWebUrl: 'http://localhost:4400/',
          webUrl: 'http://localhost:4400/',
        },
      },
      buttons: [
        {
          title: '내 결과 보러가기',
          link: {
            mobileWebUrl: 'http://localhost:4400/',
            webUrl: 'http://localhost:4400/',
          },
        },
      ],
    });
  }
};

export default shareWithKakao;
