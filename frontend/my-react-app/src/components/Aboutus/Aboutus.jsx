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

            {/* HERO SECTION - Content updated, structure same */}
            <section className="A-hero-section" ref={heroRef}>
                <div className="A-hero-gradient"></div>
                
                <div className="A-container A-pb-5 A-mb-4 mb-4 pb-5">
                    <div className="A-hero-content">
                        <div className="A-hero-subtitle" data-reveal>
                            <span className="A-gold-accent">Excellence in Construction Materials Since 2008</span>
                        </div>

                        <h1 className="A-hero-title" data-reveal data-delay="200">
                            <span className="A-title-line">Sree Sai Shambhavi Enterprises</span>
                            <span className="A-title-line A-gold-accent">(GNG Group)</span>
                        </h1>

                        <p className="A-hero-desc" data-reveal data-delay="400">
                            We are a leading supplier and manufacturer of ceiling systems, GI roofing sheets and GI channels, and a trusted dealer for premium ceiling and paint brands. We provide end-to-end solutions for residential and commercial interiors — from gypsum & POP ceilings to waterproofing, paints and roof sheets — backed by trained installers and reputed brand partnerships.
                        </p>

                       
                    </div>
                </div>

                {/* Performance Stats - Same structure, updated numbers */}
                <div className="A-hero-stats">
                    <div className="A-container">
                        <div className="A-stats-grid">
                            {[
                                { label: 'Years Experience', target: 15, suffix: '+' },
                                { label: 'Premium Brands', target: 10, suffix: '+' },
                                { label: 'Projects Completed', target: 1000, suffix: '+' },
                                { label: 'Products Range', target: 50, suffix: '+' }
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

            {/* STORY SECTION - Repurposed as BRANDS SECTION */}
            <section id="A-story" className="A-section A-story-section">
                <div className="A-container">
                    <div className="A-section-header">
                        <span className="A-section-label" data-reveal>Our Partnerships</span>
                        <h2 className="A-section-title" data-reveal data-delay="100">
                            Authorized Dealer for<br />Premium Brands
                        </h2>
                    </div>

                    <div className="A-story-grid">
                        <div className="A-story-visual" data-reveal>
                            <div className="A-image-frame">
                                <img 
                                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="GNG Group Premium Materials"
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
                                    title: 'Premium Brand Partnerships',
                                    desc: 'Authorized dealer for leading brands including Saint-Gobain Gyproc, USG Boral, JSW Paints, Asian Paints, Armstrong, Jindal, Everest, and other premium manufacturers.'
                                },
                                {
                                    title: 'Quality Assurance',
                                    desc: 'Every product we supply comes with proper certifications and quality checks, ensuring you get the best materials for your construction and interior projects.'
                                },
                                {
                                    title: 'Complete Solutions',
                                    desc: 'From ceiling systems and paints to wall solutions and roofing materials, we provide comprehensive interior solutions under one roof.'
                                }
                            ].map((item, index) => (
                                <div key={index} className="A-story-block" data-reveal data-delay={(index + 2) * 100}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}

                            <div className="A-story-cta" data-reveal data-delay="500">
                                <a href="/products" className="A-btn A-btn-ghost">
                                    <span>View Our Products</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PHILOSOPHY SECTION - Repurposed as PRODUCTS SECTION */}
            <section className="A-section A-philosophy-section">
                <div className="A-container">
                    <div className="A-section-header A-center">
                        <span className="A-section-label" data-reveal>Our Products</span>
                        <h2 className="A-section-title" data-reveal data-delay="100">
                            Complete Interior Solutions
                        </h2>
                        <p className="A-section-desc" data-reveal data-delay="200">
                            Everything you need for construction and interior projects
                        </p>
                    </div>

                    <div className="A-principles-grid">
                        {[
                            {
                                icon: (
                                    <i className="fas fa-grip-vertical"></i>
                                ),
                                title: 'Ceiling Systems',
                                desc: 'Gypsum ceilings, POP ceilings, 2x2 mineral acoustic tiles, PVC ceilings, fiber cement ceilings, and complete installation services.'
                            },
                            {
                                icon: (
                                    <i className="fas fa-paint-roller"></i>
                                ),
                                title: 'Paints & Coatings',
                                desc: 'Interior & exterior paints, texture work, enamel finishes, waterproofing solutions, primers, and sealants from premium brands.'
                            },
                            {
                                icon: (
                                    <i className="fas fa-th-large"></i>
                                ),
                                title: 'Wall Solutions',
                                desc: 'Wall coverings, laminates, false wall systems, tiles, marble/granite stone cladding, and partition systems.'
                            },
                            {
                                icon: (
                                    <i className="fas fa-home"></i>
                                ),
                                title: 'Roofing & Structural',
                                desc: 'GI roofing sheets, colored roofing, GI channels, ceiling channels, suspension systems, and structural solutions.'
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

            {/* WHO WE ARE SECTION - Content updated, structure same */}
            <section className="A-section A-who-section">
                <div className="A-container">
                    <div className="A-who-wrapper">
                        {/* Content Column */}
                        <div className="A-who-content">
                            <span className="A-who-label" data-reveal>WHO WE ARE</span>
                            <h2 className="A-who-title" data-reveal data-delay="100">
                                Gypsum 'N' Gypsum Group<br />Your Trusted Partner
                            </h2>
                            
                            <p className="A-who-desc" data-reveal data-delay="200">
                                Operating as GNG Paints, Gypsum 'N' Gypsum, and Sree Sai Shambhavi Enterprises, we have established ourselves as premier suppliers and manufacturers in the construction materials industry. Our commitment to quality, timely delivery, and customer satisfaction drives everything we do.
                            </p>

                            <div className="A-who-features">
                                <div className="A-feature-item" data-reveal data-delay="300">
                                    <div className="A-feature-icon">
                                        <i className="fas fa-industry"></i>
                                    </div>
                                    <div className="A-feature-content">
                                        <h4>Manufacturing & Supply</h4>
                                        <p>Direct manufacturers of GI roofing sheets and channels, and authorized suppliers of premium ceiling systems, paints, and building materials.</p>
                                    </div>
                                </div>

                                <div className="A-feature-item" data-reveal data-delay="400">
                                    <div className="A-feature-icon">
                                        <i className="fas fa-tools"></i>
                                    </div>
                                    <div className="A-feature-content">
                                        <h4>Professional Installation</h4>
                                        <p>Expert installation services for gypsum/POP/PVC ceilings, painting works, wall coverings, and complete interior solutions.</p>
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
                                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="GNG Group Ceiling Installation"
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
                                            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Paint Color Samples"
                                            loading="lazy"
                                        />
                                        <div className="A-image-overlay-shape"></div>
                                    </div>
                                    
                                    <div className="A-small-image A-small-image-2" data-reveal data-delay="150">
                                        <img 
                                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Construction Materials"
                                            loading="lazy"
                                        />
                                        <div className="A-image-overlay-shape"></div>
                                    </div>
                                    
                                    <div className="A-small-image A-small-image-3" data-reveal data-delay="200">
                                        <img 
                                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Roofing Materials"
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

            {/* PROCESS SECTION - Repurposed as SERVICES SECTION */}
            <section className="A-section A-process-section">
                <div className="A-container">
                    <div className="A-section-header A-center">
                        <span className="A-section-label" data-reveal>Our Services</span>
                        <h2 className="A-section-title" data-reveal data-delay="100">
                            Complete Solution<br />From Supply to Installation
                        </h2>
                    </div>

                    <div className="A-process-timeline">
                        {[
                            { number: '01', title: 'Consultation & Quotation', desc: 'Understanding your requirements and providing detailed quotations' },
                            { number: '02', title: 'Material Supply', desc: 'Timely delivery of premium quality construction materials' },
                            { number: '03', title: 'Professional Installation', desc: 'Expert installation by trained technicians and installers' },
                            { number: '04', title: 'Quality Assurance', desc: 'Final inspection and handover with quality guarantee' }
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

            {/* CTA SECTION - Content updated, structure same */}
            <section className="A-section A-cta-section">
                <div className="A-container">
                    <div className="A-cta-content" data-reveal>
                        <h1 className="text-white mb-4 pb-4 w-100">
                            Ready to Start Your<br />Construction Project?
                        </h1>
                        <p className="A-cta-desc" data-reveal data-delay="100">
                            Contact us for free consultation, quotations, or to visit our showroom. Get premium materials and professional installation services.
                        </p>
                        <div className="A-cta-actions" data-reveal data-delay="200">
                            <a href="/contact" className="A-btn A-btn-primary A-btn-large">
                                <span>Request Quotation</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </a>
                            <a href="tel:+91924660909" className="A-btn A-btn-secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.24 8.69 6.45 9.06 7.57C9.18 7.92 9.09 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                                </svg>
                                <span>Call Now</span>
                            </a>
                        </div>
                        
                        {/* Contact Info in same layout */}
                        <div className="A-cta-contact-info" data-reveal data-delay="300">
                            <div className="A-cta-contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <h4 className='text-black fs-2 mt-3 pt-3'>Email Us</h4>
                                    <div className='text-white'>gypsumngypsum4u@gmail.com</div>
                                </div>
                            </div>
                            <div className="A-cta-contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div >
                                    <h4 className='text-black fs-2 mt-3 pt-3'>Visit Our Showroom</h4>
                                    <span className='text-white'>RTC Complex Road, Opp. Jio Petrol Bunk, V L Puram, Rajahmundry</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Aboutus;