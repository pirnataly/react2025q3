import './Fallback.css';

export function Fallback() {
  return (
    <section className={'fallback'}>
      <h2 className={'fallback__heading'}>{'Mistake from Error Boundary'}</h2>
      <p>Please reload the window</p>
    </section>
  );
}
