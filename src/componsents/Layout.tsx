import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Search from "./Search";

const Layout = () => {
    return (
        <section className="boreder border-red-800 bg-slate-900">
            <Navbar />
            <Search />
            <Outlet />
        </section>
    )
}

export default Layout;