import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from "./pages/Main";
import Category from "./pages/Category";
import Footer from "./components/Footer";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivatetRoute from "./components/PrivatetRoute";
import CreateListing from "./pages/CreateListing";
import ListingPage from "./pages/ListingPage";
import EditListing from "./pages/EditListing";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
    <Router>
      <div className="bg-mainBg text-white min-w-full min-h-[100vh]">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/:category_name' element={<Category />}/>
        <Route path='/offers' element={<Offers />}/>
        <Route path='/profile' element={<PrivatetRoute />}>
          <Route path='/profile' element={<Profile />}/>
        </Route>
        <Route path='/create-listing' element={<PrivatetRoute />}>
          <Route path='/create-listing' element={<CreateListing />}/>
        </Route>
        <Route path='/category/:category_name/:id' element={<ListingPage />} />
        <Route path='/edit/:id' element={<PrivatetRoute />}>
          <Route path='/edit/:id' element={<EditListing />} />
        </Route>
        <Route path='/contact/:id' element={<PrivatetRoute />}>
          <Route path='/contact/:id' element={<Contact />} />
        </Route>
      </Routes>
      <Footer />
      </div>
      <ToastContainer />
    </Router>
    </>
  );
}

export default App;
