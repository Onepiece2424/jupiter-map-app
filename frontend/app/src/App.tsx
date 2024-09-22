import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleMaps from './components/GoogleMaps';
import UserData from './components/UserData';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/users" element={<UserData />} />
          <Route path="/" element={<GoogleMaps />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
