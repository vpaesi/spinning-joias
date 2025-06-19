import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SearchCategorias from './pages/SearchCategorias';
import ProdutoDetalhe from './pages/ProdutoDetalhe';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <HeroSection />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos/categoria/:categoria" element={<SearchCategorias />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
