import { PhotoByIdType } from '../interfaces/types';

export async function fetchById(
  id: string | null
): Promise<PhotoByIdType | 'bad' | undefined> {
  if (id) {
    const result = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d50b74cc2abc8ca99a668840bd5db3e4&photo_id=${id}&secret=26afe18e55c9c647&format=json&nojsoncallback=1`
    );
    if (result.status === 200) {
      const answer = await result.json();
      return answer.photo;
    }
    return 'bad';
  }
  return 'bad';
}
