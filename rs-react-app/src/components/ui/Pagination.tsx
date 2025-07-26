import { PaginationType } from '../../interfaces/types';
import { useState } from 'react';
import {
  getFrom,
  getMaxPageNumber,
  getNextPagesArray,
  getPagesArray,
  getPrevPagesArray,
} from '../../utils/utils';
import classes from './Pagination.module.css';

export default function Pagination({
  pages,
  page,
  changePage,
}: PaginationType) {
  const startPage = Math.min(page, pages);
  const [pageArray, setPagesArray] = useState(
    getPagesArray(
      getFrom(startPage),
      getMaxPageNumber(pages, startPage === 1 ? 20 : Math.ceil(page / 20) * 20)
    )
  );

  const resultArr = pageArray.includes(pages)
    ? pageArray.slice(0, pageArray.findIndex((item) => item === pages) + 1)
    : pageArray;

  return (
    <div
      className={
        pages === 0 ? classes.buttonContainer_none : classes.buttonContainer
      }
    >
      <button
        type="button"
        disabled={pageArray[0] === 1}
        className={classes.controlButton}
        onClick={() => setPagesArray(getPrevPagesArray(pageArray))}
      >
        Prev
      </button>
      {resultArr.map((p) => (
        <button
          key={p}
          aria-label={p.toString()}
          onClick={() => changePage(p)}
          className={
            p === page
              ? `${classes.pageButton} ${classes.pageCurrent}`
              : classes.pageButton
          }
          type="button"
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setPagesArray(getNextPagesArray(pageArray, pages))}
        disabled={
          pageArray.length === 0 || pages === pageArray[pageArray.length - 1]
        }
        className={classes.controlButton}
      >
        Next
      </button>
    </div>
  );
}
