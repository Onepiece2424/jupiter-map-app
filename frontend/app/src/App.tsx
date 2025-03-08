import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/header/Header';
import GoogleMaps from './components/GoogleMaps';
import UserData from './components/UserData';
import LoginForm from './components/LoginForm';
import ExpensiveComponent from './components/ExpensiveComponent';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/users" element={<UserData />} />
            <Route path="/" element={<GoogleMaps />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/expensive" element={<ExpensiveComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
