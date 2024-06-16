import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdShoppingCart, MdSearch } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../Pages/cart";
import SideMenu from "./sidemenu";
import "./nav.css";

export default function Navbar() {
    const [login, setLogin] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
    const [showCart, setShowCart] = useState(false);
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0); // State for cart item count

    const navigate = useNavigate();

    const userName = localStorage.getItem("name")?.toUpperCase() || "";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogin(true);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
            if (window.innerWidth >= 600) {
                setShowSearch(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get("user/showcart", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartItemCount(response.data.items.length);
            } catch (error) {
                console.error("Error fetching cart item count:", error);
            }
        };

        fetchCartItemCount();
    }, [login]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;

        try {
            const response = await axios.get(`/product/search`, {
                params: { productName: searchQuery },
            });
            setSearchResults(response.data.products);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleClick = (product) => {
        navigate("/viewcard", {
            state: { product },
        });
    };

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
                <div className="navbar-buttons">
                    <button className="search_btn" onClick={() => setShowSearch(!showSearch)}>
                        <MdSearch />
                    </button>
                    <button className="cart_btn" onClick={() => setShowCart(true)}>
                        <MdShoppingCart />
                        {cartItemCount > 0 && <span className="cart_count">{cartItemCount}</span>} 
                    </button>
                    <button className="menu_btn" onClick={() => setShowSideMenu(!showSideMenu)}>
                        <RiMenu3Fill />
                    </button>
                </div>
            </div>
            {showSearch && (
                <div className="search_bar">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    <div className="search_results">
                        {searchResults.map((product) => (
                            <>
                                <br />
                                <div className="searchitem_div">
                                    <Link
                                        to="/viewcard"
                                        state={{ product }}
                                        key={product._id}
                                        className="search_result_item"
                                        onClick={() => handleClick(product)}
                                    >
                                        <div>
                                            <img src={product.picture} alt="" />
                                        </div>
                                        <h6>{product.productName}</h6>
                                    </Link>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
            <CartModal show={showCart} onClose={() => setShowCart(false)} onCartUpdate={(count) => setCartItemCount(count)} />
            <SideMenu
                show={showSideMenu}
                onClose={() => setShowSideMenu(false)}
                isMobile={isMobile}
                login={login}
                userName={userName}
                logOut={logOut}
                logedin={logedin}
            />
        </>
    );
}
