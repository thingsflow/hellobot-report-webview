import { environment } from '../../environments/environment';
import { Arguments } from 'swr';

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
    const token = localStorage.getItem('token');

    return fetch(`${environment.apiBaseUrl}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `user ${token}`,
      },
    }).then((res) => res.json());
  },
  post: async (url: string, { arg }: Arg) => {
    const token = localStorage.getItem('token');

    return fetch(`${environment.apiBaseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(arg),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `user ${token}`,
      },
    }).then((res) => res.json());
  },
};
