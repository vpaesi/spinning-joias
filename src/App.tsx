import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import TextoFixo from './components/TextoFixo'
import Home from './pages/Home'

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <Home />
        <TextoFixo frase={'Entregamos em todo território brasileiro'} />
        <p>Body</p>
        <Footer />   
      </div>
    </>
  )
}

export default App
