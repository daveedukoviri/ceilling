import './Contact.css';
import { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [activeFaqIndex, setActiveFaqIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        materialType: '',
        projectType: '',
        quantity: '',
        services: [],
        message: '',
        urgent: false
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    // Update this URL based on your backend server
    const API_URL = 'https://ceilling.onrender.com/api';

    const faqItems = [
        {
            question: 'What is your delivery timeline for receiving materials?',
            answer: 'Our delivery timeline is efficient and reliable: Standard orders within Rajahmundry are delivered within 24-48 hours. Bulk orders require 2-3 working days, while specialty materials may take 3-5 working days. For emergency  requirements, we offer same-day delivery service. Exact delivery timelines are provided with your quotation.'
        },
        {
            question: 'Are you authorized dealers for the brands you sell?',
            answer: 'Yes, we are authorized dealers for all major Premium material brands including Saint-Gobain Gyproc, USG Boral, JSW Paints, and Armstrong. All products come with genuine manufacturer warranties and quality certificates. We maintain direct relationships with manufacturers to ensure authentic products and best prices.'
        },
        {
            question: 'Do you provide installation services along with material supply?',
            answer: 'Absolutely! We provide professional installation services for all materials we supply: Gypsum & POP ceiling installation, interior/exterior painting services, wall paneling & cladding installation, GI roofing sheet installation, and waterproofing solutions. Our team of trained installers ensures perfect execution with proper tools and techniques.'
        },
        {
            question: 'What is your pricing structure for materials and services?',
            answer: 'We offer competitive and transparent pricing: Retail customers get standard market rates with quality assurance. Contractors & builders receive special wholesale rates. Bulk orders (above 5000 sq.ft) qualify for discounted package rates. Installation services are quoted separately based on project scope, with detailed breakdowns provided in our quotations.'
        },
        {
            question: 'Do you provide technical support and site visits?',
            answer: 'Yes, we provide comprehensive technical support including: Free site visits for projects above 1000 sq.ft, technical consultation for material selection, accurate quantity estimation and BOQ preparation, on-site installation guidance, and post-installation warranty support. Our technical team is available throughout Rajahmundry and surrounding areas.'
        },
        {
            question: 'What types of payments do you accept?',
            answer: 'We accept multiple payment methods for customer convenience: Cash payments at our showroom, bank transfers (NEFT/RTGS/IMPS), credit/debit cards, UPI payments (Google Pay, PhonePe, Paytm), and cheque payments (subject to clearance). For large projects, we offer flexible payment schedules as per project milestones.'
        },
        {
            question: 'Do you offer material warranties and after-sales support?',
            answer: 'Yes, all materials come with manufacturer warranties: Gypsum boards - 1-5 years depending on type, Paints - 5-10 years for premium ranges, GI sheets - 10-15 years corrosion warranty, Installation services - 1-year workmanship warranty. Our after-sales team assists with warranty claims and provides maintenance guidance.'
        },
        {
            question: 'Can you handle urgent requirements or emergency orders?',
            answer: 'Yes, we have a dedicated emergency response team for urgent  material requirements. Emergency orders placed before 4 PM are delivered the same day within Rajahmundry. We maintain strategic stock of essential materials for immediate dispatch. Our 24/7 helpline (+91 92466 09090) handles emergency  needs.'
        },
        {
            question: 'Do you work with contractors and builders on large projects?',
            answer: 'Yes, we specialize in contractor and builder partnerships. We offer: Special wholesale rates for bulk purchases, staggered delivery as per required schedule, technical support for site teams, customized billing cycles, and priority service for ongoing projects. We have successfully supplied materials for residential complexes, commercial buildings, and industrial projects.'
        },
        {
            question: 'What makes Gypsum N Gypsum different from other material suppliers?',
            answer: 'Gypsum N Gypsum stands out with: 1) 15+ years of industry experience in Rajahmundry, 2) Authorized dealerships for premium brands, 3) Complete solution from supply to installation, 4) Expert technical consultation and site support, 5) Emergency service availability, and 6) Strong relationships with contractors and builders across East Godavari district.'
        }
    ];

    const toggleFaq = (index) => {
        setActiveFaqIndex(activeFaqIndex === index ? -1 : index);
    };

    // CHANGES START HERE: Updated handleInputChange function
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'urgent') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'checkbox') {
            const serviceId = e.target.id;
            setFormData(prev => {
                if (checked) {
                    return { ...prev, services: [...prev.services, serviceId] };
                } else {
                    return { ...prev, services: prev.services.filter(s => s !== serviceId) };
                }
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            // Clear error when user starts typing
            if (formErrors[name]) {
                setFormErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    // NEW: Form validation function
    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone)) errors.phone = 'Please enter a valid Indian phone number';
        if (!formData.materialType) errors.materialType = 'Material type is required';
        if (!formData.quantity) errors.quantity = 'Please select quantity range';
        if (!formData.message.trim()) errors.message = 'Project details are required';
        else if (formData.message.trim().length < 10) errors.message = 'Please provide more details (minimum 10 characters)';

        return errors;
    };

    // UPDATED: handleSubmit function with API integration
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);

            // Scroll to first error
            const firstErrorField = Object.keys(errors)[0];
            document.getElementById(firstErrorField)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return;
        }

        setLoading(true);
        setSubmitStatus(null);
        setFormErrors({});

        try {
            const response = await axios.post(`${API_URL}/contact/submit`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: response.data.message,
                    referenceId: response.data.data?.referenceId
                });

                // Reset form
                setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    materialType: '',
                    projectType: '',
                    quantity: '',
                    services: [],
                    message: '',
                    urgent: false
                });

                // Reset checkboxes
                ['supplyOnly', 'withInstallation', 'consultation', 'siteVisit'].forEach(id => {
                    const checkbox = document.getElementById(id);
                    if (checkbox) checkbox.checked = false;
                });

                // Scroll to success message
                setTimeout(() => {
                    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);

            } else {
                throw new Error(response.data.message || 'Submission failed');
            }

        } catch (error) {
            console.error('Submission error:', error);

            let errorMessage = 'Failed to submit your request. Please try again.';
            if (error.response?.data?.errors) {
                // Server validation errors
                const serverErrors = {};
                error.response.data.errors.forEach(err => {
                    serverErrors[err.field] = err.message;
                });
                setFormErrors(serverErrors);
                errorMessage = 'Please fix the errors above.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message.includes('Network Error')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            }

            setSubmitStatus({
                type: 'error',
                message: errorMessage
            });

        } finally {
            setLoading(false);
        }
    };

    // Keep existing helper functions
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

    return (
        <div id='contact'>
            {/* NEW: Status Alert Component */}
            {submitStatus && (
                <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show m-3`} role="alert" style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    maxWidth: '400px'
                }}>
                    {submitStatus.message}
                    {submitStatus.referenceId && (
                        <div className="mt-2">
                            <small>Reference ID: <strong>{submitStatus.referenceId}</strong></small>
                        </div>
                    )}
                    <button type="button" className="btn-close" onClick={() => setSubmitStatus(null)}></button>
                </div>
            )}

            <section className="contact-hero text-center">
                <div className="container">
                    <nav aria-label="breadcrumb" className="hero-breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                        </ol>
                    </nav>
                    <h1>Let's Build Your Dream Space Together</h1>
                    <p className="lead">Get in touch with our  materials experts. We're here to provide premium quality materials and professional installation services.</p>
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
                                    <p className='small'>Speak directly with our material consultants</p>
                                    <div className="phone-numbers">
                                        <a href="tel:+919246609090" className="contact-link d-block mb-1">
                                            <i className="fas fa-phone me-2"></i>
                                            +91 92466 09090
                                        </a>
                                    </div>
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
                                    <p className='small'>Send us your material inquiries and orders</p>
                                    <div className="email-addresses">
                                        <a href="mailto:gypsumngypsum4u@gmail.com" className="contact-link d-block">
                                            <i className="fas fa-envelope me-2"></i>
                                            gypsumngypsum4u@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="contact-card">
                                <div className="contact-icon">
                                    <i className="fas fa-comments"></i>
                                </div>
                                <div className="contact-info">
                                    <h4>WhatsApp Business</h4>
                                    <p className='small'>Chat instantly for quick quotations</p>
                                    <a href="https://wa.me/919246609090" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <i className="fab fa-whatsapp me-2"></i>
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UPDATED FORM SECTION */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="form-card">
                                <div className="form-header">
                                    <h2>Request Quotation</h2>
                                    <p>Fill out the form below for material quotations and installation services</p>
                                </div>

                                <form id="contactForm" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name" className="form-label">Name *</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {formErrors.name && (
                                                    <div className="invalid-feedback d-block">
                                                        {formErrors.name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="company" className="form-label">Company Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email" className="form-label">Email Address *</label>
                                                <input
                                                    type="email"
                                                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {formErrors.email && (
                                                    <div className="invalid-feedback d-block">
                                                        {formErrors.email}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="phone" className="form-label">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {formErrors.phone && (
                                                    <div className="invalid-feedback d-block">
                                                        {formErrors.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="materialType" className="form-label">Material Type *</label>
                                        <div className="select-wrapper">
                                            <select
                                                className={`form-control ${formErrors.materialType ? 'is-invalid' : ''}`}
                                                id="materialType"
                                                name="materialType"
                                                value={formData.materialType}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select material type</option>
                                                <option value="Ceiling Systems">Ceiling Systems</option>
                                                <option value="Paints & Coatings">Paints & Coatings</option>
                                                <option value="Wall Solutions">Wall Solutions</option>
                                                <option value="Roofing Materials">Roofing Materials</option>
                                                <option value="Waterproofing">Waterproofing</option>
                                                <option value="Multiple Materials">Multiple Materials</option>
                                            </select>
                                        </div>
                                        {formErrors.materialType && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.materialType}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="projectType" className="form-label">Project Type</label>
                                        <div className="select-wrapper">
                                            <select
                                                className="form-control"
                                                id="projectType"
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select project type</option>
                                                <option value="Residential">Residential</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Industrial">Industrial</option>
                                                <option value="Contractor Supply">Contractor Supply</option>
                                                <option value="Retail Purchase">Retail Purchase</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="quantity" className="form-label">Estimated Quantity *</label>
                                        <div className="select-wrapper">
                                            <select
                                                className={`form-control ${formErrors.quantity ? 'is-invalid' : ''}`}
                                                id="quantity"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select quantity range</option>
                                                <option value="Small Project (Up to 500 sq.ft)">Small Project (Up to 500 sq.ft)</option>
                                                <option value="Medium Project (500-2000 sq.ft)">Medium Project (500-2000 sq.ft)</option>
                                                <option value="Large Project (2000-5000 sq.ft)">Large Project (2000-5000 sq.ft)</option>
                                                <option value="Commercial Scale (5000+ sq.ft)">Commercial Scale (5000+ sq.ft)</option>
                                                <option value="Bulk Order">Bulk Order</option>
                                            </select>
                                        </div>
                                        {formErrors.quantity && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.quantity}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Services Required</label>
                                        <div className="checkbox-group">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="supplyOnly"
                                                    checked={formData.services.includes('supplyOnly')}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label" htmlFor="supplyOnly">
                                                    Material Supply Only
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="withInstallation"
                                                    checked={formData.services.includes('withInstallation')}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label" htmlFor="withInstallation">
                                                    Supply with Installation
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="consultation"
                                                    checked={formData.services.includes('consultation')}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label" htmlFor="consultation">
                                                    Technical Consultation
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="siteVisit"
                                                    checked={formData.services.includes('siteVisit')}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label" htmlFor="siteVisit">
                                                    Site Visit Required
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Project Details *</label>
                                        <textarea
                                            className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                                            id="message"
                                            name="message"
                                            rows="5"
                                            placeholder="Tell us about your project requirements, area, and any specific brand preferences..."
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                        {formErrors.message && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="urgent"
                                                name="urgent"
                                                checked={formData.urgent}
                                                onChange={handleInputChange}
                                            />
                                            <span>This is an urgent requirement</span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-file-invoice me-2"></i>
                                                Request Quotation
                                            </>
                                        )}
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REST OF YOUR SECTIONS REMAIN EXACTLY THE SAME */}
            <section className="map-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h2 className="mb-3">Our Locations</h2>
                            <p className="lead">Visit us at any of our locations</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <div className="col-lg-6 mb-4 mb-lg-0">
                            <div id="map" className="location-map">
                                <div className="map-placeholder">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3815.358644180359!2d81.7751528!3d17.006069399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAwJzIxLjkiTiA4McKwNDYnMzAuNiJF!5e0!3m2!1sen!2sin!4v1767140172484!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-lg-6">
                            <div className="location-card">
                                <div className="location-header">
                                    <div className="location-icon">
                                        <i className="fas fa-building"></i>
                                    </div>
                                    <div className="location-info">
                                        <h4>Head Office – Dowleswaram</h4>
                                        <span className="location-badge">Main Office</span>
                                    </div>
                                </div>

                                <p>
                                    <i className="fas fa-map-pin me-2 text-gold"></i>
                                    Plot No: 21P, Industrial Area, NH-16, Near TVS Trade, Dowleswaram,
                                    East Godavari, Andhra Pradesh – 533125
                                </p>

                                <p>
                                    <i className="fas fa-phone me-2 text-gold"></i>
                                    +91 92466 0909
                                </p>

                                <p>
                                    <i className="fas fa-clock me-2 text-gold"></i>
                                    Mon–Sat: 9:00 AM – 7:00 PM
                                </p>


                            </div>

                            {/* <div className="location-card mt-4">
                                <div className="location-header">
                                    <div className="location-icon">
                                        <i className="fas fa-store"></i>
                                    </div>
                                    <div className="location-info">
                                        <h4>Branch Shop</h4>
                                        <span className="location-badge">Retail Outlet</span>
                                    </div>
                                </div>
                                <p><i className="fas fa-map-pin me-2 text-gold"></i> D. No. 20-3-7, G+1 Building,Ground Floor Shop,Ramachandrarao Peta,Rajahmundry — 533105</p>
                                <p><i className="fas fa-phone me-2 text-gold"></i> +91 92988 03332</p>
                                <p><i className="fas fa-clock me-2 text-gold"></i> Mon-Sat: 9:00 AM - 8:00 PM
                                    <span className=' d-block ms-4 mt-2'> Sunday: 10:00 AM - 6:00 PM</span></p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="hours-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="hours-card">
                                <h3 className="mb-4">Business Hours</h3>
                                <ul className="hours-list">
                                    <li className="hours-item">
                                        <span className="day">Monday - Saturday</span>
                                        <span className="time">9:00 AM - 8:00 PM</span>
                                    </li>
                                    <li className="hours-item">
                                        <span className="day">Sunday</span>
                                        <span className="time">10:00 AM - 6:00 PM</span>
                                    </li>
                                    <li className="hours-item">
                                        <span className="day">Festival Holidays</span>
                                        <span className="time">Closed</span>
                                    </li>
                                    <li className="hours-item">
                                        <span className="day">Emergency Orders</span>
                                        <span className="time">Available 24/7</span>
                                    </li>
                                </ul>
                                <p className="mt-4 text-muted"><i className="fas fa-info-circle me-2 text-gold"></i>Contact us for emergency Complete Roofing and Interior Material Solutionss</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hours-card">
                                <h3 className="mb-4">Our Services</h3>

                                <p>
                                    <i className="fas fa-check-circle me-2 text-gold"></i>
                                    Material Supply

                                </p>

                                <p><span className=''>
                                    <i className="fas fa-check-circle me-2 text-gold"></i>
                                    Premium Interior Materials
                                </span></p>
                                <p>
                                    <span>

                                        <i className="fas fa-check-circle me-2 text-gold"></i>
                                        Ceiling & Roofing Solutions
                                    </span>
                                </p>


                                <p>
                                    <i className="fas fa-check-circle me-2 text-gold"></i>
                                    <strong>Professional Installation:</strong> Expert Installation Services
                                </p>

                                <p>
                                    <i className="fas fa-check-circle me-2 text-gold"></i>
                                    <strong>Technical Consultation:</strong>  Site Assessment
                                </p>

                                <p>
                                    <i className="fas fa-check-circle me-2 text-gold"></i>
                                    <strong>Delivery:</strong> Timely Delivery Across Rajahmundry
                                </p>

                                <p>
                                    <i className="fas fa-check-circle me-2 text-gold"></i>
                                    <strong>Response Time:</strong> Quotations Within 2 Hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section faq-section bg-light" id="faq">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h2 className="mb-3">Frequently Asked Questions</h2>
                            <p className="lead">Quick answers to common questions</p>
                        </div>
                    </div>

                    <div className="faq-container">
                        {faqItems.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
                            >
                                <div className="faq-question" onClick={() => toggleFaq(index)}>
                                    <h3>{faq.question}</h3>
                                    <div className="faq-toggle">
                                        <i className={`fas ${activeFaqIndex === index ? 'fa-times' : 'fa-plus'}`}></i>
                                    </div>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="contact-cta">
                <div className="container">
                    <h2>Ready to Start Your Dream Project?</h2>
                    <p className="lead">Get free consultation and quotation for premium  materials</p>
                    <div className="cta-buttons">
                        <a href="tel:+919246609090" className="btn btn-white">
                            <i className="fas fa-phone-alt me-2"></i>
                            Call Now
                        </a>
                        <button className="btn btn-outline-white" onClick={scrollToForm}>
                            <i className="fas fa-file-invoice me-2"></i>
                            Request Quotation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;