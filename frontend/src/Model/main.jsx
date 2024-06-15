import { Link } from "react-router-dom";
import Navbar from "../Components/nav";
import Card from "../Pages/card";
import Footer from "../Pages/footer";
import Home from "../Pages/home";


export default function Main() {
    return(
        <>
        <Navbar/>
        <Home/>
        <Card/>
        <br/>
        <div className="morebtn_div">
            <Link to="/newin">
            <button className="more_btn">DICOVER MORE</button>
            </Link>
        </div>
        <br/>  <br/>
        <Footer/>
        </>
    )
}