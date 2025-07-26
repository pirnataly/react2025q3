import { Link } from 'react-router';
import './About.css';

export default function About() {
  return (
    <>
      <section className={'about'}>
        <h1 className={'about__heading'}>About</h1>
        <p className="description about__description">
          Application designed for work assignments as part of the RSSchool
          React course Q3 2025.<br></br>
          The application makes a call to the selected API (Flickr API) to get a
          list of items using the search term from the input.
        </p>
        <nav className={'navigation'}>
          <Link
            to="https://rs.school/courses/reactjs"
            className="link about__link"
          >
            RS School React course
          </Link>
          <Link to="https://github.com/pirnataly" className="link about__link">
            The author
          </Link>
          <Link to="/" className="link">
            Go Home.
          </Link>
        </nav>
      </section>
    </>
  );
}
