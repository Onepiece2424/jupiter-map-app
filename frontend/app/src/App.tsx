import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/header/Header';
import GoogleMaps from './components/GoogleMaps';
import LoginForm from './components/LoginForm';
import PlaceDetail from './components/places/PlaceDetail';
import PlaceEdit from './components/places/PlaceEdit';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<GoogleMaps />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/favorite_places/:id" element={<PlaceDetail />} />
            <Route path="/favorite_places/:id/edit" element={<PlaceEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
