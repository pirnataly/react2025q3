import './ResultBlock.css';
import { Photo, ResultProps } from '../../interfaces/types';
import { Cards } from '../cards/Cards';
import Loader from '../ui/loader/Loader';
import Pagination from '../ui/pagination/Pagination';

function ResultBlock({
  changePage,
  result,
  page,
  showModal,
  setSearchParams,
  isPhotoLoading,
  params,
  errorMessage,
  headingText,
}: ResultProps) {
  const photos: Photo[] =
    result === undefined || result.photos.photo.length === 0
      ? []
      : result.photos.photo;
  const pages = result === undefined ? 0 : result.photos.pages;
  const total = result === undefined ? 0 : result.photos.total;
  const nameOfClass = isPhotoLoading ? 'spinner' : 'results__container';

  if (
    result &&
    ((pages < page && pages !== 0 && page !== 1) || Number.isNaN(page))
  ) {
    return (
      <>
        <h1 className="results__heading">This page does not exist</h1>
        <h3 className="results__subheading">
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

  if (result === undefined && errorMessage) {
    return (
      <div
        className={nameOfClass}
      >{`Something went wrong. Mistake:${errorMessage}`}</div>
    );
  }
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
