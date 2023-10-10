import footerLogo from '../img/footer-logo.png';
import upChevron from '../img/up-chevron.svg'
import appStore from '../img/app-store.png';
import playStore from '../img/google-play.png';
function Footer()
{
    return(
        <div className="footer-parent">
            <div className="container">
                <div className="footer">
                    <div className="footer-logo">
                        <img src={footerLogo} alt="" />
                        <a href="#header" className="back-to-top assistant"> <img src={upChevron} width="12px" alt="" /> Back To Top</a>
                    </div>
                   
                    <div className="footer-bottom">
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Information</h6></li>
                                <li>About Us</li>
                                <li>Mitao Bhook</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Food</h6></li>
                                <li>Our Secret Recipe</li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Locations</h6></li>
                                <li>Find a Store</li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Get in Touch</h6></li>
                                <li>Contact</li>
                                <li>Join Us</li>
                                <li>Scholarships</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col d-none d-lg-flex">
                            <ul>
                                <li><img src={appStore} width="150px" alt="" /></li>
                                <li><img src={playStore} width="150px" alt="" /></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <p className="assistant">© 2021 KFC Pakistan. All rights reserved.</p>
                        <span className="assistant">eCommerce </span>
                        <span className="assistant">by</span>
                        <a href="" className="assistant">Fishry</a>
                    </div>
                    <div className="header-inner-dec">
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                    <div className="dec-white"></div>
                    <div className="dec-red"></div>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Footer;