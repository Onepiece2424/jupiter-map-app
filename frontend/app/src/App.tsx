import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/header/Header';
import GoogleMaps from './components/GoogleMaps';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import PlaceDetail from './components/places/PlaceDetail';
import PlaceEdit from './components/places/PlaceEdit';
import { AuthProvider } from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<GoogleMaps />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/sign_up" element={<SignUpForm />} />
              <Route element={<PrivateRoute />}>
                <Route path="/favorite_places/:id" element={<PlaceDetail />} />
                <Route path="/favorite_places/:id/edit" element={<PlaceEdit />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
