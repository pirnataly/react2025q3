import { SuccessFetchAnswer } from '../interfaces/types';

let counter = 0;

export default async function fetchResults(
  inputText: string | null,
  page = 1
): Promise<SuccessFetchAnswer | 'bad' | undefined | string> {
  if (inputText) {
    try {
      const result = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d50b74cc2abc8ca99a668840bd5db3e4&tags=${inputText}&extras=url_l&format=json&nojsoncallback=1&per_page=20&page=${page}&content_types=0&privacy_filter=1`
      );
      if (result.ok) {
        const answer = await result.json();
        counter = 0;
        return answer;
      } else {
        return `${result.status} — Non-successful response`;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'TypeError') {
          if (counter < 3) {
            counter += 1;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetchResults(inputText);
          }
          return error.message;
        }
        return error.message;
      }
    }
    return;
  }
}
