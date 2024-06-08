import { useNavigate } from "react-router-dom";
import "./page.css"


export default function Footer() {

    const navigate = useNavigate()

    function admin_login(){
        navigate("/adminlogin")
    }

    function mbr_login(){
        navigate("/registration")
    }



    return(
        <div className="footer_cntnr">
            <div className="logo_div_footer">
                <h1>BLUORNG</h1>
            </div>
            <div className="help_div">
                <h5>HELP</h5>
                <br/>
                <p>
                    <button onClick={mbr_login} className="mmbr_login">MEMBER LOGIN</button> <br/><br/>
                    EXCHANGE/ RETURNING POLICY <br/><br/>
                    FAQ <br/><br/>
                    TERMS <br/><br/>
                    SHIPPING
                </p>
            </div>
            <div className="compny_div">
            <h5>COMPANY</h5>
            <br/>
                <p>
                    <button onClick={admin_login} className="admin_login">ADMIN LOGIN</button> <br/><br/>
                    OUR STORIES <br/><br/>
                    CAREER <br/><br/>
                    TERMS <br/><br/>
                    CONTACT US <br/><br/>
                    COLABORATION
                </p>
            </div>
        </div>
    );
    
}