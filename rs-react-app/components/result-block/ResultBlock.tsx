import React, { ReactNode } from 'react';
import './ResultBlock.css';
import {
  AppState,
  Photo,
  ResultBlockState,
  ResultsProps,
  SuccessFetchAnswer,
} from '../../interfaces/types';
import Cards from '../cards/Cards';

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
      this.props.config === null ? 'spinner' : 'results__container';

    const photos: Photo[] | undefined =
      this.props.config === null || typeof this.props.config === 'string'
        ? []
        : (this.props.config as SuccessFetchAnswer)?.photos.photo;

    if (this.props.config === null) {
      return <div className={nameOfClass}></div>;
    }
    if (typeof this.props.config !== 'string' && localStorage.getItem('text')) {
      return (
        <div className={nameOfClass}>
          <h1 className="results__heading">
            {this.props.config.photos.total + ' results were '}
            found for request <i>{headingText}</i>
          </h1>
          <Cards photos={photos ?? []} headingText={headingText} {...this} />
        </div>
      );
    }
    if (typeof this.props.config === 'string') {
      return (
        <div
          className={nameOfClass}
        >{`Something went wrong. Mistake:${this.props.config}`}</div>
      );
    }

    return (
      <div className={nameOfClass}>
        <Cards photos={photos ?? []} headingText={headingText} {...this} />
      </div>
    );
  }
}
