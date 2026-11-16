import Header from "./components/Header";
import Hero from "./components/Hero";
import DemoShowcase from "./components/DemoShowcase";
import ValueProps from "./components/ValueProps";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-cream text-ink">
      <Header />
      <main>
        <Hero />
        <DemoShowcase />
        <ValueProps />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}