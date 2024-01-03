import { t } from './translate';

beforeEach(() => {
  localStorage.removeItem('lang');
});

describe('translate', () => {
  test('로컬스토리지에 언어 세팅값 없으면 한국어로 번역됨.', () => {
    expect(t('account_setting_screen_label_signout')).toBe('로그아웃');
  });

  test('파라미터 없는 한국어 번역', () => {
    localStorage.setItem('lang', 'ko');

    expect(t('account_setting_screen_label_signout')).toBe('로그아웃');
  });

  test('파라미터 없는 영어 번역', () => {
    localStorage.setItem('lang', 'en');

    expect(t('account_setting_screen_label_signout')).toBe('Log out');
  });

  test('파라미터 없는 일본어 번역', () => {
    localStorage.setItem('lang', 'ja');

    expect(t('account_setting_screen_label_signout')).toBe('ログアウト');
  });

  test('파라미터 있는 한국어 번역', () => {
    localStorage.setItem('lang', 'ko');

    expect(t('birthday_list_screen_icon_delete_alert', { value: '은빈' })).toBe(
      '은빈님의 생일 정보를 삭제하시겠습니까?',
    );
  });

  test('파라미터 있는 영어 번역', () => {
    localStorage.setItem('lang', 'en');

    expect(
      t('birthday_list_screen_icon_delete_alert', { value: 'eunbin' }),
    ).toBe(
      'Are you sure you want to delete the birthday information for eunbin?',
    );
  });

  test('파라미터 있는 일본어 번역', () => {
    localStorage.setItem('lang', 'ja');

    expect(
      t('birthday_list_screen_icon_delete_alert', { value: 'さつき' }),
    ).toBe('さつき の誕生日情報を削除してもよろしいですか？');
  });
});
