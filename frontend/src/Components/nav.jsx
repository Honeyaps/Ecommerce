import { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../Pages/cart";
import "./nav.css";
import SideMenu from "./sidemenu";

export default function Navbar() {
    const [login, setLogin] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
    const [showCart, setShowCart] = useState(false);
    const [showSideMenu, setShowSideMenu] = useState(false);

    const navigate = useNavigate();

    const userName = localStorage.getItem("name")?.toUpperCase() || "";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogin(true);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function logOut() {
        localStorage.removeItem("token");
        setLogin(false);
        navigate("/registration");
    }

    function logedin() {
        navigate("/registration");
    }

    return (
        <>
            <div className="navbar">
                <div className="logo_div">
                    <Link to="/" className="linktag_logo">
                        <h1>BLUORNG</h1>
                    </Link>
                </div>
                {!isMobile && (
                    <ul className="links">
                        <li>
                            <Link to="/newin" className="linktag">NEW IN</Link>
                        </li>
                        <li> <Link to="/newin" className="linktag">APPAREL</Link></li>
                        <li> <Link to="/newin" className="linktag">STORIES</Link></li>
                    </ul>
                )}
                <div>
                    <button className="cart_btn" onClick={() => setShowCart(true)}>
                        <MdShoppingCart />
                    </button>
                    <button className="menu_btn" onClick={() => setShowSideMenu(!showSideMenu)}>
                        <RiMenu3Fill />
                    </button>
                </div>
            </div>
            <CartModal show={showCart} onClose={() => setShowCart(false)} />
            <SideMenu
                show={showSideMenu} 
                onClose={() => setShowSideMenu(false)} 
                isMobile={isMobile} 
                login={login} 
                userName={userName} 
                logOut={logOut} 
                logedin={logedin} 
            />
            <br />
        </>
    );
}
