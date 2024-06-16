import React from "react";
import "./nav.css";
import { MdClose, MdPersonPin } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SideMenu({ show, onClose, isMobile, login, userName, logOut, logedin }) {
    return (
        <div className={`side_menu ${show ? "show" : ""}`}>
            <div className="side_menu_header">
                <h2>Menu</h2>
                <button className="side_menu_close_btn" onClick={onClose}>
                    <MdClose />
                </button>
            </div>
            <div className="side_menu_body">
                <ul>
                    {isMobile && (
                        <>
                            {login && (
                                <li className="name1">
                                    <MdPersonPin className="signin_logo" /> Hi, {userName}
                                </li>
                            )}
                            <li>
                                <Link to="/newin" className="linktag" onClick={onClose}>NEW IN</Link>
                            </li>
                            <li>
                                <Link to="/newin" className="linktag" onClick={onClose}>APPAREL</Link>
                            </li>
                            <li>
                                <Link to="/newin" className="linktag" onClick={onClose}>STORIES</Link>
                            </li>
                        </>
                    )}
                    {!isMobile && login && (
                        <li className="name">
                            <MdPersonPin className="signin_logo" /> Hi, {userName}
                        </li>
                    )}
                    {!login && (
                        <button onClick={logedin} className="logoin_btn">
                            <li className="logout">LOGIN</li>
                        </button>
                    )}
                    
                    <li>
                        <Link to="/" className="linktag" onClick={onClose}>HOME</Link>
                    </li>
                    <li>
                        <Link to="/about" className="linktag" onClick={onClose}>ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/" className="linktag" onClick={onClose}>ORDERS</Link>
                    </li>
                    {login && (
                        <button onClick={logOut} className="logout_btn">
                            <li className="logout">LOGOUT</li>
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
}
