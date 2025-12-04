import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Search from "./Search";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <section className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Layout;
