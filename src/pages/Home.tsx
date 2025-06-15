import Buscador from '../components/Buscador'
import Nav from '../components/Nav'
import HeroSection from '../components/HeroSection'
import TextoFixo from '../components/TextoFixo'

function Home() {

  return (
    <>
      <div className="Home">
          <Buscador />
          <Nav />
          <HeroSection />
          <TextoFixo frase={'Encontre a joia que dança com você!'} />
      </div>
    </>
  )
}

export default Home
