import './Contact.css';
import { useEffect } from 'react';

function Contact() {

  // Scroll helpers
  const scrollToForm = () => {
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLiveChat = () => {
    alert('Live chat will be available soon. Please call or email us.');
  };

  const navigateToLocation = (lat, lng) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  // Basic form handling (no backend yet)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    e.target.reset();
  };

  return (
    <>
     
    <section className="contact-hero text-center">
        <div className="container">
            <nav aria-label="breadcrumb" className="hero-breadcrumb">
                <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                </ol>
            </nav>
            <h1>Let's Create Your Dream Space Together</h1>
            <p className="lead">Get in touch with our design experts. We're here to listen, understand, and bring your vision to life.</p>
        </div>
    </section>

   
    <section className="contact-container">
        <div className="container">
            <div className="row text-center mb-5">
                <div className="col-12">
                    <h2 className="mb-3">Get in Touch</h2>
                    <p className="lead">Multiple ways to connect with our team</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="contact-card">
                        <div className="contact-icon">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className="contact-info">
                            <h4>Call Us</h4>
                            <p>Speak directly with our design consultants</p>
                            <a href="tel:+911234567890" className="contact-link">
                                <i className="fas fa-phone me-2"></i>
                                +91 123 456 7890
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="contact-card">
                        <div className="contact-icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="contact-info">
                            <h4>Email Us</h4>
                            <p>Send us your queries and ideas</p>
                            <a href="mailto:info@dlifeinteriors.com" className="contact-link">
                                <i className="fas fa-envelope me-2"></i>
                                info@dlifeinteriors.com
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="contact-card">
                        <div className="contact-icon">
                            <i className="fas fa-comments"></i>
                        </div>
                        <div className="contact-info">
                            <h4>Live Chat</h4>
                            <p>Chat instantly with our team</p>
                            <a href="#live-chat" className="contact-link" onclick="openLiveChat()">
                                <i className="fas fa-comment-dots me-2"></i>
                                Start Live Chat
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    <section className="contact-form-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="form-card">
                        <div className="form-header">
                            <h2>Send Us a Message</h2>
                            <p>Fill out the form below and we'll get back to you within 24 hours</p>
                        </div>
                        
                        <form id="contactForm" novalidate>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="firstName" className="form-label">First Name *</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                        <div className="invalid-feedback">
                                            Please enter your first name.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="lastName" className="form-label">Last Name *</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                        <div className="invalid-feedback">
                                            Please enter your last name.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="email" className="form-label">Email Address *</label>
                                        <input type="email" className="form-control" id="email" required />
                                        <div className="invalid-feedback">
                                            Please enter a valid email address.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="phone" className="form-label">Phone Number *</label>
                                        <input type="tel" className="form-control" id="phone" required />
                                        <div className="invalid-feedback">
                                            Please enter your phone number.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="projectType" className="form-label">Project Type *</label>
                                <div className="select-wrapper">
                                    <select className="form-control" id="projectType" required>
                                        <option value="" selected disabled>Select project type</option>
                                        <option value="residential">Residential Interior</option>
                                        <option value="commercial">Commercial Space</option>
                                        <option value="renovation">Home Renovation</option>
                                        <option value="consultation">Design Consultation</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="invalid-feedback">
                                    Please select a project type.
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="propertyType" className="form-label">Property Type</label>
                                <div className="select-wrapper">
                                    <select className="form-control" id="propertyType">
                                        <option value="" selected disabled>Select property type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="villa">Villa</option>
                                        <option value="office">Office</option>
                                        <option value="restaurant">Restaurant</option>
                                        <option value="retail">Retail Store</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="budget" className="form-label">Estimated Budget *</label>
                                <div className="select-wrapper">
                                    <select className="form-control" id="budget" required>
                                        <option value="" selected disabled>Select budget range</option>
                                        <option value="5-10">₹5-10 Lakhs</option>
                                        <option value="10-20">₹10-20 Lakhs</option>
                                        <option value="20-30">₹20-30 Lakhs</option>
                                        <option value="30-50">₹30-50 Lakhs</option>
                                        <option value="50+">₹50 Lakhs +</option>
                                    </select>
                                </div>
                                <div className="invalid-feedback">
                                    Please select your budget range.
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="message" className="form-label">Your Message *</label>
                                <textarea className="form-control" id="message" rows="5" placeholder="Tell us about your project, requirements, and vision..." required></textarea>
                                <div className="invalid-feedback">
                                    Please enter your message.
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="form-check-input" id="newsletter" />
                                    <span>Subscribe to our newsletter for design tips and inspirations</span>
                                </label>
                            </div>

                            <button type="submit" className="submit-btn">
                                <i className="fas fa-paper-plane me-2"></i>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

   
    <section className="map-section">
        <div className="container">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <h2 className="mb-3">Our Offices</h2>
                    <p className="lead">Visit us at any of our studio locations</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div id="map"></div>
                </div>
                <div className="col-lg-6">
                    <div className="location-card">
                        <div className="location-header">
                            <div className="location-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="location-info">
                                <h4>Head Office - Kochi</h4>
                                <span className="location-badge">Main Studio</span>
                            </div>
                        </div>
                        <p><i className="fas fa-map-pin me-2 text-gold"></i> DLIFE Design Studio, MG Road, Kochi, Kerala - 682016</p>
                        <p><i className="fas fa-phone me-2 text-gold"></i> +91 484 123 4567</p>
                        <p><i className="fas fa-clock me-2 text-gold"></i> Mon-Sat: 9:00 AM - 7:00 PM</p>
                        <button className="btn btn-outline-gold mt-3" onclick="navigateToLocation(9.9312, 76.2673)">Get Directions</button>
                    </div>

                    <div className="location-card">
                        <div className="location-header">
                            <div className="location-icon">
                                <i className="fas fa-city"></i>
                            </div>
                            <div className="location-info">
                                <h4>Bangalore Studio</h4>
                                <span className="location-badge">Premium Design Center</span>
                            </div>
                        </div>
                        <p><i className="fas fa-map-pin me-2 text-gold"></i> DLIFE Interiors, Koramangala, Bangalore, Karnataka - 560034</p>
                        <p><i className="fas fa-phone me-2 text-gold"></i> +91 80 4567 8901</p>
                        <p><i className="fas fa-clock me-2 text-gold"></i> Mon-Sat: 10:00 AM - 8:00 PM</p>
                        <button className="btn btn-outline-gold mt-3" onclick="navigateToLocation(12.9716, 77.5946)">Get Directions</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="hours-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="hours-card">
                        <h3 className="mb-4">Studio Hours</h3>
                        <ul className="hours-list">
                            <li className="hours-item">
                                <span className="day">Monday - Friday</span>
                                <span className="time">9:00 AM - 7:00 PM</span>
                            </li>
                            <li className="hours-item">
                                <span className="day">Saturday</span>
                                <span className="time">10:00 AM - 6:00 PM</span>
                            </li>
                            <li className="hours-item">
                                <span className="day">Sunday</span>
                                <span className="time">By Appointment Only</span>
                            </li>
                            <li className="hours-item">
                                <span className="day">Public Holidays</span>
                                <span className="time">Closed</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-muted"><i className="fas fa-info-circle me-2 text-gold"></i>Emergency appointments available outside business hours</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="hours-card">
                        <h3 className="mb-4">Consultation Details</h3>
                        <p><i className="fas fa-check-circle me-2 text-gold"></i> <strong>Initial Consultation:</strong> Free 45-minute session</p>
                        <p><i className="fas fa-check-circle me-2 text-gold"></i> <strong>Site Visit:</strong> Scheduled within 48 hours</p>
                        <p><i className="fas fa-check-circle me-2 text-gold"></i> <strong>Design Proposal:</strong> Delivered within 5-7 working days</p>
                        <p><i className="fas fa-check-circle me-2 text-gold"></i> <strong>Response Time:</strong> Within 24 hours for all inquiries</p>
                        
                        <div className="mt-4">
                            <h5>What to Bring to Consultation:</h5>
                            <ul className="list-unstyled">
                                <li><i className="fas fa-caret-right me-2 text-gold"></i> Property floor plans</li>
                                <li><i className="fas fa-caret-right me-2 text-gold"></i> Inspiration images</li>
                                <li><i className="fas fa-caret-right me-2 text-gold"></i> Budget estimates</li>
                                <li><i className="fas fa-caret-right me-2 text-gold"></i> Timeline requirements</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="faq-section">
        <div className="container">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <h2 className="mb-3">Frequently Asked Questions</h2>
                    <p className="lead">Quick answers to common questions</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    What is the typical timeline for a complete interior design project?
                                </button>
                            </h3>
                            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    The timeline varies based on project scope and complexity. Typically:
                                    <ul>
                                        <li>Small apartments (2BHK): 8-12 weeks</li>
                                        <li>Large homes (4BHK+): 12-20 weeks</li>
                                        <li>Commercial spaces: 10-16 weeks</li>
                                        <li>Renovations: 6-10 weeks</li>
                                    </ul>
                                    This includes design, approval, procurement, and execution phases.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    How much does interior design cost?
                                </button>
                            </h3>
                            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Our pricing is transparent and project-based. Design fees typically range from 10-15% of the total project cost. We offer different packages:
                                    <ul>
                                        <li><strong>Basic Consultation:</strong> Starting from ₹25,000</li>
                                        <li><strong>Full-Service Design:</strong> 10-15% of project cost</li>
                                        <li><strong>Hourly Consultation:</strong> ₹3,500/hour</li>
                                    </ul>
                                    We provide detailed quotes after understanding your requirements.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    Do you work with clients outside your city locations?
                                </button>
                            </h3>
                            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Yes! We offer virtual design services for clients across India and internationally. Our virtual design process includes:
                                    <ul>
                                        <li>Video consultations</li>
                                        <li>Digital mood boards and 3D renderings</li>
                                        <li>Online material selection</li>
                                        <li>Project management via video calls</li>
                                        <li>Local vendor coordination</li>
                                    </ul>
                                    We've successfully completed projects in 15+ cities remotely.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                    What is your design process?
                                </button>
                            </h3>
                            <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Our 6-step process ensures perfection:
                                    <ol>
                                        <li><strong>Discovery:</strong> Initial consultation & site assessment</li>
                                        <li><strong>Concept:</strong> Mood boards & space planning</li>
                                        <li><strong>Design:</strong> Detailed drawings & 3D renderings</li>
                                        <li><strong>Selection:</strong> Material & furniture selection</li>
                                        <li><strong>Execution:</strong> Project management & coordination</li>
                                        <li><strong>Reveal:</strong> Final installation & handover</li>
                                    </ol>
                                    Regular updates keep you informed throughout.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                    Do you handle renovations and structural changes?
                                </button>
                            </h3>
                            <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Absolutely! Our team includes architects and structural engineers who handle:
                                    <ul>
                                        <li>Space reconfiguration</li>
                                        <li>Wall additions/removals</li>
                                        <li>False ceiling designs</li>
                                        <li>Electrical & plumbing layouts</li>
                                        <li>Custom built-ins</li>
                                        <li>Structural reinforcements</li>
                                    </ul>
                                    We obtain all necessary permits and ensure compliance with building codes.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p>Have more questions? <a href="#contactForm" className="text-gold fw-bold">Ask us directly</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="contact-cta">
        <div className="container">
            <h2>Ready to Start Your Design Journey?</h2>
            <p className="lead">Book a complimentary 45-minute consultation with our design director</p>
            <div className="cta-buttons">
                <a href="tel:+911234567890" className="btn btn-white">
                    <i className="fas fa-phone-alt me-2"></i>
                    Call Now
                </a>
                <a href="#contactForm" className="btn btn-outline-white" onclick="scrollToForm()">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Book Appointment
                </a>
            </div>
        </div>
    </section>


    <section className="social-section">
        <div className="container">
            <h3 className="mb-4">Follow Our Design Journey</h3>
            <p>Get daily design inspiration and behind-the-scenes looks at our projects</p>
            <div className="social-links">
                <a href="#" className="social-link" title="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" title="Facebook">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" title="Pinterest">
                    <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="#" className="social-link" title="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" title="YouTube">
                    <i className="fab fa-youtube"></i>
                </a>
            </div>
        </div>
    </section>
    </>
  );
}

/* Reusable card */
function ContactCard({ icon, title, text, action, href, onClick }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="contact-card">
        <div className="contact-icon">
          <i className={`fas ${icon}`}></i>
        </div>
        <h4>{title}</h4>
        <p>{text}</p>
        {href ? (
          <a href={href} className="contact-link">{action}</a>
        ) : (
          <button className="contact-link btn btn-link p-0" onClick={onClick}>
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

export default Contact;
