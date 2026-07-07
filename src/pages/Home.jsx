import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import OrderFab from "../components/OrderFab";
import Preloader from "../components/Preloader";
import ScrollProgress from "../components/ScrollProgress";

export default function Home() {
  return (
    <div className="grain-overlay">
      <Preloader />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <OrderFab />
    </div>
  );
}
