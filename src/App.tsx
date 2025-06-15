import './App.css';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <HeroSection />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
