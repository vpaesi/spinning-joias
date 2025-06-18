import './App.css';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ListaProdutos from './components/ListaProdutos';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <HeroSection />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:categoria" element={<ListaProdutos />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
