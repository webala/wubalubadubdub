import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Search from "./Search";

const Layout = () => {
  return (
    <section className="layout">
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Layout;
