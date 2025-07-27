import { Link } from 'react-router';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className={'not-found'}>
      <h1 className={'not-found__heading'}>404.Not Found</h1>
      <p className={'not-found__description'}>
        This is not the page you are looking for
      </p>
      <Link to="/" className="link not-found__link">
        Go Home
      </Link>
    </div>
  );
}
