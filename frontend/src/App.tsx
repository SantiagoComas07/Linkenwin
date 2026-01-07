import { BrowserRouter } from 'react-router-dom';
import RenderRoute from './routes/RenderRoute';

function App() {
  return (
    <BrowserRouter>
      <RenderRoute />
    </BrowserRouter>
  );
}

export default App
