import { Link } from "react-router-dom";
import Navbar from "../Components/nav";
import Card from "../Pages/card";
import Footer from "../Pages/footer";
import Home from "../Pages/home";
import "./main.css";


export default function Main() {
    return (
        <>
            <Navbar />
            <Home />
            <Card />
            <br />
            <div className="morebtn_div">
                <Link to="/newin">
                    <button className="more_btn">DICOVER MORE</button>
                </Link>
            </div>
            <br />
            <div className="footer_img_cont">
                <div><img src="footer_1.webp" className="footer_img" /></div>
                <div><img src="footer_2.webp" className="footer_img" /></div>
                <div><img src="footer_3.webp" className="footer_img" /></div>
            </div>
            <br/>
            <Footer />
        </>
    )
}