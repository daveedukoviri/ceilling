import './Aboutus.css';
import { useEffect, useRef } from 'react';

function Aboutus(){
    const heroRef = useRef(null);

    // Scroll reveal animation
    useEffect(() => {
        const revealOnScroll = () => {
            const reveals = document.querySelectorAll('.reveal');
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };

        // Parallax effect for hero section
        const parallaxEffect = () => {
            if (heroRef.current) {
                const scrollPosition = window.pageYOffset;
                heroRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
        };

        // Combined scroll handler
        const handleScroll = () => {
            revealOnScroll();
            parallaxEffect();
        };

        // Initial check on mount
        revealOnScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Animate stats on load (runs once when component mounts)
    useEffect(() => {
        const animateStats = () => {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const targetText = stat.textContent.trim();
                const target = parseInt(targetText.replace(/\D/g, '')); // Extract number (e.g., 500 from "500+")
                const hasPlus = targetText.includes('+');
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 20);
            });
        };

        animateStats();

        // Page load fade-in effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }, []);

    // Team member hover effect (using mouse events on each member)
    useEffect(() => {
        const members = document.querySelectorAll('.team-member');
        const handleMouseEnter = (e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.transition = 'transform 0.4s ease';
        };
        const handleMouseLeave = (e) => {
            e.currentTarget.style.transform = 'translateY(0)';
        };

        members.forEach(member => {
            member.addEventListener('mouseenter', handleMouseEnter);
            member.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            members.forEach(member => {
                member.removeEventListener('mouseenter', handleMouseEnter);
                member.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Smooth scrolling for anchor links (if any # links exist)
    useEffect(() => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        const handleClick = (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        };

        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleClick);
        });

        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleClick);
            });
        };
    }, []);

    return (
        <>
        
    <section className="hero-section" ref={heroRef}>
        <div className="container">
            <div className="hero-content">
                <div className="hero-subtitle">Crafting Excellence Since 2008</div>
                <h1 className="hero-title serif-font">Where Art Meets Architecture</h1>
                <p className="hero-description">
                    DLIFE Interiors transforms spaces into timeless sanctuaries. With over 15 years of design excellence, we create environments that inspire, comfort, and reflect the essence of those who inhabit them.
                </p>
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">15</div>
                        <div className="stat-label">Years of Excellence</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Awards Won</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">8</div>
                        <div className="stat-label">Cities Served</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="scroll-indicator">
            <div className="scroll-line"></div>
        </div>
    </section>

   
    <section className="story-section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="story-image-container reveal">
                        <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                             alt="Our Design Studio" className="story-image" />
                        <div className="story-image-overlay"></div>
                        <div className="year-badge">
                            <div className="year-number">2008</div>
                            <div className="year-label">Founded</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="story-content reveal">
                        <span className="section-tag">Our Legacy</span>
                        <h2 className="section-title">The Art of Creating Spaces</h2>
                        <p className="section-text">
                            Founded with a vision to redefine luxury living, DLIFE Interiors began as a small studio in Kochi. Our passion for creating spaces that tell stories has grown into a legacy of design excellence spanning across India.
                        </p>
                        <p className="section-text">
                            We believe that great design is not just about aesthetics—it's about creating environments that enhance lives. Each project is a collaborative journey, blending client vision with our expertise to create spaces that are both beautiful and functional.
                        </p>
                        <p className="section-text">
                            Our approach combines traditional craftsmanship with contemporary design principles, resulting in spaces that are timeless yet modern, luxurious yet livable.
                        </p>
                        <a href="/process" className="btn-gold mt-4">Our Design Process</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="philosophy-section">
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-8 text-center">
                    <span className="section-tag reveal">Our Approach</span>
                    <h2 className="section-title reveal" style={{transitionDelay: "0.1s"}}>Design Philosophy</h2>
                    <p className="section-text reveal" style={{transitionDelay: "0.2s"}}>
                        We believe in creating spaces that are not just visually stunning, but also deeply personal and functional.
                    </p>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="philosophy-card reveal">
                        <div className="philosophy-icon">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3 className="mb-3">Innovation</h3>
                        <p>We constantly push boundaries, exploring new materials, technologies, and design concepts to create unique, forward-thinking spaces.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="philosophy-card reveal" style={{transitionDelay: "0.1s"}}>
                        <div className="philosophy-icon">
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3 className="mb-3">Craftsmanship</h3>
                        <p>Every detail matters. We work with master artisans and craftsmen to ensure impeccable quality and attention to detail in every project.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="philosophy-card reveal" style={{transitionDelay: "0.2s"}}>
                        <div className="philosophy-icon">
                            <i className="fas fa-leaf"></i>
                        </div>
                        <h3 className="mb-3">Sustainability</h3>
                        <p>We design with the future in mind, prioritizing eco-friendly materials and sustainable practices to create spaces that respect our planet.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="team-section">
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-8 text-center">
                    <span className="section-tag reveal">Meet Our Team</span>
                    <h2 className="section-title reveal" style={{transitionDelay: "0.1s"}}>Creative Visionaries</h2>
                    <p className="section-text reveal" style={{transitionDelay: "0.2s"}}>
                        Our team of designers, architects, and craftsmen bring together diverse perspectives and unparalleled expertise.
                    </p>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-md-6">
                    <div className="team-member reveal">
                        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                             alt="Sarah Chen" className="team-image" />
                        <div className="team-overlay">
                            <h3 className="team-name">Sarah Chen</h3>
                            <div className="team-role">Founder & Creative Director</div>
                            <div className="team-social">
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="team-member reveal" style={{transitionDelay: "0.1s"}}>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                             alt="Rajesh Kumar" className="team-image" />
                        <div className="team-overlay">
                            <h3 className="team-name">Rajesh Kumar</h3>
                            <div className="team-role">Head of Design</div>
                            <div className="team-social">
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="team-member reveal" style={{transitionDelay: "0.2s"}}>
                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                             alt="Priya Sharma" className="team-image " />
                        <div className="team-overlay">
                            <h3 className="team-name">Priya Sharma</h3>
                            <div className="team-role">Project Director</div>
                            <div className="team-social">
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="team-member reveal" style={{ transitionDelay: '0.3s' }}>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                             alt="Michael Rodriguez" className="team-image" />
                        <div className="team-overlay">
                            <h3 className="team-name">Michael Rodriguez</h3>
                            <div className="team-role">Sustainability Director</div>
                            <div className="team-social">
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    <section className="values-section">
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-8 text-center">
                    <span className="section-tag reveal">Our Foundation</span>
                    <h2 className="section-title reveal" style={{transitionDelay: "0.1s"}}>Core Values</h2>
                    <p className="section-text reveal" style={{transitionDelay: "0.2s"}}>
                        These principles guide every decision we make and every space we create.
                    </p>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-md-6">
                    <div className="value-item reveal">
                        <div className="value-number">01</div>
                        <div className="value-icon-container">
                            <i className="fas fa-users value-icon"></i>
                        </div>
                        <h4 className="mb-3">Client-Centric</h4>
                        <p>Your vision is our starting point. We listen, understand, and create spaces that truly reflect you.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="value-item reveal" style={{transitionDelay: "0.1s"}}>
                        <div className="value-number">02</div>
                        <div className="value-icon-container">
                            <i className="fas fa-star value-icon"></i>
                        </div>
                        <h4 className="mb-3">Excellence</h4>
                        <p>We pursue perfection in every detail, from initial concept to final installation.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="value-item reveal" style={{transitionDelay: "0.2s"}}>
                        <div className="value-number">03</div>
                        <div className="value-icon-container">
                            <i className="fas fa-handshake value-icon"></i>
                        </div>
                        <h4 className="mb-3">Integrity</h4>
                        <p>Transparent communication and honest collaboration are at the heart of everything we do.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="value-item reveal" style={{ transitionDelay: '0.3s' }}>
                        <div className="value-number">04</div>
                        <div className="value-icon-container">
                            <i className="fas fa-seedling value-icon"></i>
                        </div>
                        <h4 className="mb-3">Sustainability</h4>
                        <p>We design for the future, creating spaces that are beautiful, functional, and environmentally responsible.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="cta-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="cta-title reveal">Ready to Transform Your Space?</h2>
                    <p className="cta-description reveal" style={{transitionDelay: "0.1s"}}>
                        Begin your journey with DLIFE Interiors. Let's create a space that tells your story, reflects your personality, and elevates your everyday living.
                    </p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <a href="/contact" className="btn-gold reveal" style={{transitionDelay: "0.2s"}}>
                            Book a Consultation
                        </a>
                        <a href="/portfolio" className="btn-outline-gold reveal" style={{ transitionDelay: '0.3s' }}>
                            View Our Work
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Aboutus;