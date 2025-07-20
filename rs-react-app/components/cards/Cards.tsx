import * as React from 'react';
import { CardProps, Photo } from '../../interfaces/types';
import ResultBlock from '../result-block/ResultBlock';
import './Cards.css';

export default class Cards extends React.Component<CardProps, unknown> {
  public constructor(props: CardProps & ResultBlock) {
    super(props);
  }
  render() {
    const photos: Photo[] | [] = this.props.photos;
    const headingText = this.props.headingText;
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
}
