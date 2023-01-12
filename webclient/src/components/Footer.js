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
                                <li><a href="index.html">About Us</a></li>
                                <li><a href="index.html">Mitao Bhook</a></li>
                                <li><a href="index.html">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Food</h6></li>
                                <li><a href="index.html">Our Secret Recipe</a></li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Locations</h6></li>
                                <li><a href="index.html">Find a Store</a></li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col">
                            <ul>
                                <li><h6>Get in Touch</h6></li>
                                <li><a href="index.html">Contact</a></li>
                                <li><a href="index.html">Join Us</a></li>
                                <li><a href="index.html">Scholarships</a></li>
                                <li><a href="index.html">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div className="footer-bottom-col d-none d-lg-flex">
                            <ul>
                                <li><a href="index.html"><img src={appStore} width="150px" alt="" /></a></li>
                                <li><a href="index.html"><img src={playStore} width="150px" alt="" /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <p className="assistant">© 2021 KFC Pakistan. All rights reserved.</p>
                        <a href="" className="assistant">eCommerce</a> 
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