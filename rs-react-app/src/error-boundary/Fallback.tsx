import './Fallback.css';
import '../components/not-found/NotFound.css';

export function Fallback() {
  return (
    <section className={'fallback'}>
      <h2 className={'fallback__heading'}>{`Mistake from Error Boundary`}</h2>
      <p className={'fallback__paragraph'}>
        Please reload the window or click the link
      </p>
      <a href={'/'} className={'link not-found__link'}>
        Go Home
      </a>
    </section>
  );
}
