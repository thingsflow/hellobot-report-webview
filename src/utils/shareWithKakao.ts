import { t } from './translate';

const shareWithKakao = ({
  title,
  description,
  imageUrl,
  shareUrl,
}: {
  title?: string;
  description?: string;
  imageUrl?: string;
  shareUrl?: string;
}) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY);
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        imageWidth: 1200,
        imageHeight: 1200,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: t('result_detail_button_my_result'),
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  }
};

export default shareWithKakao;
