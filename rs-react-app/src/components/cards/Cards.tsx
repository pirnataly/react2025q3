import { CardProps } from '../../interfaces/types';
import './Cards.css';

export function Cards({ photos, headingText }: CardProps) {
  return (
    <div className="cards-container">
      {photos.map((post) => (
        <div className="results-card" key={post.id}>
          <div>
            <img
              src={post.url_l}
              className="results-card__image"
              alt={headingText ?? 'photo'}
            ></img>
          </div>
          <h5 className="card-description">{post.title}</h5>
        </div>
      ))}
    </div>
  );
}
