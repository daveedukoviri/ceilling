import './Footer.css';
import logo from '../../assets/img/banner_logo.png';

function Footter(){
    return (
          <footer className="main-footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 mb-5 mb-lg-0 ">
                      <a aria-label="logo ">
                                      <img src={logo} alt="logo"  className='banner_logo'/>
                                    </a>
                    {/* <div className="footer-logo">saishambhvi<span style={{color: 'var(--classic-gold)'}}>.</span></div> */}
                    <p className="mb-4 mt-4">Creating beautiful, functional spaces that reflect your personality and enhance your lifestyle since 2008.</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-pinterest"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6 mb-5 mb-md-0">
                    <div className="footer-links">
                        <h5>Quick Links</h5>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/portfolio">Portfolio</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6 mb-5 mb-md-0">
                    <div className="footer-links">
                        <h5>Our Services</h5>
                        <ul>
                            <li><a href="/services/residential">Residential Interior</a></li>
                            <li><a href="/services/commercial">Commercial Interior</a></li>
                            <li><a href="/services/renovation">Home Renovation</a></li>
                            <li><a href="/services/consultation">Design Consultation</a></li>
                            <li><a href="/services/modular">Modular Kitchen</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <div className="footer-links">
                        <h5>Contact Info</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <i className="fas fa-map-marker-alt me-2 text-gold"></i>
                                saishambhvi Design Studio, MG Road, Kochi
                            </li>
                            <li className="mb-3">
                                <i className="fas fa-phone me-2 text-gold"></i>
                                +91 123 456 7890
                            </li>
                            <li className="mb-3">
                                <i className="fas fa-envelope me-2 text-gold"></i>
                                info@saishambhviinteriors.com
                            </li>
                            <li>
                                <i className="fas fa-clock me-2 text-gold"></i>
                                Mon-Sat: 9:00 AM - 7:00 PM
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div className="footer-bottom px-5 ">
                <div className="row align-items-center ">
                    <div className="col-md-6">
                        <p className="mb-0">© 2023 saishambhvi Interiors. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0">Designed with <i className="fas fa-heart text-danger"></i> by saishambhvi Team</p>
                    </div>
                </div>
            </div>
    </footer>

    )
}

export default Footter;