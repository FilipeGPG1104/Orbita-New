import { useBrandFonts } from "./lib/useBrandFonts";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";

/**
 * App
 * -----------------------------------------------------------------------
 * Componente raiz: só organiza as seções da landing page, na ordem em
 * que aparecem na página. Cada seção é um componente independente em
 * src/components — abra o arquivo correspondente para editar o texto
 * ou o visual de uma parte específica do site.
 * -----------------------------------------------------------------------
 */
export default function App() {
  useBrandFonts();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden antialiased font-sans">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Booking />
      <Footer />
    </div>
  );
}
