import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import OrderFab from "../components/OrderFab";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <OrderFab />
    </>
  );
}
