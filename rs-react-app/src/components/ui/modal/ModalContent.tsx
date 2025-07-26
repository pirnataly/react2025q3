import classes from './ModalContent.module.css';
import useFetching from '../../../hooks/useFetching';
import { ModalComponent, PhotoByIdType } from '../../../interfaces/types';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import { fetchById } from '../../../service/requestId';

export default function ModalContent({ id }: ModalComponent) {
  const [modalData, setModalData] = useState<null | PhotoByIdType>(null);
  const fetchCallback = useCallback(async (PhotoId: string | null) => {
    if (PhotoId) {
      const data = await fetchById(String(PhotoId));
      if (data && data !== 'bad') {
        setModalData(data);
      }
    }
  }, []);

  const [fetchPhotoById, isPhotoLoading, errorMessage] =
    useFetching(fetchCallback);

  function getUrl() {
    if (modalData) {
      return `https://live.staticflickr.com/${modalData.server}/${modalData.id}_${modalData.secret}_b.jpg`;
    }
  }

  useEffect(() => {
    fetchPhotoById(id);
  }, [id, fetchPhotoById]);

  return isPhotoLoading ? (
    <Loader />
  ) : (
    <div className={classes.modalContent}>
      {errorMessage ? (
        <h1 className={classes.errorMessage}>{errorMessage}</h1>
      ) : (
        <>
          <img src={getUrl()} alt={`${id}`} className={classes.modalImage} />

          <p
            className={`${classes.moduleDescription} ${classes.moduleHeading}`}
          >{`Title: ${modalData?.title._content}`}</p>
          <p className={classes.moduleDescription}>
            date: {modalData?.dates.taken}
          </p>
          <p className={classes.moduleDescription}>
            author: {modalData?.owner.realname}
          </p>
          <p className={classes.moduleDescription}>views: {modalData?.views}</p>
        </>
      )}
    </div>
  );
}
