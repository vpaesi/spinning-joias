import './App.css';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SearchCategorias from './pages/SearchCategorias';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <HeroSection />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos/categoria/:categoria" element={<SearchCategorias />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
