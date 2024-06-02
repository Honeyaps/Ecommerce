import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import { RiMenu3Fill } from "react-icons/ri";
import { RiMenu2Line } from "react-icons/ri";
import { MdPersonPin } from "react-icons/md";

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [login, setLogin] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

    const navigate = useNavigate();

    const userName = localStorage.getItem("name").toUpperCase();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogin(true)
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function logOut() {
        localStorage.removeItem("token");
        setLogin(false);
        navigate("/registration");
    }

    return (
        <>
            <div className="navbar">
                <div className="logo_div">
                    <h1>BLUORNG</h1>
                </div>
                {!isMobile && (
                    <ul className="links">
                        <li>NEW IN</li>
                        <li>APPAREL</li>
                        <li>STORES</li>
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
                                        <li className="name1"><MdPersonPin className="signin_logo" /> Hi, {userName}</li>
                                        <li>NEW IN</li>
                                        <li>APPAREL</li>
                                        <li>STORES</li>
                                    </>
                                )}
                                <li className="name"><MdPersonPin className="signin_logo"/> Hi, {userName}</li>
                                <li>HOME</li>
                                <li>ABOUT</li>

                                {login ? (
                                    <button onClick={logOut} className="logout_btn">
                                        <li className="logout">LOGOUT</li>
                                    </button>
                                ) : null}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <br /><br /><br />
        </>
    );
}
