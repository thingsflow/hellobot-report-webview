// 관계도 공유 url 뒤에 utm, title 등 파라미터를 추가하는 함수.

const addShareParamsForRelationReport = ({
  url,
  shareType,
  reportSeq,
  skillSeq,
  title,
}: {
  url?: string;
  shareType: 'kakaotalk' | 'copy' | 'native';
  reportSeq?: number;
  skillSeq?: number;
  title?: string;
}) => {
  const encodedTitle = encodeURIComponent(title || '');

  return `${url}?reportSeq=${reportSeq}&share=true&utm_source=${shareType}${
    reportSeq ? `&utm_term=${reportSeq}` : ''
  }${skillSeq ? `&utm_content=${skillSeq}` : ''}${
    title ? `&title=${encodedTitle}` : ''
  }`;
};

export default addShareParamsForRelationReport;
