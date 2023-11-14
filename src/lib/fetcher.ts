import { environment } from '../../environments/environment';
import { Arguments } from 'swr';

const ERROR_CODE = {
  TOKEN_EXPIRED: 'CO004',
};

interface Arg {
  arg: Arguments; // assigned user requrst body
}

const parseJsonSafely = (text: string, jsonParser = JSON.parse) => {
  try {
    return jsonParser(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e;
    }

    return text.trim();
  }
};

export const fetcher = {
  get: (url: string) => {
    const requestFetch: (url: string) => Promise<any> = (url) => {
      const token = localStorage.getItem('token');
      const platform = localStorage.getItem('platform');

      return fetch(`${environment.apiBaseUrl}${url}`, {
        method: 'GET',
        headers: {
          Authorization: `user ${token}`,
          ...(platform === 'platform' && { Os: 'web' }),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.error?.code === ERROR_CODE.TOKEN_EXPIRED) {
            // 토큰 만료 시 새로운 토큰으로 업데이트한 뒤 이전 요청 재시도한다.
            return fetch(`${environment.apiBaseUrl}/api/users/token`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                Authorization: `user ${token}`,
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((tokenRes) => {
                localStorage.setItem('token', tokenRes.data.token);

                return requestFetch(url);
              });
          }

          return res;
        });
    };

    return requestFetch(url);
  },
  post: async (url: string, { arg }: Arg) => {
    const requestFetch: (url: string, arg: Arg) => Promise<any> = (
      url,
      { arg },
    ) => {
      const token = localStorage.getItem('token');

      return fetch(`${environment.apiBaseUrl}${url}`, {
        method: 'POST',
        body: JSON.stringify(arg),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `user ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.error?.code === ERROR_CODE.TOKEN_EXPIRED) {
            // 토큰 만료 시 새로운 토큰으로 업데이트한 뒤 이전 요청 재시도한다.
            return fetch(`${environment.apiBaseUrl}/api/users/token`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                Authorization: `user ${token}`,
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((tokenRes) => {
                localStorage.setItem('token', tokenRes.data.token);

                return requestFetch(url, { arg });
              });
          }

          return res;
        });
    };

    return requestFetch(url, { arg });
  },
};
