import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import DashboardHome from './pages/dashboard/DashboardHome';
import ImageUpload from './pages/ImageUpload';
import AboutUs from './pages/AboutUs';
import Profile from './pages/dashboard/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<ImageUpload/>} path='/image-upload' />
          {/* <Route element={<FAQContainer/>} path='/faq' /> */}
          <Route element={<AboutUs/>} path='/aboutus' />
          <Route element={<Signup/>} path='/sign-up' />
          <Route element={<SignIn/>} path='/sign-in' />
          <Route  path='/dashboard' >
            <Route element={<Profile/>} path='' />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
