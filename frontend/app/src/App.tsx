import './App.css';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './components/auth/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import GoogleMaps from './components/GoogleMaps';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import PlaceDetail from './components/places/PlaceDetail';
import PlaceEdit from './components/places/PlaceEdit';
import FriendsList from './components/friends/FriendsList';
import FriendRequest from './components/friends/FriendRequest';
import PrivateRoute from './components/auth/PrivateRoute';


function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/sign_up" element={<SignUpForm />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<GoogleMaps />} />
                <Route path="/favorite_places/:id" element={<PlaceDetail />} />
                <Route path="/favorite_places/:id/edit" element={<PlaceEdit />} />
                <Route path="/friends" element={<FriendsList />} />
                <Route path="/frineds/requests" element={<FriendRequest />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
