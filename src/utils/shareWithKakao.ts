import { environment } from '../../environments/environment';
import { t } from './translate';

const shareWithKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(environment.kakaoAppJsKey);
    }

    kakao.Link.sendDefault({
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
          title: t('result_detail_button_my_result'),
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
