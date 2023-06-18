import { cookies } from 'next/headers';

export const checkEnvironment = () => {
  let base_url = process.env.API_BASE_URL;
  return base_url || '';
};
export const api = (input: string, init?: RequestInit | undefined) => {
  return fetch(checkEnvironment()?.concat(input), {
    ...init,
    credentials: 'include',
    headers: {
      Cookie: cookies()
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; '),
    },
  });
};
