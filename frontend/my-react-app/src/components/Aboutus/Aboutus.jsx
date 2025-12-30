import './Aboutus.css';
import { useEffect, useRef } from 'react';

function Aboutus() {
    const heroRef = useRef(null);
    const cursorRef = useRef(null);

    // Optimized cursor effect
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor || window.innerWidth < 768) return;

        let rafId;
        const updateCursor = (e) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        };

        const handleMouseDown = () => cursor.classList.add('active');
        const handleMouseUp = () => cursor.classList.remove('active');

        document.addEventListener('mousemove', updateCursor, { passive: true });
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Optimized reveal animations
    useEffect(() => {
        let observer;
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        if (revealElements.length > 0 && 'IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('A-revealed');
                        }, parseInt(delay));
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });

            revealElements.forEach(el => observer.observe(el));
        }

        // Smooth page entrance
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.4s ease';
        }, 100);

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    // Optimized number counting animation
    useEffect(() => {
        const animateCounter = (element, target) => {
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                const current = Math.floor(startValue + (target - startValue) * easeProgress);
                element.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('[data-counter]');
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.target);
                        animateCounter(counter, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.A-hero-stats');
        if (statsSection) statsObserver.observe(statsSection);

        return () => statsObserver.disconnect();
    }, []);

    return (
        <>
            {/* Custom Cursor - Hidden on mobile */}
            <div className="A-custom-cursor" ref={cursorRef}></div>

            {/* HERO SECTION */}
            <section className="A-hero-section" ref={heroRef}>
                <div className="A-hero-gradient"></div>
                
                <div className="A-container A-pb-5 A-mb-4 mb-4 pb-5">
                    <div className="A-hero-content">
                        <div className="A-hero-subtitle" data-reveal>
                            <span className="A-gold-accent">Excellence in Design Since 2008</span>
                        </div>

                        <h1 className="A-hero-title" data-reveal data-delay="200">
                            <span className="A-title-line">Where Architecture</span>
                            <span className="A-title-line A-gold-accent">Becomes Art</span>
                        </h1>

                        <p className="A-hero-desc" data-reveal data-delay="400">
                            DLIFE Interiors transforms living spaces into curated experiences. For over a decade, we've been crafting environments that resonate with emotion, purpose, and timeless beauty.
                        </p>

                      
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="A-hero-stats">
                    <div className="A-container">
                        <div className="A-stats-grid">
                            {[
                                { label: 'Projects Completed', target: 500, suffix: '+' },
                                { label: 'Years of Excellence', target: 15 },
                                { label: 'Awards Won', target: 50, suffix: '+' },
                                { label: 'Cities Served', target: 8 }
                            ].map((stat, index) => (
                                <div key={index} className="A-stat-card" data-reveal data-delay={index * 100}>
                                    <div className="A-stat-value">
                                        <span data-counter data-target={stat.target}>0</span>
                                        {stat.suffix && <span className="A-stat-suffix">{stat.suffix}</span>}
                                    </div>
                                    <div className="A-stat-label">{stat.label}</div>
                                    <div className="A-stat-line"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="A-scroll-indicator" data-reveal data-delay="800">
                    <div className="A-scroll-line"></div>
                    <span>Scroll to explore</span>
                </div>
            </section>

            {/* STORY SECTION */}
            <section id="A-story" className="A-section A-story-section">
                <div className="A-container">
                    <div className="A-section-header">
                        <span className="A-section-label" data-reveal>Our Legacy</span>
                        <h2 className="A-section-title" data-reveal data-delay="100">
                            The Art of<br />Creating Spaces
                        </h2>
                    </div>

                    <div className="A-story-grid">
                        <div className="A-story-visual" data-reveal>
                            <div className="A-image-frame">
                                <img 
                                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Our Design Studio"
                                    loading="lazy"
                                    className="A-story-image"
                                />
                                <div className="A-image-overlay"></div>
                                <div className="A-foundation-badge">
                                    <span className="A-badge-year">2008</span>
                                    <span className="A-badge-label">Established</span>
                                </div>
                            </div>
                        </div>

                        <div className="A-story-content">
                            {[
                                {
                                    title: 'Visionary Beginnings',
                                    desc: 'Founded in Kochi with a singular vision to redefine luxury living, DLIFE Interiors began as a passion project that has evolved into a design powerhouse.'
                                },
                                {
                                    title: 'Design Philosophy',
                                    desc: 'We believe great design is an alchemy of aesthetics, functionality, and emotion—each project a narrative woven with attention to detail and timeless elegance.'
                                },
                                {
                                    title: 'Craftsmanship & Innovation',
                                    desc: 'Blending traditional artisanship with cutting-edge technology, we create spaces that are both authentic and forward-thinking, meticulously crafted to perfection.'
                                }
                            ].map((item, index) => (
                                <div key={index} className="A-story-block" data-reveal data-delay={(index + 2) * 100}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}

                            <div className="A-story-cta" data-reveal data-delay="500">
                                <a href="/process" className="A-btn A-btn-ghost">
                                    <span>Explore Our Process</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PHILOSOPHY SECTION */}
            <section className="A-section A-philosophy-section">
                <div className="A-container">
                    <div className="A-section-header A-center">
                        <span className="A-section-label" data-reveal>Design Principles</span>
                        <h2 className="A-section-title" data-reveal data-delay="100">
                            Our Guiding Philosophy
                        </h2>
                        <p className="A-section-desc" data-reveal data-delay="200">
                            Three pillars that define our approach to creating extraordinary spaces
                        </p>
                    </div>

                    <div className="A-principles-grid">
                        {[
                            {
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.78 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" fill="currentColor"/>
                                    </svg>
                                ),
                                title: 'Innovation',
                                desc: 'Pushing boundaries with avant-garde concepts and pioneering techniques that redefine interior design standards.'
                            },
                            {
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                                    </svg>
                                ),
                                title: 'Craftsmanship',
                                desc: 'Masterful execution with attention to every minute detail, ensuring exceptional quality in every project.'
                            },
                            {
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                        <path d="M13 2.05V5H11V2.05C5.94 2.55 2 6.81 2 12C2 17.52 6.48 22 12 22C17.19 22 21.45 18.06 21.95 13H18.92C18.44 16.91 15.53 20 12 20C7.58 20 4 16.42 4 12C4 8.47 7.05 5.56 11 5.08V2.05ZM20.5 11H22.5C22.5 6.5 18.5 2.5 14 2.5V4.5C17.26 4.5 19.97 7.21 20.5 11ZM16 14.5L22 12L16 9.5V14.5Z" fill="currentColor"/>
                                    </svg>
                                ),
                                title: 'Sustainability',
                                desc: 'Eco-conscious designs that respect our planet while creating beautiful, lasting spaces for future generations.'
                            }
                        ].map((principle, index) => (
                            <div 
                                key={index} 
                                className="A-principle-card A-interactive-card"
                                data-reveal 
                                data-delay={index * 150}
                            >
                                <div className="A-principle-icon">{principle.icon}</div>
                                <h3>{principle.title}</h3>
                                <p>{principle.desc}</p>
                                <div className="A-principle-number">0{index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO WE ARE SECTION - FIXED IMAGE ALIGNMENT */}
            <section className="A-section A-who-section">
                <div className="A-container">
                    <div className="A-who-wrapper">
                        {/* Content Column */}
                        <div className="A-who-content">
                            <span className="A-who-label" data-reveal>WHO WE ARE</span>
                            <h2 className="A-who-title" data-reveal data-delay="100">
                                Turning Your Vision<br />Into Reality
                            </h2>
                            
                            <p className="A-who-desc" data-reveal data-delay="200">
                                At DLIFE Interiors, we specialize in transforming ordinary spaces into extraordinary environments. 
                                As your trusted partner in premium interior solutions, we bring decades of expertise and an 
                                unwavering commitment to excellence in every project.
                            </p>

                            <div className="A-who-features">
                                <div className="A-feature-item" data-reveal data-delay="300">
                                    <div className="A-feature-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.29 16.29L5.7 12.7C5.31 12.31 5.31 11.68 5.7 11.29C6.09 10.9 6.72 10.9 7.11 11.29L10 14.17L16.88 7.29C17.27 6.9 17.9 6.9 18.29 7.29C18.68 7.68 18.68 8.31 18.29 8.7L10.7 16.29C10.31 16.68 9.68 16.68 9.29 16.29Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div className="A-feature-content">
                                        <h4>Proudly Awarded & Honored</h4>
                                        <p>Recognized with numerous industry awards for delivering outstanding results and setting new standards in interior excellence.</p>
                                    </div>
                                </div>

                                <div className="A-feature-item" data-reveal data-delay="400">
                                    <div className="A-feature-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div className="A-feature-content">
                                        <h4>Work We've Delivered</h4>
                                        <p>From residential sanctuaries to commercial masterpieces, we bring precision and artistry to every space we touch.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="A-contact-info" data-reveal data-delay="500">
                                <div className="A-contact-bubble">
                                    <div className="A-phone-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.24 8.69 6.45 9.06 7.57C9.18 7.92 9.09 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div className="A-contact-details">
                                        <p className="A-contact-label">Call For Consultation</p>
                                        <a href="tel:+919876543210" className="A-contact-number">
                                            +91 987 654 3210
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Column with Fixed Alignment */}
                        <div className="A-who-gallery">
                            <div className="A-gallery-layout">
                                {/* Main Large Image */}
                                <div className="A-main-image-container" data-reveal>
                                    <div className="A-main-image-frame">
                                        <img 
                                            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Professional interior design work"
                                            loading="lazy"
                                            className="A-main-image"
                                        />
                                        <div className="A-image-glow"></div>
                                    </div>
                                </div>

                                {/* Small Images Grid */}
                                <div className="A-small-images-grid">
                                    <div className="A-small-image A-small-image-1" data-reveal data-delay="100">
                                        <img 
                                            src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Color palette and materials"
                                            loading="lazy"
                                        />
                                        <div className="A-image-overlay-shape"></div>
                                    </div>
                                    
                                    <div className="A-small-image A-small-image-2" data-reveal data-delay="150">
                                        <img 
                                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Design tools and equipment"
                                            loading="lazy"
                                        />
                                        <div className="A-image-overlay-shape"></div>
                                    </div>
                                    
                                    <div className="A-small-image A-small-image-3" data-reveal data-delay="200">
                                        <img 
                                            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Finished wall painting"
                                            loading="lazy"
                                        />
                                        <div className="A-image-overlay-shape"></div>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="A-gallery-decoration">
                                    <div className="A-deco-circle A-deco-1"></div>
                                    <div className="A-deco-circle A-deco-2"></div>
                                    <div className="A-deco-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="A-section A-process-section">
                <div className="A-container">
                    <div className="A-section-header A-center">
                        <span className="A-section-label" data-reveal>Our Process</span>
                        <h2 className="A-section-title" data-reveal data-delay="100">
                            Seamless Journey to<br />Perfection
                        </h2>
                    </div>

                    <div className="A-process-timeline">
                        {[
                            { number: '01', title: 'Consultation', desc: 'Understanding your vision and requirements' },
                            { number: '02', title: 'Design Development', desc: 'Creating tailored design solutions' },
                            { number: '03', title: 'Execution', desc: 'Precision implementation with quality assurance' },
                            { number: '04', title: 'Reveal', desc: 'Final walkthrough and project handover' }
                        ].map((step, index) => (
                            <div 
                                key={index} 
                                className="A-process-step"
                                data-reveal 
                                data-delay={index * 150}
                            >
                                <div className="A-step-number">{step.number}</div>
                                <div className="A-step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                                {index < 3 && <div className="A-step-connector"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="A-section A-cta-section">
                <div className="A-container">
                    <div className="A-cta-content" data-reveal>
                        <h2 className="A-cta-title">
                            Ready to Transform<br />Your Space?
                        </h2>
                        <p className="A-cta-desc" data-reveal data-delay="100">
                            Let's collaborate to create something extraordinary together. Your vision, our expertise—perfect harmony.
                        </p>
                        <div className="A-cta-actions" data-reveal data-delay="200">
                            <a href="/contact" className="A-btn A-btn-primary A-btn-large">
                                <span>Start Your Project</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </a>
                            <a href="tel:+919876543210" className="A-btn A-btn-secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.24 8.69 6.45 9.06 7.57C9.18 7.92 9.09 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                                </svg>
                                <span>Call Now</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Aboutus;