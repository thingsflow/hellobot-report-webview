/* eslint-disable no-shadow */
import { ERROR_CODE, STORAGE_KEY } from '@/consts/common';
import { Arguments } from 'swr';

interface Arg {
  arg: Arguments; // assigned user requrst body
}

const fetcher = {
  get: (url: string) => {
    const requestFetch: (url: string) => Promise<any> = (url) => {
      const token = localStorage.getItem(STORAGE_KEY.TOKEN);
      const platform = localStorage.getItem(STORAGE_KEY.PLATFORM);

      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          Authorization: `user ${token}`,
          ...(platform === 'web' && { Os: 'web' }),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.error?.code === ERROR_CODE.TOKEN_EXPIRED) {
            // 토큰 만료 시 새로운 토큰으로 업데이트한 뒤 이전 요청 재시도한다.
            return fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/token`,
              {
                method: 'POST',
                mode: 'cors',
                headers: {
                  Authorization: `user ${token}`,
                  'Content-Type': 'application/json',
                },
              },
            )
              .then((res) => res.json())
              .then((tokenRes) => {
                localStorage.setItem(STORAGE_KEY.TOKEN, tokenRes.data.token);

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
      const token = localStorage.getItem(STORAGE_KEY.TOKEN);

      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
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
            return fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/token`,
              {
                method: 'POST',
                mode: 'cors',
                headers: {
                  Authorization: `user ${token}`,
                  'Content-Type': 'application/json',
                },
              },
            )
              .then((res) => res.json())
              .then((tokenRes) => {
                localStorage.setItem(STORAGE_KEY.TOKEN, tokenRes.data.token);

                return requestFetch(url, { arg });
              });
          }

          return res;
        });
    };

    return requestFetch(url, { arg });
  },
  patch: async (url: string, { arg }: Arg) => {
    const requestFetch: (url: string, arg: Arg) => Promise<any> = (
      url,
      { arg },
    ) => {
      const token = localStorage.getItem(STORAGE_KEY.TOKEN);

      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        method: 'PATCH',
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
            return (
              fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/token`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  Authorization: `user ${token}`,
                  'Content-Type': 'application/json',
                },
              })
                // eslint-disable-next-line no-shadow
                .then((res) => res.json())
                .then((tokenRes) => {
                  localStorage.setItem(STORAGE_KEY.TOKEN, tokenRes.data.token);

                  return requestFetch(url, { arg });
                })
            );
          }

          return res;
        });
    };

    return requestFetch(url, { arg });
  },
};

export default fetcher;
