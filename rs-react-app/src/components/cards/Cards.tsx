import { CardProps } from '../../interfaces/types';
import './Cards.css';
import { Card } from '../../features/Card';

export function Cards({
  photos,
  headingText,
  params,
  setSearchParams,
  showModal,
}: CardProps) {
  if (params.get('detail')) {
    params.delete('detail');
  }

  const currentSearch = Array.from(params.entries());

  return (
    <div className="cards-container">
      {photos.map((photoCard) => (
        <Card
          key={photoCard.id}
          currentSearch={currentSearch}
          headingText={headingText}
          setSearchParams={setSearchParams}
          showModal={showModal}
          photoCard={photoCard}
        />
      ))}
    </div>
  );
}
