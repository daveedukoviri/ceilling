import React, { useState, useEffect, useRef } from 'react';
import './Body.css'; // We'll extract the CSS separately

import dealer1 from '../../assets/img/dealers/1.png';
import dealer2 from '../../assets/img/dealers/2.jpg';
import dealer3 from '../../assets/img/dealers/3.jpg';
import dealer4 from '../../assets/img/dealers/4.png';
import dealer5 from '../../assets/img/dealers/5.jpg';
import dealer6 from '../../assets/img/dealers/6.jpg';
import dealer7 from '../../assets/img/dealers/7.jpg';
import dealer8 from '../../assets/img/dealers/8.png';
import dealer9 from '../../assets/img/dealers/9.webp';
import dealer10 from '../../assets/img/dealers/10.jpg';
import dealer11 from '../../assets/img/dealers/11.png';
import dealer12 from '../../assets/img/dealers/12.jpg';
import dealer13 from '../../assets/img/dealers/13.jpg';


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

  // Hero Carousel Data
  const slides = [
    {
      backgroundImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Timeless Elegance, Modern Craftsmanship',
      description: 'Discover the art of sophisticated living with our premium collection of curated designs that blend tradition with contemporary aesthetics.',
      buttonText: 'Explore Our Collections',
      buttonLink: '#about'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Artisan Quality, Unmatched Expertise',
      description: 'Where traditional craftsmanship meets contemporary design excellence, creating spaces that inspire and endure for generations.',
      buttonText: 'View Our Work',
      buttonLink: '#testimonials'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Elevating Spaces Since 1985',
      description: 'Three decades of creating extraordinary interiors that tell your story and reflect your unique personality and lifestyle.',
      buttonText: 'Our Heritage',
      buttonLink: '#contact'
    }
  ];

  // About Features Data
  const aboutFeatures = [
    { icon: 'fas fa-award', title: 'Award-Winning', description: '15+ international design awards' },
    { icon: 'fas fa-users', title: 'Expert Team', description: '25+ professional designers & craftsmen' },
    { icon: 'fas fa-building', title: 'Global Projects', description: '300+ completed projects worldwide' },
    { icon: 'fas fa-handshake', title: 'Trusted Partners', description: '50+ premium brand collaborations' }
  ];

  // Gallery Data
  const galleryProjects = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Luxury Living Room',
      description: 'Contemporary design with premium materials',
      category: 'residential luxury',
      tags: ['Residential']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Corporate Office Space',
      description: 'Productivity-focused design with natural elements',
      category: 'commercial modern',
      tags: ['Commercial']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Minimalist Kitchen Design',
      description: 'Clean lines with functional elegance',
      category: 'residential modern',
      tags: ['Residential']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Hotel Lobby',
      description: 'Grand entrance with bespoke furnishings',
      category: 'commercial luxury',
      tags: ['Commercial']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Master Bedroom Suite',
      description: 'Tranquil sanctuary with custom joinery',
      category: 'residential luxury',
      tags: ['Residential']
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Creative Studio Space',
      description: 'Innovative design inspiring creativity',
      category: 'commercial modern',
      tags: ['Commercial']
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Heritage Design Co.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      text: '"Working with Elegant Living transformed our vision into reality. Their attention to detail and commitment to quality is unmatched. The final result exceeded our expectations in every way possible."',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Director, Urban Architects',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      text: '"The level of professionalism and creativity brought to our project was exceptional. They listened to our needs and delivered beyond what we imagined. Our new office space has completely transformed our company culture."',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'Founder, Modern Living Spaces',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      text: '"From the initial consultation to the final delivery, the process was smooth and transparent. Their expertise in balancing aesthetics with functionality is remarkable."',
      rating: 4.5
    },
    {
      name: 'David Miller',
      role: 'Managing Director, TechCorp Inc.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      text: '"Their team transformed our outdated office into a modern, inspiring workspace. Productivity has increased by 30% since the redesign. Worth every penny!"',
      rating: 5
    },
    {
      name: 'Sophia Williams',
      role: 'Interior Design Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      text: '"We\'ve worked with many designers over the years, but none have shown the level of dedication and creativity as this team. Our home is now our sanctuary."',
      rating: 5
    },
    {
      name: 'Robert Kim',
      role: 'Creative Director, Innovation Labs',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      text: '"The attention to lighting and acoustics has made a significant difference in our daily work experience. Truly a transformative design approach."',
      rating: 5
    }
  ];

  // Dealers Data
  const dealers = [

    { logo: dealer1, icon: 'fa-medal', width: '150px' },
    { logo: dealer2, icon: 'fa-award', width: '150px' },
    { logo: dealer3, icon: 'fa-trophy', width: '150px' },
    { logo: dealer4, icon: 'fa-gem', width: '150px' },
    { logo: dealer5, icon: 'fa-heart', width: '120px' },
    { logo: dealer6, icon: 'fa-hammer', width: '150px' },
    { logo: dealer7, icon: 'fa-trophy', width: '120px' },
    { logo: dealer8, icon: 'fa-heart', width: '130px' },
    { logo: dealer9, icon: 'fa-star', width: '130px' },
    { logo: dealer10, icon: 'fa-hammer', width: '110px' },
    { logo: dealer11, icon: 'fa-trophy', width: '110px' },
    { logo: dealer12, icon: 'fa-leaf', width: '110px' },
    { logo: dealer13, icon: 'fa-medal', width: '110px' }

  ];
  // FAQ Data
  const faqItems = [
    {
      question: 'What is the typical timeline for a complete interior design project?',
      answer: 'The timeline varies based on the scope and complexity of the project. A standard residential project typically takes 3-6 months from initial consultation to final installation. Commercial projects may range from 6 months to 1 year. We provide a detailed project timeline during our initial consultation phase.'
    },
    {
      question: 'How do you approach sustainability in your designs?',
      answer: 'Sustainability is at the core of our design philosophy. We prioritize locally-sourced materials, energy-efficient solutions, and non-toxic finishes. We work with certified sustainable vendors and incorporate elements like natural lighting, proper insulation, and timeless design to ensure longevity and reduce environmental impact.'
    },
    {
      question: 'What is your fee structure for design services?',
      answer: 'We offer flexible pricing models tailored to your project needs: flat fee for complete projects, hourly rates for consultations, and percentage-based for large-scale projects. During our initial consultation, we\'ll discuss your budget and recommend the most appropriate pricing structure. All fee structures are transparent with no hidden costs.'
    },
    {
      question: 'Do you work with clients outside your local area?',
      answer: 'Yes, we regularly work with clients nationally and internationally. Our remote design process includes virtual consultations, detailed digital presentations, and coordination with local contractors. We\'ve successfully completed projects across North America, Europe, and Asia, maintaining the same quality and attention to detail regardless of location.'
    },
    {
      question: 'What sets your design studio apart from others?',
      answer: 'Our unique approach combines three decades of heritage craftsmanship with innovative design thinking. We offer: 1) Full-service design from concept to installation, 2) Access to exclusive trade-only resources, 3) A collaborative process that values client input, and 4) Post-project support and maintenance guidance. Our award-winning team ensures every detail reflects your vision while enhancing functionality.'
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

  // Testimonial Functions
  const nextTestimonial = () => {
    const maxIndex = Math.ceil(testimonials.length / cardsPerView) - 1;
    if (currentTestimonialIndex < maxIndex) {
      setCurrentTestimonialIndex(prev => prev + 1);
    } else {
      setCurrentTestimonialIndex(0);
    }
  };

  const prevTestimonial = () => {
    if (currentTestimonialIndex > 0) {
      setCurrentTestimonialIndex(prev => prev - 1);
    } else {
      const maxIndex = Math.ceil(testimonials.length / cardsPerView) - 1;
      setCurrentTestimonialIndex(maxIndex);
    }
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
  return (
    <div className="body-content">
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

      {/* 2. ABOUT SECTION */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">About Our Studio</h2>
          <p className="section-subtitle">
            For over three decades, we've been transforming spaces into experiences, blending artistry with functionality.
          </p>

          <div className="about-container">
            <div className="about-image-container">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Our Design Studio"
                className="about-image"
              />
              <div className="about-badge">Since 1985</div>
            </div>

            <div className="about-content">
              <h2>Crafting Stories Through Design</h2>
              <p>
                At Elegant Living, we believe interiors should be more than just beautiful spaces—they should be
                reflections of the people who inhabit them. Our philosophy combines timeless elegance with
                modern functionality, creating environments that inspire, comfort, and endure.
              </p>
              <p>
                With a team of award-winning designers and craftsmen, we approach each project as a unique
                narrative, weaving together materials, textures, and light to create spaces that tell your story.
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

      {/* 3. GALLERY SECTION */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <h2 className="section-title">Our Portfolio</h2>
          <p className="section-subtitle">
            Explore our curated collection of exquisite interior designs that transform spaces into experiences
          </p>

          {/* Gallery Filter */}
          <div className="gallery-filter">
            {['all', 'residential', 'commercial', 'luxury', 'modern'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => filterGallery(filter)}
                data-filter={filter}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} {filter === 'all' ? 'Projects' : ''}
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
                <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
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
            <a href="#contact" className="cta-button">View Full Portfolio</a>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="section testimonials-section"
        id="testimonials"
        onMouseEnter={() => setIsTestimonialPaused(true)}
        onMouseLeave={() => setIsTestimonialPaused(false)}
      >
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear from our clients about their experiences working with our design team.
          </p>

          <div className="testimonial-container">
            <div
              className="testimonial-track"
              style={{
                transform: `translateX(-${currentTestimonialIndex * (100 / cardsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-rating">
                    {renderRating(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-client">
                    <div className="client-avatar">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                    <div className="client-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonial-controls">
              <button
                className={`testimonial-arrow prev-testimonial ${currentTestimonialIndex === 0 ? 'disabled' : ''}`}
                onClick={prevTestimonial}
                disabled={currentTestimonialIndex === 0}
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="testimonial-nav">
                {[...Array(Math.ceil(testimonials.length / cardsPerView))].map((_, index) => (
                  <div
                    key={index}
                    className={`testimonial-dot ${index === currentTestimonialIndex ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    data-index={index}
                  ></div>
                ))}
              </div>

              <button
                className={`testimonial-arrow next-testimonial ${currentTestimonialIndex >= Math.ceil(testimonials.length / cardsPerView) - 1 ? 'disabled' : ''}`}
                onClick={nextTestimonial}
                disabled={currentTestimonialIndex >= Math.ceil(testimonials.length / cardsPerView) - 1}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEALERS SECTION */}
      <section className="section dealers-section">
        <div className="container">
          <h2 className="section-title">Our Authorized Partners</h2>
          <p className="section-subtitle">
            Partnering with premium brands and showrooms worldwide to bring exceptional design to your doorstep
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
                  <img src={dealer.logo} alt={dealer.name} style={{ width: dealer.width }} />
                </div>
                <div className="dealer-badge">
                  <i className={`fas ${dealer.icon}`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our design process, services, and collaborations.
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


    </div>
  );
};

export default Body;