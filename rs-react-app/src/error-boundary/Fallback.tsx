import * as React from 'react';
import './Fallback.css';

export default class Fallback extends React.Component<
  unknown,
  React.JSX.Element
> {
  public constructor(props: unknown) {
    super(props);
  }

  render() {
    return (
      <section className={'fallback'}>
        <h2 className={'fallback__heading'}>{'Mistake from Error Boundary'}</h2>
        <p>Please reload the window</p>
      </section>
    );
  }
}
