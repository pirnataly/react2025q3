import './ResultBlock.css';
import { Photo, ResultProps } from '../../interfaces/types';
import { Cards } from '../cards/Cards';
import Pagination from '../ui/Pagination';
import Loader from '../ui/loader/Loader';

function ResultBlock({
  changePage,
  result,
  page,
  showModal,
  setSearchParams,
  isPhotoLoading,
  params,
}: ResultProps) {
  const resultFromRequest = result ?? 'bad';
  const photos: [] | Photo[] =
    typeof resultFromRequest === 'string' ||
    resultFromRequest.photos.photo.length === 0
      ? []
      : resultFromRequest.photos.photo;
  const pages =
    typeof resultFromRequest === 'string' ? 0 : resultFromRequest.photos.pages;
  const total =
    typeof resultFromRequest === 'string' ? 0 : resultFromRequest.photos.total;

  const headingText = localStorage.getItem('text')
    ? localStorage.getItem('text')
    : '';
  const nameOfClass = result === null ? 'spinner' : 'results__container';

  if (
    typeof resultFromRequest !== 'string' &&
    ((pages < page && pages !== 0 && page !== 1) || Number.isNaN(page))
  ) {
    return (
      <>
        <h1 className="results-heading">This page does not exist</h1>
        <h3 className="results-subheading">
          Choose another page or change text of your request
        </h3>
        <Pagination
          pages={pages}
          page={Number.isNaN(page) ? 1 : page}
          changePage={changePage}
        />
      </>
    );
  }

  if (typeof resultFromRequest === 'string' && resultFromRequest !== 'bad') {
    return (
      <div
        className={nameOfClass}
      >{`Something went wrong. Mistake:${resultFromRequest}`}</div>
    );
  }

  // if (resultFromRequest === 'bad') {
  //   return <div className={nameOfClass}></div>;
  if (isPhotoLoading) {
    return <Loader />;
  } else {
    if (localStorage.getItem('text')) {
      return (
        <div className={nameOfClass}>
          <h1 className="results__heading">
            {total + ' results were '}
            found for request <i>{headingText}</i>
          </h1>
          <Cards
            photos={photos ?? []}
            headingText={headingText}
            showModal={showModal}
            setSearchParams={setSearchParams}
            params={params}
          />
          <Pagination pages={pages} page={page} changePage={changePage} />
        </div>
      );
    }
  }

  return (
    <div className={nameOfClass}>
      <Cards
        photos={photos ?? []}
        headingText={headingText}
        setSearchParams={setSearchParams}
        params={params}
        showModal={showModal}
      />
      <Pagination pages={pages} page={page} changePage={changePage} />
    </div>
  );
}

export default ResultBlock;
