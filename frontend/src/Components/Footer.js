import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="social_media_links">
                    <a href="https://www.facebook.com/profile.php?id=100085967793986">
                        <li>Facebook</li>
                    </a>

                    <a href="https://www.instagram.com/itssudhanshu77">
                        <li>Instagram</li>
                    </a>

                    <a href="https://www.linkedin.com/in/sudhanshu-choursiya">
                        <li>Linkedin</li>
                    </a>

                    <a href="https://mobile.twitter.com/Sudhanshu77C">
                        <li>Twitter</li>
                    </a>
                </div>
                <div className="copyright_Para_container">
                    <p>Copyright &copy; 2024 all rights reserved</p>
                </div>
            </div>
        </>
    );
};

export default Footer;
