export const STORAGE_KEY = {
  PLATFORM: 'platform',
  LANG: 'lang',
  TOKEN: 'token',
};

export const ERROR_CODE = {
  TOKEN_EXPIRED: 'CO004',
  GENERAL_ERROR: 'CO001',
  REPORT_PERMISSION_ERROR: 'RR003', // 관계도의 shareScope가 “PRIVATE” 일 때, 보고서의 owner가 아닌 다른 유저가 access할 경우 발생
};
