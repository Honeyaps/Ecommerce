export default function Footer() {

    return(
        <div className="footer_cntnr">
            <div className="logo_div_footer">
                <h1>BLUORNG</h1>
            </div>
            <div className="help_div">
                <h5>HELP</h5>
                <br/>
                <p>
                    <a href="http://localhost:5174/registration" className="mmbr_login">MEMBER LOGIN</a> <br/><br/>
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
                    <a href="http://localhost:5174/adminlogin" className="admin_login">ADMIN LOGIN</a> <br/><br/>
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