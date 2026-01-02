import React, { useState, useEffect, useRef } from 'react';
import './Body.css'; // We'll extract the CSS separately

import dealer1 from '../../assets/img/dealers/1.webp';
import dealer2 from '../../assets/img/dealers/2.webp';
import dealer3 from '../../assets/img/dealers/3.webp';
import dealer4 from '../../assets/img/dealers/4.webp';
import dealer5 from '../../assets/img/dealers/5.webp';
import dealer6 from '../../assets/img/dealers/6.webp';
import dealer7 from '../../assets/img/dealers/7.webp';
import dealer8 from '../../assets/img/dealers/8.webp';
import dealer9 from '../../assets/img/dealers/9.webp';
import dealer10 from '../../assets/img/dealers/10.webp';
import dealer11 from '../../assets/img/dealers/11.webp';
import dealer12 from '../../assets/img/dealers/12.webp';
import dealer13 from '../../assets/img/dealers/13.webp';


const Body = () => {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Testimonials State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // FAQ State
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  // Gallery State
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Refs
  const slideIntervalRef = useRef(null);
  const testimonialIntervalRef = useRef(null);

  // Hero Carousel Data - Updated with company info
  const slides = [
    {
      backgroundImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Premium Ceiling & Roofing Solutions',
      description: 'Leading supplier and manufacturer of gypsum ceilings, GI roofing sheets, and premium paints for residential and commercial spaces.',
      buttonText: 'Explore Products',
      buttonLink: '#about'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Authorized Dealer for Top Brands',
      description: 'Trusted partner for Saint-Gobain Gyproc, USG Boral, JSW Paints, Armstrong, and other premium ceiling and paint brands.',
      buttonText: 'View Brands',
      buttonLink: '#dealers'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'End-to-End Interior Solutions',
      description: 'From gypsum ceilings to waterproofing, paints, and roof sheets - complete solutions backed by trained professional installers.',
      buttonText: 'Our Services',
      buttonLink: '#contact'
    }
  ];

  // About Features Data - Updated with company info
  const aboutFeatures = [
    { icon: 'fas fa-building', title: 'Manufacturing & Supply', description: 'Quality gypsum ceilings & GI roofing sheets' },
    { icon: 'fas fa-paint-roller', title: 'Authorized Dealer', description: 'Premium ceiling and paint brands' },
    { icon: 'fas fa-tools', title: 'Professional Installation', description: 'Trained installers for all ceiling types' },
    { icon: 'fas fa-handshake', title: 'End-to-End Solutions', description: 'Complete interior solutions from concept to completion' }
  ];

  const galleryProjects = [
    // Ceilings (3 projects - covering different types)
    { id: 1, title: "Modern Gypsum Ceiling", description: "Multi-level gypsum design with integrated LED lighting", image: "services/ceilings/g1.webp", category: "ceiling", tags: ["Gypsum"] },
    { id: 2, title: "Ornate POP Ceiling", description: "Luxurious plaster of Paris with intricate patterns", image: "services/ceilings/p1.webp", category: "ceiling", tags: ["POP"] },
    { id: 3, title: "Waterproof PVC Ceiling", description: "Glossy moisture-resistant panels for bathrooms", image: "services/ceilings/pvc1.webp", category: "ceiling", tags: ["PVC"] },

    // Painting (3 projects - covering Interior, Exterior, Texture)
    { id: 4, title: "Elegant Interior Painting", description: "Smooth premium matte finish in living space", image: "services/paints/i1.webp", category: "painting", tags: ["Interior"] },
    { id: 5, title: "Weather-Resistant Exterior Painting", description: "Durable emulsion protecting against rain and sun", image: "services/paints/e1.webp", category: "painting", tags: ["Exterior"] },
    { id: 6, title: "Decorative Texture Paint", description: "Metallic sand texture on feature wall", image: "services/paints/t1.webp", category: "painting", tags: ["Texture"] },

    // Walls (3 projects - covering different wall systems)
    { id: 7, title: "3D Wall Paneling", description: "Modern geometric panels adding depth and style", image: "services/walls/wp3.webp", category: "walls", tags: ["Paneling"] },
    { id: 8, title: "Natural Stone Cladding", description: "Premium stacked stone for luxurious accent wall", image: "services/walls/ts1.webp", category: "walls", tags: ["Stone"] },
    { id: 9, title: "Decorative Laminates", description: "High-pressure wood grain finish with durability", image: "services/walls/l1.webp", category: "walls", tags: ["Laminates"] },
  ];

  // Testimonials Data - Updated with relevant testimonials
  const testimonials = [
    {
      name: 'Vijay Prasad Kumar ',
      role: 'Building Contractor, Rajahmundry',
      avatar: '/testimonals/t1.webp',
      text: '"GNG Group provided excellent gypsum ceiling materials and professional installation for our residential project. Their attention to detail and quality products exceeded our expectations."',
      rating: 5
    },
    {
      name: 'Prashant Sharma',
      role: 'Commercial Space Owner',
      avatar: '/testimonals/t2.webp',
      text: '"The acoustic ceiling tiles from Sree Sai Shambhavi Enterprises transformed our office space. Great soundproofing and the installation team was very professional."',
      rating: 5
    },
    {
      name: 'Mohan Reddy',
      role: 'Architect, Godavari Designs',
       avatar: '/testimonals/t3.webp',
      text: '"As an authorized dealer for top brands, they provide quality materials. Their GI roofing sheets and channels are durable and perfect for our projects in East Godavari."',
      rating: 4.5
    },
    {
      name: 'Arjun Patel',
      role: 'Homeowner',
       avatar: '/testimonals/t4.webp',
      text: '"Complete painting and waterproofing solution for our home. Used Asian Paints sealants and their team did excellent texture work on walls. Highly recommended!"',
      rating: 5
    },
    {
      name: 'Geetha Nair',
      role: 'Construction Company Director',
       avatar: '/testimonals/t6.webp',
      text: '"We\'ve been sourcing GI channels and suspension systems from them for years. Consistent quality and reliable supply for all our ceiling projects."',
      rating: 5
    }
  ];

  // Dealers Data - Updated with brand logos
  const dealers = [
    { logo: dealer1, icon: 'fa-medal', width: '100%' },
    { logo: dealer2, icon: 'fa-award', width: '100%' },
    { logo: dealer3, icon: 'fa-trophy', width: '100%' },
    { logo: dealer4, icon: 'fa-gem', width: '100%' },
    { logo: dealer5, icon: 'fa-heart', width: '90%' },
    { logo: dealer6, icon: 'fa-hammer', width: '100%' },
    { logo: dealer7, icon: 'fa-trophy', width: '80%' },
    { logo: dealer8, icon: 'fa-heart', width: '100%' },
    { logo: dealer9, icon: 'fa-star', width: '100%' },
    { logo: dealer10, icon: 'fa-hammer', width: '85%' },
    { logo: dealer11, icon: 'fa-trophy', width: '72%' },
    { logo: dealer12, icon: 'fa-leaf', width: '85%' },
    { logo: dealer13, icon: 'fa-medal', width: '100%' }
  ];

  // FAQ Data - Updated with company-specific questions
  const faqItems = [
    {
      question: 'What types of ceiling systems do you offer?',
      answer: 'We offer a complete range of ceiling systems including gypsum ceilings (plain/waterproof/fire-retardant), POP ceilings, 2x2 mineral acoustic ceiling tiles, PVC ceilings, and fiber-cement board ceilings. We also provide all necessary GI channels and suspension systems.'
    },
    {
      question: 'Are you authorized dealers for the brands you represent?',
      answer: 'Yes, we are authorized dealers for premium brands including Saint-Gobain Gyproc, USG Boral, JSW Paints, Armstrong, Everest boards, Hilux, VOX, Diamond Ceilings, and other leading brands in the ceiling and paint industry.'
    },
    {
      question: 'Do you provide installation services along with materials?',
      answer: 'Yes, we offer complete end-to-end solutions. We supply all materials and provide professional installation by our trained team for gypsum/POP/PVC ceilings, painting works, waterproofing, and other interior solutions.'
    },
    {
      question: 'What areas do you serve in Andhra Pradesh?',
      answer: 'We are based in Rajahmundry, East Godavari district and serve the entire Andhra Pradesh region. Our head office is at RTC Complex Road, V L Puram, Rajahmundry with a branch at Ramachandrarao Peta.'
    },
    {
      question: 'Can you provide customized solutions for commercial projects?',
      answer: 'Absolutely! We specialize in both residential and commercial projects. We can provide customized ceiling designs, acoustic solutions for offices, fire-retardant systems for commercial spaces, and complete interior packages including wall paneling and partitions.'
    }
  ];



  // Hero Carousel Functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };


  // FAQ Functions
  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? -1 : index);
  };

  // Gallery Functions
  const filterGallery = (filter) => {
    setActiveFilter(filter);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const showPrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + galleryProjects.length) % galleryProjects.length);
  };

  const showNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % galleryProjects.length);
  };

  // Filter gallery projects based on active filter
  const filteredProjects = galleryProjects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category.includes(activeFilter);
  });

  // Handle window resize for responsive testimonial cards
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 992) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);

    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Auto-rotate hero carousel
  useEffect(() => {
    if (!isCarouselPaused) {
      slideIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [isCarouselPaused]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isTestimonialPaused) {
      testimonialIntervalRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, [isTestimonialPaused, cardsPerView]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Render star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  const navigateToLocation = (lat, lng) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % (testimonials.length - cardsPerView + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="body-content" id='body'>
      {/* 1. HERO CAROUSEL SECTION */}
      <section className="hero-carousel" id="home"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div
              className="slide-background"
              style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
            ></div>
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a href={slide.buttonLink} className="cta-button">{slide.buttonText}</a>
            </div>
          </div>
        ))}

        <div className="carousel-arrows">
          <button className="carousel-arrow prev-arrow" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next-arrow" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="carousel-nav">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* 2. ABOUT SECTION - Updated with company info */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">About GNG Group</h2>
          <p className="section-subtitle">
            Sree Sai Shambhavi Enterprises (GNG Group) - Leading supplier and manufacturer of premium ceiling systems, roofing solutions, and paint products
          </p>

          <div className="about-container">
            <div className="about-image-container">
              <img
                src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1174&auto=format&fit=crop"
                alt="GNG Group Ceiling Solutions"
                className="about-image"
              />
              <div className="about-badge">Trusted Since Years</div>
            </div>

            <div className="about-content">
              <h2>Your Complete Interior Solution Partner</h2>
              <p>
                Sree Sai Shambhavi Enterprises (GNG Group) is a leading manufacturer and supplier of ceiling systems,
                GI roofing sheets and channels, and an authorized dealer for premium ceiling and paint brands.
                We provide end-to-end solutions for residential and commercial interiors.
              </p>
              <p>
                From gypsum & POP ceilings to waterproofing, paints, and roof sheets - our services are backed by
                trained professional installers and partnerships with reputed brands like Saint-Gobain, USG Boral,
                JSW, and Armstrong.
              </p>

              <div className="about-features">
                {aboutFeatures.map((feature, index) => (
                  <div key={index} className="about-feature">
                    <div className="feature-icon">
                      <i className={feature.icon}></i>
                    </div>
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. GALLERY SECTION - Updated */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <h2 className="section-title">Our Project Gallery</h2>
          <p className="section-subtitle">
            Explore our completed projects featuring premium ceiling installations, professional painting finishes, and modern wall systems
          </p>

          {/* Gallery Filter */}
          <div className="gallery-filter">
            {['all', 'ceiling', 'painting', 'walls'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => filterGallery(filter)}
                data-filter={filter}
              >
                {filter === 'all' ? 'All Projects' :
                  filter === 'ceiling' ? 'Ceiling Work' :
                    filter === 'painting' ? 'Painting Projects' : 'Wall Systems'}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="gallery-item"
                data-category={project.category}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <span className="project-tag">{project.tags[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {isLightboxOpen && (
            <div className="lightbox-modal active">
              <div className="lightbox-content">
                <button className="lightbox-close" onClick={closeLightbox}>×</button>
                <button className="lightbox-prev" onClick={showPrevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="lightbox-next" onClick={showNextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="lightbox-image-container">
                  <img
                    src={galleryProjects[currentImageIndex].image}
                    alt={galleryProjects[currentImageIndex].title}
                    className="lightbox-image"
                  />
                  <div className="lightbox-caption">
                    <h3 className="lightbox-title">{galleryProjects[currentImageIndex].title}</h3>
                    <p className="lightbox-description">{galleryProjects[currentImageIndex].description}</p>
                    <span className="lightbox-tag">{galleryProjects[currentImageIndex].tags[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="view-more-container">
            <a href="#contact" className="cta-button">View More Projects</a>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION - MARQUEE */}
      <section className="section testimonials-section" id="testimonials">
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear from our satisfied customers about their experience with our products and services
          </p>

          <div className="testimonial-container">
            <div className="testimonial-track">
              {/* Original testimonials + duplicated for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="testimonial-card">
                  <div className="testimonial-rating">
                    {renderRating(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-client">
                    <div className="client-avatar">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="client-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DEALERS SECTION - Updated */}
      <section className="section dealers-section" id="dealers">
        <div className="container">
          <h2 className="section-title">Our Authorized Brands</h2>
          <p className="section-subtitle">
            Authorized dealer and partner for premium ceiling, paint, and building material brands
          </p>

          <div className="dealers-showcase">
            {dealers.map((dealer, index) => (
              <div key={index} className="dealer-card">
                <div
                  className="dealer-logo"
                  style={{
                    fontFamily: index % 3 === 0 ? "'Cormorant Garamond', serif" : "inherit",
                    fontSize: index === 1 ? "2rem" : "2.2rem",
                    color: index === 7 ? "var(--classic-gold)" : "inherit"
                  }}
                >
                  <img src={dealer.logo} alt={`Brand ${index + 1}`} style={{ width: dealer.width }} />
                </div>
                <div className="dealer-badge">
                  <i className={`fas ${dealer.icon}`}></i>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* 7. FAQ SECTION - Updated */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our products, services, and installation process
          </p>

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

      {/* 8. CONTACT SECTION - Updated with company info */}
      <section className="contact-container" id="contact">
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
                  <p className='small'>Speak directly with our product consultants</p>
                  <a href="tel:+91924660909" className="contact-link">
                    <i className="fas fa-phone me-2"></i>
                    +91 92466 0909
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
                  <p className='small'>Send us your queries and project requirements</p>
                  <a href="mailto:gypsumngypsum4u@gmail.com" className="contact-link">
                    <i className="fas fa-envelope me-2"></i>
                    gypsumngypsum4u@gmail.com
                  </a>

                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-info">
                  <h4>Visit Us</h4>
                  <p className='small'>Visit our office or branch for consultation</p>
                  <a href="#map" className="contact-link">
                    <i className="fas fa-location-dot me-2"></i>
                    Rajahmundry, AP
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT FORM SECTION */}
      <section className="contact-form-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="form-card">
                <div className="form-header">
                  <h2>Request a Quote</h2>
                  <p>Fill out the form below and we'll get back to you within 24 hours</p>
                </div>

                <form id="contactForm" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name *</label>
                        <input type="text" className="form-control" id="firstName" required />
                        <div className="invalid-feedback">
                          Please enter your first name.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name *</label>
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
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input type="email" className="form-control" id="email" required />
                        <div className="invalid-feedback">
                          Please enter a valid email address.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number *</label>
                        <input type="tel" className="form-control" id="phone" required />
                        <div className="invalid-feedback">
                          Please enter your phone number.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="serviceType" className="form-label">Service Required *</label>
                    <div className="select-wrapper">
                      <select className="form-control" id="serviceType" required>
                        <option value="" disabled defaultValue>Select service type</option>
                        <option value="ceiling">Ceiling Installation</option>
                        <option value="roofing">Roofing Solutions</option>
                        <option value="painting">Painting Work</option>
                        <option value="waterproofing">Waterproofing</option>
                        <option value="material">Material Supply Only</option>
                        <option value="consultation">Design Consultation</option>
                      </select>
                    </div>
                    <div className="invalid-feedback">
                      Please select a service type.
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectType" className="form-label">Project Type *</label>
                    <div className="select-wrapper">
                      <select className="form-control" id="projectType" required>
                        <option value="" disabled defaultValue>Select project type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="renovation">Renovation</option>
                      </select>
                    </div>
                    <div className="invalid-feedback">
                      Please select a project type.
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="area" className="form-label">Approximate Area (sq.ft)</label>
                    <input type="text" className="form-control" id="area" placeholder="Enter area in square feet" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Project Details *</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Tell us about your project requirements, location, and any specific materials or brands you prefer..." required></textarea>
                    <div className="invalid-feedback">
                      Please enter project details.
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" className="form-check-input" id="newsletter" />
                      <span>Subscribe to our newsletter for updates on new products and offers</span>
                    </label>
                  </div>

                  <button type="submit" className="submit-btn">
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. MAP & LOCATIONS SECTION - Updated with company addresses */}
      <section className="map-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="mb-3">Our Locations</h2>
              <p className="lead">Visit us at our offices in Rajahmundry</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div id="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3815.358644180359!2d81.7751528!3d17.006069399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAwJzIxLjkiTiA4McKwNDYnMzAuNiJF!5e0!3m2!1sen!2sin!4v1767140172484!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

              </div>
            </div>
            <div className="col-lg-6">
              <div className="location-card">
                <div className="location-header">
                  <div className="location-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="location-info">
                    <h4>Head Office - V L Puram</h4>
                    <span className="location-badge">Main Office</span>
                  </div>
                </div>
                <p><i className="fas fa-map-pin me-2 text-gold"></i> 79-3-3/1, RTC Complex Road, Opp. Jio Petrol Bunk, V L Puram, Rajahmundry, East Godavari, Andhra Pradesh - 533103</p>
                <p><i className="fas fa-phone me-2 text-gold"></i> +91 92466 0909</p>
                <p><i className="fas fa-clock me-2 text-gold"></i> Mon-Sat: 9:00 AM - 7:00 PM</p>
                <button className="btn btn-outline-gold mt-3" onClick={() => navigateToLocation(16.9848, 81.7872)}>
                  <i className="fas fa-directions me-2"></i>
                  Get Directions
                </button>
              </div>

              <div className="location-card">
                <div className="location-header">
                  <div className="location-icon">
                    <i className="fas fa-store"></i>
                  </div>
                  <div className="location-info">
                    <h4>Branch Office - Ramachandrarao Peta</h4>
                    <span className="location-badge">Shop & Display</span>
                  </div>
                </div>
                <p><i className="fas fa-map-pin me-2 text-gold"></i> D. No. 20-3-7, G+1 Building, Ground Floor Shop, Ramachandrarao Peta, Rajahmundry - 533105</p>
                <p><i className="fas fa-phone me-2 text-gold"></i> +91 92060 29497</p>
                <p><i className="fas fa-clock me-2 text-gold"></i> Mon-Sat: 9:30 AM - 7:30 PM</p>
                <button className="btn btn-outline-gold mt-3" onClick={() => navigateToLocation(16.9890, 81.7830)}>
                  <i className="fas fa-directions me-2"></i>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. BUSINESS HOURS SECTION */}
      <section className="hours-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="hours-card">
                <h3 className="mb-4">Business Hours</h3>
                <ul className="hours-list">
                  <li className="hours-item">
                    <span className="day">Monday - Saturday</span>
                    <span className="time">9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">By Appointment Only</span>
                  </li>
                  <li className="hours-item">
                    <span className="day">Festival Holidays</span>
                    <span className="time">Closed</span>
                  </li>
                </ul>
                <p className="mt-4 text-muted">
                  <i className="fas fa-info-circle me-2 text-gold"></i>
                  Emergency service calls available for urgent requirements
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="hours-card"><h3 class="mb-4">Our Services</h3><p><i class="fas fa-check-circle me-2 text-gold"></i> <strong>Material Supply:</strong> Premium construction materials</p><p><i class="fas fa-check-circle me-2 text-gold"></i> <strong>Professional Installation:</strong> Expert installation services</p><p><i class="fas fa-check-circle me-2 text-gold"></i> <strong>Technical Consultation:</strong> Free site assessment</p><p><i class="fas fa-check-circle me-2 text-gold"></i> <strong>Delivery:</strong> Timely delivery across Rajahmundry</p><p><i class="fas fa-check-circle me-2 text-gold"></i> <strong>Response Time:</strong> Quotations within 2 hours</p></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Body;