import { Route, Routes } from 'react-router';
import App from '../../../src/app/App';
import NotFound from '../../components/not-found/NotFound';
import About from '../../pages/About';

export default function RouterComponent() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="*" element={<NotFound />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
}
