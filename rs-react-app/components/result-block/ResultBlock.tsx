import React, { ReactNode } from 'react';
import './ResultBlock.css';
import {
  AppState,
  Photo,
  ResultBlockState,
  ResultsProps,
  SuccessFetchAnswer,
} from '../../interfaces/types';

export default class ResultBlock extends React.Component<
  ResultsProps & AppState,
  ResultBlockState & ResultBlock
> {
  public constructor(props: ResultsProps & AppState) {
    super(props);
  }

  render(): ReactNode {
    const headingText = localStorage.getItem('text')
      ? localStorage.getItem('text')
      : '';
    const nameOfClass =
      this.props.config === null ? 'spinner' : 'results-__container';

    const photos: Photo[] | undefined =
      this.props.config === null
        ? []
        : (this.props.config as SuccessFetchAnswer)?.photos.photo;

    if (this.props.config === null) {
      return <div className={nameOfClass}></div>;
    }

    if (this.props.config !== 'bad' && localStorage.getItem('text')) {
      return (
        <div className={nameOfClass}>
          <h1 className="results__heading">
            {this.props.config === undefined
              ? 'Nothing was '
              : this.props.config.photos.total + ' results were '}
            found for request <i>{headingText}</i>
          </h1>
          После заголовка карточки
          {photos.map((photo) => (
            <div key={photo.id}>{photo.url_l}</div>
          ))}
        </div>
      );
    }

    return (
      <div className={nameOfClass}>
        Последний
        {photos.map((photo) => (
          <div key={photo.id}>{photo.url_l}</div>
        ))}
      </div>
    );
  }
}
