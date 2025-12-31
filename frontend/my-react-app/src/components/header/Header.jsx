import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/img/banner_logo.webp';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({
    whatWeDo: false,
    products: false,
    locations: false
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (menu) => {
    setIsSubmenuOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  // Helper to close mobile menu on link click
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header id="Header">
        <section id="HeaderMain">
          <div className="container-fluid">
            <div className="FRow">
              <div className="LogoSec">
                <Link to="/" aria-label="logo">
                  <img src={logo} alt="D'LIFE Interiors Logo" className='banner_logo' />
                </Link>
              </div>

              <div className="MenuSecWrp d-flex flex-row flex-lg-column pt-3 pb-3 pt-lg-4 pb-lg-0">
                {/* Desktop Navigation */}
                <nav className="MainMenu desktop-only pb-4">
                  <ul className="MainMenuList">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/company">COMPANY</Link></li>

                    <li className="has-submenu">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        WHAT WE DO <i className="fas fa-chevron-down"></i>
                      </a>
                      <div className="submenu">
                        <ul>
                          <li><Link to="/custom-made">Customized Interiors</Link></li>
                          <li><Link to="/design-and-build">Design and Build</Link></li>
                        </ul>
                      </div>
                    </li>

                    <li className="has-submenu">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Services <i className="fas fa-chevron-down"></i>
                      </a>
                      <div className="submenu">
                        <ul>
                          <li><Link to="/ceilings">Ceiling Systems</Link></li>
                          <li><Link to="/paints">Paints & Coatings</Link></li>
                          <li><Link to="/walls">Wall Solutions</Link></li>
                          
                        </ul>
                      </div>
                    </li>

                    <li><Link to="/offers">OFFERS</Link></li>
                    <li><Link to="/gallery">GALLERY</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/contacts">CONTACT</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        ></div>

        {/* Mobile Menu Panel */}
        <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <img src={logo} alt="D'LIFE Logo" style={{ height: '40px' }} />
            </div>
            <button
              className="close-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <nav className="mobile-nav">
            <ul className="mobile-menu-list">
              <li>
                <Link to="/" onClick={handleMobileLinkClick}>HOME</Link>
              </li>
              <li>
                <Link to="/company" onClick={handleMobileLinkClick}>COMPANY</Link>
              </li>

              <li className="mobile-submenu-item">
                <div className="submenu-header" onClick={() => toggleSubmenu('whatWeDo')}>
                  <span>WHAT WE DO</span>
                  <i className={`fas fa-chevron-${isSubmenuOpen.whatWeDo ? 'up' : 'down'}`}></i>
                </div>
                <div className={`mobile-submenu ${isSubmenuOpen.whatWeDo ? 'active' : ''}`}>
                  <ul>
                    <li><Link to="/custom-made" onClick={handleMobileLinkClick}>Customized Interiors</Link></li>
                    <li><Link to="/design-and-build" onClick={handleMobileLinkClick}>Design and Build</Link></li>
                  </ul>
                </div>
              </li>

              <li className="mobile-submenu-item">
                <div className="submenu-header" onClick={() => toggleSubmenu('products')}>
                  <span>PRODUCTS</span>
                  <i className={`fas fa-chevron-${isSubmenuOpen.products ? 'up' : 'down'}`}></i>
                </div>
                <div className={`mobile-submenu ${isSubmenuOpen.products ? 'active' : ''}`}>
                  <ul>
                    <li><Link to="/ceilings">Ceiling Systems</Link></li>
                          <li><Link to="/paints">Paints & Coatings</Link></li>
                          <li><Link to="/walls">Wall Solutions</Link></li>
                  </ul>
                </div>
              </li>

              <li><Link to="/offers" onClick={handleMobileLinkClick}>OFFERS</Link></li>
              <li><Link to="/gallery" onClick={handleMobileLinkClick}>GALLERY</Link></li>
              <li><Link to="/blog" onClick={handleMobileLinkClick}>BLOGS</Link></li>
              <li><Link to="/contacts" onClick={handleMobileLinkClick}>CONTACT</Link></li>
            </ul>
          </nav>

          {/* Mobile Contact Info */}
          <div className="mobile-contact-info">
            <div className="mobile-call-btn">
              <a href="tel:+919995517777" className="btn-call-mobile">
                <i className="fas fa-phone-alt"></i>
                <span>CALL NOW</span>
              </a>
            </div>
            <div className="mobile-social-links">
              <a
                href="https://wa.me/918137005598"
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-50 p-2 rounded-3"
              >
                <i className="fab fa-whatsapp fs-5"></i>
              </a>
              <a
                href="mailto:enquiry@dlifeinteriors.com"
                className="btn w-50 p-2 rounded-3"
              >
                <i className="fas fa-envelope fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Right Sidebar */}
      <div className="fixedRit hidden">
        <ul>
          <li>
            <a className="Call" href="#" data-bs-toggle="modal" data-bs-target="#cntactModal">
              <div className="icon">
                <svg width="23.444" height="23.444" viewBox="0 0 23.444 23.444">
                  <g id="phone-call" transform="translate(23.444 11.734) rotate(135)">
                    <g id="Group_11" data-name="Group 11">
                      <path id="Path_23" data-name="Path 23"
                        d="M16.126,12.179,13.81,9.863a1.54,1.54,0,0,0-2.564.579,1.576,1.576,0,0,1-1.82.993,7.141,7.141,0,0,1-4.3-4.3,1.5,1.5,0,0,1,.993-1.82A1.54,1.54,0,0,0,6.7,2.75L4.381.434a1.652,1.652,0,0,0-2.233,0L.576,2.006C-1,3.66.742,8.044,4.629,11.931s8.271,5.707,9.925,4.053l1.571-1.571A1.652,1.652,0,0,0,16.126,12.179Z">
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
              <span>Call Back</span>
            </a>
          </li>
          <li>
            <a
              href="https://api.whatsapp.com/send?phone=918137005598&text=Hi%20D%27LIFE,%20I%20would%20like%20to%20discuss%20about%20a%20home%20interior%20project%20of%20mine,%20and%20know%20more%20about%20your%20interior%20design%20options%20and%20services%20available."
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <svg width="33.163" height="33.158" viewBox="0 0 33.163 33.158">
                  <ellipse id="Ellipse_25" cx="12.5" cy="12" rx="12.5" ry="12" transform="translate(4 4.579)" fill="#fff"></ellipse>
                  <g id="Layer_2">
                    <g id="Color">
                      <g id="_08.Whatsapp">
                        <path id="Icon"
                          d="M52.588,36A16.579,16.579,0,0,0,39.163,62.3l-2.072,6.159,6.379-2.039A16.579,16.579,0,1,0,52.588,36ZM61.4,59.447l-1.766,1.766c-1.857,1.857-6.781-.187-11.145-4.559s-6.321-9.284-4.555-11.12L45.7,43.767a1.853,1.853,0,0,1,2.508,0l2.6,2.595a1.728,1.728,0,0,1-.651,2.876,1.687,1.687,0,0,0-1.115,2.048,8.019,8.019,0,0,0,4.833,4.829A1.77,1.77,0,0,0,55.9,54.987a1.733,1.733,0,0,1,2.9-.651l2.6,2.6a1.853,1.853,0,0,1,0,2.508Z"
                          transform="translate(-36.015 -36)" fill="#07d97e"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span>Whatsapp</span>
            </a>
          </li>
          <li>
            <a href="mailto:enquiry@dlifeinteriors.com">
              <div className="icon">
                <svg width="19.882" height="14.891" viewBox="0 0 19.882 14.891">
                  <path id="Path_24" d="M11.6,176.927a2.99,2.99,0,0,1-3.323,0L.132,171.5Q.065,171.451,0,171.4v8.9a1.83,1.83,0,0,0,1.83,1.83H18.052a1.83,1.83,0,0,0,1.83-1.83v-8.9c-.043.032-.087.064-.133.094Z" transform="translate(0 -167.242)" fill="#814882"></path>
                  <path id="Path_25" d="M.779,67.551l8.147,5.432a1.826,1.826,0,0,0,2.031,0L19.1,67.551a1.744,1.744,0,0,0,.779-1.455,1.832,1.832,0,0,0-1.83-1.83H1.83A1.832,1.832,0,0,0,0,66.1a1.744,1.744,0,0,0,.779,1.454Z" transform="translate(0 -64.266)" fill="#814882"></path>
                </svg>
              </div>
              <span>Send Mail</span>
            </a>
          </li>
        </ul>
        <a href="#" className="estimateBtn" data-bs-toggle="modal" data-bs-target="#freeestimate">
          <span>Free Estimate</span>
        </a>
      </div>

      {/* Fixed Bottom Mobile Navigation */}
      <div className="fixedBottom">
        <ul>
          <li>
            <Link to="/company">
              <svg viewBox="0 0 484 470.5">
                <path d="M412.9,352.6h-36.6c-22,0-39.9,18-39.9,40v13.9h116.5v-13.9C452.9,370.6,434.9,352.6,412.9,352.6z M423,339.6c25.1,4.8,43.9,26.9,43.9,53v13.9H477c3.9,0,7,3.1,7,7v50c0,3.9-3.1,7-7,7H7c-3.9,0-7-3.1-7-7v-50c0-3.9,3.1-7,7-7h10.1v-13.9c0-26.1,18.8-48.2,43.9-53c-18.5-16.3-19.4-44.9-2-62.4c9.1-9.1,22-13.8,35.4-12.2V98.1c0-54,44.1-98.1,98.1-98.1h91.1c3.9,0,7,3.1,7,7v87.1h91.8c3.9,0,7,3.1,7,7V265c25.6-3.1,48,16.9,48,42.5C437.5,320.2,431.9,331.7,423,339.6L423,339.6z M327.2,370.5c7.2-15.9,21.8-27.6,39.1-30.9c-22.9-20.2-17.8-56.9,9.2-70.4V108.1h-84.8v150.5c0,1.6-0.5,3.1-1.4,4.3c9,21.6,2.2,46.4-16.1,60.4C299,326.8,320.3,345.6,327.2,370.5z M107.6,352.6H71c-21.9,0-39.9,18-39.9,40v13.9h116.5v-13.9C147.6,370.6,129.6,352.6,107.6,352.6z M117.7,339.6c17.3,3.3,31.9,15,39.1,30.9c6.9-24.9,28.2-43.7,54-47.2c-24.5-18.8-27-54.9-5.1-76.9c19.4-19.4,50.7-20.1,70.9-1.4V14h-84.1c-46.2,0-84.1,37.9-84.1,84.1v171C135.5,282.7,140.5,319.4,117.7,339.6L117.7,339.6z M89.3,278.7c-25.6,0-38.5,31.1-20.4,49.2s49.2,5.2,49.2-20.4C118.2,291.6,105.3,278.7,89.3,278.7L89.3,278.7z M242,245.4c-20.6,0-37.2,16.7-37.2,37.2c0,20.6,16.6,37.2,37.2,37.2s37.2-16.7,37.2-37.2S262.6,245.4,242,245.4z M264.6,336.7h-45.1c-28,0-51,23-51,51v18.8h147v-18.8C315.5,359.7,292.6,336.7,264.6,336.7z M394.6,278.7c-25.6,0-38.5,31.1-20.4,49.2s49.2,5.2,49.2-20.4C423.5,291.6,410.6,278.7,394.6,278.7L394.6,278.7z M321.7,146.6c-3.9,0-7-3.1-7-7s3.1-7,7-7h22.8c3.9,0,7,3.1,7,7s-3.1,7-7,7H321.7z M330.6,231.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h13.8c3.9,0,7,3.1,7,7s-3.1,7-7,7H330.6z M321.7,188.8c-3.9,0-7-3.1-7-7s3.1-7,7-7h22.8c3.9,0,7,3.1,7,7s-3.1,7-7,7H321.7z M139.9,273.4c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H139.9z M139.9,231.3c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H139.9z M139.9,189.2c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H139.9z M229.4,189.2c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H229.4z M184.6,189.2c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H184.6z M139.9,147.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H139.9z M229.4,147.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H229.4z M184.6,147.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H184.6z M139.9,105c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H139.9z M229.4,105c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H229.4z M184.6,105c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H184.6z M229.4,62.9c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H229.4z M184.6,62.9c-3.9,0-7-3.1-7-7s3.1-7,7-7h15.9c3.9,0,7,3.1,7,7s-3.1,7-7,7H184.6z M14,456.6h456v-36.1H14V456.6z"></path>
              </svg>
              <span>COMPANY</span>
            </Link>
          </li>
          <li>
            <Link to="/offers">
              <svg viewBox="0 0 23.808 23.824">
                <path id="sell_FILL0_wght200_GRAD0_opsz48"
                  d="M16.029,29.493a.965.965,0,0,0,1.454,0L29.477,17.532a1.566,1.566,0,0,0,.248-.4,1.024,1.024,0,0,0,.083-.4V7.024A1.015,1.015,0,0,0,28.783,6H19.069a1.247,1.247,0,0,0-.4.066.927.927,0,0,0-.363.231L6.348,18.226a1.247,1.247,0,0,0-.347.81.91.91,0,0,0,.314.743Zm.694-.694L7.009,19.085l12.06-12.06h9.714v9.714Zm8.69-17.215a1.121,1.121,0,0,1-.843-.363,1.165,1.165,0,0,1-.347-.826,1.147,1.147,0,0,1,.347-.843,1.109,1.109,0,0,1,.81-.347,1.219,1.219,0,0,1,.876.33,1.094,1.094,0,0,1,.347.826,1.2,1.2,0,0,1-.347.859,1.121,1.121,0,0,1-.843.363ZM28.783,7.024Z"
                  transform="translate(-6 -6)"></path>
              </svg>
              <span>OFFERS</span>
            </Link>
          </li>
          <li></li>
          <li>
            <Link to="/gallery">
              <svg viewBox="0 0 25.037 25.037">
                <path id="photo_library_FILL0_wght200_GRAD0_opsz48"
                  d="M15.1,22.127H27.729l-3.9-5.192-3.792,4.75L17.6,18.813Zm-2.32,5.155a2.011,2.011,0,0,1-2.025-2.025V8.025A2.011,2.011,0,0,1,12.781,6H30.012a2.011,2.011,0,0,1,2.025,2.025V25.256a2.011,2.011,0,0,1-2.025,2.025Zm0-1.1H30.012a.822.822,0,0,0,.608-.295.906.906,0,0,0,.276-.626V8.025a.95.95,0,0,0-.884-.884H12.781a.906.906,0,0,0-.626.276.822.822,0,0,0-.295.608V25.256a1.021,1.021,0,0,0,.92.92Zm-3.756,4.86A2.011,2.011,0,0,1,7,29.012V10.639H8.141V29.012a.95.95,0,0,0,.884.884H27.4v1.141Zm2.835-23.9v0Z"
                  transform="translate(-7 -6)"></path>
              </svg>
              <span>Gallery</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={toggleMobileMenu}>
              <svg viewBox="0 0 27 15">
                <g id="Group_386" transform="translate(-0.311)">
                  <rect id="Rectangle_9" width="27" height="1" transform="translate(0.311)"></rect>
                  <rect id="Rectangle_10" width="27" height="1" transform="translate(0.311 7)"></rect>
                  <rect id="Rectangle_11" width="27" height="1" transform="translate(0.311 14)"></rect>
                </g>
              </svg>
              <span>Menu</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;