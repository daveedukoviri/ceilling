import './Footer.css';
import logo from '../../assets/img/banner_logo.webp';

function Footter() {
    return (
        <div id='footer'>
            <footer className="main-footer">
            <div className="container">
                <div className="row px-0">
                    {/* Logo and Description Section */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <a aria-label="logo">
                            <img src={logo} alt="logo" className='banner_logo'  />
                        </a>
                        <p className="mb-4 mt-4 small text-justify">
                            Leading supplier and manufacturer of ceiling systems, GI roofing sheets, 
                            and trusted dealer for premium ceiling and paint brands. Providing end-to-end 
                            solutions for residential and commercial interiors since 2008.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-lg-2 col-md-3 col-6 mb-4 mb-lg-0">
                        <div className="footer-links">
                            <h5>Quick Links</h5>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/company">About Us</a></li>
                                <li><a href="/products">Products</a></li>
                                <li><a href="/ceilings">Services</a></li>
                                <li><a href="/contacts">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-lg-2 col-md-3 col-6 mb-4 mb-lg-0">
                        <div className="footer-links">
                            <h5>Our Products</h5>
                            <ul>
                                <li><a href="/ceilings">Ceiling Systems</a></li>
                                <li><a href="/paints">Paints & Coatings</a></li>
                                <li><a href="/walls">Wall Solutions</a></li>
                                <li><a href="/paints">Roofing Materials</a></li>
                                <li><a href="/walls">Waterproofing</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                        <div className="footer-links">
                            <h5>Contact Info</h5>
                            <ul className="list-unstyled d-flex flex-md-row gap-5 flex-wrap">
                                {/* Head Office */}
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="fas fa-map-marker-alt me-2 me-md-3 text-gold mt-1 flex-shrink-0"></i>
                                    <div className="flex-grow-1 d-flex flex-wrap">
                                        <div className="d-inline-block me-2">Head Office:</div>
                                        <span className="d-inline-block me-2">79-3-3/1, RTC Complex Road,</span>
                                        <span className="d-inline-block me-2">Opp. Jio Petrol Bunk, V L Puram,</span>
                                        <span className="d-inline-block me-2">Rajahmundry, AP 533103</span>
                                    </div>
                                </li>

                                {/* Branch Shop */}
                                <li className="mb-3 d-flex align-items-start ">
                                    <i className="fas fa-store me-2 me-md-3 text-gold mt-1 flex-shrink-0"></i>
                                    <div className="flex-grow-1 d-flex flex-wrap">
                                        <div className="d-inline-block">Branch Shop:</div>
                                        <span className="d-inline-block">D. No. 20-3-7, G+1 Building,</span>
                                        <span className="d-inline-block">Ground Floor Shop,</span>
                                        <span className="d-inline-block">Ramachandrarao Peta, Rajahmundry 533105</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Details Row */}
                <div className="row mt-3 mt-md-4">
                    {/* Phone */}
                    <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                        <div className="d-flex align-items-start">
                            <i className="fas fa-phone me-2 me-md-3 text-gold mt-1 flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <div className="d-block ">Phone:</div>
                                <span className="d-inline-block">+91 92466 09090</span>
                                <span className="d-inline-block ms-3">+91 92988 03332</span>
                                <span className="d-block">+91 92060 29497</span>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                        <div className="d-flex align-items-start">
                            <i className="fas fa-envelope me-2 me-md-3 text-gold mt-1 flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <div className="d-block">Email:</div>
                                <span className="d-block text-break">gypsumngypsum4u@gmail.com</span>
                                <span className="d-block text-break">sreisai.shambhavi.enterprises@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-start">
                            <i className="fas fa-clock me-2 me-md-3 text-gold mt-1 flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <div className="d-block">Business Hours:</div>
                                <span className="d-block">Mon-Sat: 9:00 AM - 8:00 PM</span>
                                <span className="d-block">Sunday: 10:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom px-3 px-md-5">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                        <p className="mb-0 small">
                            © {new Date().getFullYear()} Sree Sai Shambhavi Enterprises (GNG Group). All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="mb-0 small">
                            <span className="d-block d-sm-inline me-0 me-sm-3">GNG Paints | Gypsum 'N' Gypsum</span>
                            <span className="d-block d-sm-inline mt-1 mt-sm-0">
                                Designed with <i className="fas fa-heart text-danger"></i> for excellence
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default Footter;