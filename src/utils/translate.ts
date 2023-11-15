import { STORAGE_KEY } from '@/consts/common';
import { LANGUAGE_TYPE } from '@/types/common';

import Ko from '../../public/translation/ko.json';
import Ja from '../../public/translation/ko.json';
import En from '../../public/translation/en.json';

// json파일 내에 있는 키값으로 타입 생성.
type keyType = keyof typeof Ko & keyof typeof En & keyof typeof Ja;

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

  return languageTextFile[key]
    .trim()
    .replace('{{value}}', arg?.value || '')
    .replace('{{value1}}', arg?.value1 || '');
};

export { translate as t };
