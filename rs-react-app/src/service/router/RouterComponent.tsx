import { Route, Routes } from 'react-router';
import App from '../../../src/app/App';
import NotFound from '../../components/not-found/NotFound';
import About from '../../pages/About';

export default function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
