import { STORAGE_KEY } from '@/consts/common';
import { LANGUAGE_TYPE } from '@/types/common';

import Ko from '../../public/translation/ko.json';
import Ja from '../../public/translation/ja.json';
import En from '../../public/translation/en.json';

// json파일 내에 있는 키값으로 타입 생성.
type keyType = keyof typeof Ko & keyof typeof En & keyof typeof Ja;
const replaceTemplate = (
  template: string,
  values: { [key: string]: string },
): string => {
  return template.replace(/{{\s*([^{}\s]+)\s*}}/g, (match, key) => {
    // 객체에서 키에 해당하는 값을 찾아 반환합니다.
    // 해당 키가 없는 경우, 원래의 문자열을 반환합니다.
    return key in values ? values[key] : match;
  });
};

const translate = (key: keyType, arg?: { value?: any; value1?: any }) => {
  let currentLanguage: LANGUAGE_TYPE = 'ko';

  if (typeof window !== 'undefined') {
    const languageByStorage = localStorage.getItem(STORAGE_KEY.LANG) as
      | LANGUAGE_TYPE
      | undefined;
    currentLanguage = languageByStorage || 'ko';
  }

  const languageTextFile =
    currentLanguage === 'ja' ? Ja : currentLanguage === 'en' ? En : Ko;

  return arg
    ? replaceTemplate(languageTextFile[key].trim(), arg)
    : languageTextFile[key];
};

// eslint-disable-next-line import/prefer-default-export
export { translate as t };
