import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { RiMenu3Fill, RiMenu2Line } from "react-icons/ri";
import { MdPersonPin } from "react-icons/md";

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [login, setLogin] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

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
                    <button className="menu_btn" onClick={() => setMenu(!menu)}>
                        {menu ? <RiMenu2Line /> : <RiMenu3Fill />}
                    </button>
                    {menu && (
                        <div className="dropdown_menu">
                            <ul>
                                {isMobile && (
                                    <>
                                        {login && (
                                            <li className="name1">
                                                <MdPersonPin className="signin_logo" /> Hi, {userName}
                                            </li>
                                        )}
                                        <li>
                                            <Link to="/newin" className="linktag">NEW IN</Link>
                                        </li>
                                        <li>
                                            <Link to="/newin" className="linktag">APPAREL</Link>
                                        </li>
                                        <li>
                                            <Link to="/newin" className="linktag">STORIES</Link>
                                        </li>
                                    </>
                                )}
                                {!isMobile && login && (
                                    <li className="name">
                                        <MdPersonPin className="signin_logo" /> Hi, {userName}
                                    </li>
                                )}
                                {!login && (
                                    <button onClick={logedin} className="logout_btn">
                                        <li className="logout">LOGIN</li>
                                    </button>
                                )}
                                <li>
                                    <Link to="/" className="linktag">HOME</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="linktag">ABOUT</Link>
                                </li>
                                {login && (
                                    <button onClick={logOut} className="logout_btn">
                                        <li className="logout">LOGOUT</li>
                                    </button>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <br /><br />
        </>
    );
}
