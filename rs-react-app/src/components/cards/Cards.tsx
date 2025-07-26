import { CardProps } from '../../interfaces/types';
import './Cards.css';

export function Cards({
  photos,
  headingText,
  params,
  setSearchParams,
  showModal,
}: CardProps) {
  console.log(params.get('detail'));
  if (params.get('detail')) {
    params.delete('detail');
  }
  const currentSearch = Array.from(params.entries());
  return (
    <div className="cards-container">
      {photos.map((photoCard) => (
        <div
          className="results-card"
          key={photoCard.id}
          onClick={async () => {
            showModal(true);
            currentSearch.push(['detail', photoCard.id]);
            setSearchParams(new URLSearchParams(currentSearch));
          }}
        >
          <div>
            <img
              src={photoCard.url_l}
              className="results-card__image"
              alt={headingText ?? 'photo'}
            ></img>
          </div>
          <h5 className="card-description">{photoCard.title}</h5>
        </div>
      ))}
    </div>
  );
}
