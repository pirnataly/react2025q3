import './ResultBlock.css';
import { Photo, ResultProps, SuccessFetchAnswer } from '../../interfaces/types';
import { Cards } from '../cards/Cards';

function ResultBlock({ config }: ResultProps) {
  const headingText = localStorage.getItem('text')
    ? localStorage.getItem('text')
    : '';
  const nameOfClass = config === null ? 'spinner' : 'results__container';
  const photos: Photo[] | undefined =
    config === null || typeof config === 'string'
      ? []
      : (config as SuccessFetchAnswer)?.photos.photo;

  if (config === null) {
    return <div className={nameOfClass}></div>;
  }
  if (typeof config !== 'string' && localStorage.getItem('text')) {
    return (
      <div className={nameOfClass}>
        <h1 className="results__heading">
          {config.photos.total + ' results were '}
          found for request <i>{headingText}</i>
        </h1>
        <Cards photos={photos ?? []} headingText={headingText} />
      </div>
    );
  }
  if (typeof config === 'string') {
    return (
      <div
        className={nameOfClass}
      >{`Something went wrong. Mistake:${config}`}</div>
    );
  }

  return (
    <div className={nameOfClass}>
      <Cards photos={photos ?? []} headingText={headingText} />
    </div>
  );
}

export default ResultBlock;
