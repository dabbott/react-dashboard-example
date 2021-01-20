/**
 * Fetch JSON from a url.
 *
 * If the response status code is >400, throw an error.
 *
 * @param url
 */
export default async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  return result;
}
