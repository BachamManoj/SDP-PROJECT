import './App.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './pages/Footer';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Service from './pages/Service';
import Contact from './pages/Contact';
import LoginPage from './pages/Login';
import DoctorsBySpecialty from './pages/Doctor';
import Appointment from './pages/Appointment';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/service' element={<Service/>} />
          <Route exact path='/contact' element={<Contact/>} />
          <Route exact path='/login' element={<LoginPage/>} />
          <Route exact path='/doctor' element={<DoctorsBySpecialty/>} />
          <Route exact path='/appointment' element={<Appointment/>} />
        </Routes>
        <Appointment/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
