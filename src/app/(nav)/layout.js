import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="website">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
