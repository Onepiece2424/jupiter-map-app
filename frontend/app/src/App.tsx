import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GoogleMaps from './components/GoogleMaps';
import UserData from './components/UserData';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/users" element={<UserData />} />
            <Route path="/" element={<GoogleMaps />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
