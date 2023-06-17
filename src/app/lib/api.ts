export const checkEnvironment = () => {
  let base_url = process.env.API_BASE_URL;
  return base_url || "";
};
export const api = (input: string, init?: RequestInit | undefined) => {
  return fetch(checkEnvironment()?.concat(input), init);
};
