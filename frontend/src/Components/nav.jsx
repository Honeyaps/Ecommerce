import "./nav.css";
import { RiMenu3Fill } from "react-icons/ri";

export default function Navbar() {
    return (
        <>
        <div className="navbar">
            <div className="logo_div">
                <h1>BLUORNG</h1>
            </div>
            <ul className="links">
                <li>NEW IN</li>
                <li>APPAREL</li>
                <li>STORES</li>
            </ul>
            <div className="toggle_div">
                <RiMenu3Fill />
            </div>
        </div>
        <br/><br/>
        </>
    );
}
