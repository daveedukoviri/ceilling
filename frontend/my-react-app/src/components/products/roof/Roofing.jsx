import React, { useEffect, } from 'react';
import '../ceilings/Ceilings.css'; // You might want to rename or keep as Ceilings.css if using same styles
import { Link, useNavigate } from 'react-router-dom';




const Roof = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Hero load animations
        const animateHero = () => {
            const elements = [
                '.hero-badge',
                '.hero-title',
                '.hero-subtitle',
                '.hero-description',
                '.hero-stats',
                '.hero-cta',
                '.hero-image-container',
            ];

            elements.forEach((selector, index) => {
                const el = document.querySelector(selector);
                if (el) {
                    setTimeout(() => {
                        el.classList.add('animate-fade-in-up');
                        if (selector === '.hero-image-container') {
                            el.classList.add('animate-fade-in');
                        }
                    }, index * 200);
                }
            });
        };

        animateHero();

        // Scroll animations for kitchen sections
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const kitchen = entry.target;
                        kitchen.classList.add('in-view');

                        // Animate CONTENT from LEFT (all text elements)
                        const contentEls = [
                            kitchen.querySelector('.kitchen-badge'),
                            kitchen.querySelector('.kitchen-title'),
                            kitchen.querySelector('.kitchen-description'),
                            ...kitchen.querySelectorAll('.feature-item'),
                            kitchen.querySelector('.kitchen-cta'),
                        ];

                        contentEls.forEach((el, i) => {
                            if (el) {
                                setTimeout(() => el.classList.add('animate-slide-in-left'), i * 100);
                            }
                        });

                        // Animate GALLERY from RIGHT (main image + thumbnails) — in parallel!
                        const galleryEls = [
                            kitchen.querySelector('.main-gallery'),
                            kitchen.querySelector('.thumbnail-grid'),
                        ];

                        galleryEls.forEach((el, i) => {
                            if (el) {
                                setTimeout(() => el.classList.add('animate-slide-in-right'), i * 150);
                            }
                        });
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        document.querySelectorAll('.kitchen-type').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Thumbnail click → change main image smoothly
    const handleThumbnailClick = (e) => {
        const thumbnail = e.currentTarget;
        const gallery = thumbnail.closest('.kitchen-gallery');
        const mainImg = gallery.querySelector('.main-gallery img');

        if (!mainImg) return;

        mainImg.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        mainImg.style.transform = 'scale(1.08)';
        mainImg.style.opacity = '0.6';

        setTimeout(() => {
            mainImg.src = thumbnail.src;
            mainImg.alt = thumbnail.alt;
            mainImg.style.transform = 'scale(1)';
            mainImg.style.opacity = '1';
        }, 250);

        // Reset all thumbnails
        gallery.querySelectorAll('.thumbnail-grid img').forEach(img => {
            img.style.borderColor = 'transparent';
            img.style.transform = 'translateY(0) scale(1)';
            img.style.boxShadow = 'none';
        });

        // Highlight active
        thumbnail.style.borderColor = 'var(--classic-gold)';
        thumbnail.style.transform = 'translateY(-5px) scale(1.05)';
        thumbnail.style.boxShadow = '0 15px 35px rgba(197, 165, 114, 0.25)';
    };

    // CTA button feedback
    const handleCTAClick = (e) => {
        navigate('/gallery');
    };

    return (
        <div id='ceiling'>

            {/* Fast, Light & Sentimental Hero Section */}
            <section className="hero-section-new">
                <div className="container hero-container-new">
                    {/* Left Content */}
                    <div className="hero-content-new">
                        <div className="hero-badge-new fast-fade">
                            <i className="fas fa-crown"></i>  Gypsum ‘N’ Gypsum Premium Roofing Solutions
                        </div>

                        <h1 className="hero-title-new fast-fade">
                            Protect Your Home. <span>Elevate Your Roof.</span>
                        </h1>

                        <p className="hero-subtitle-new fast-fade">
                            Top Roofing Solutions for Modern Houses
                        </p>

                        <p className="hero-description-new fast-fade">
                            For years, Gypsum ‘N’ Gypsum has been providing reliable and premium roofing solutions that offer superior protection, durability, and aesthetic appeal. From modern metal sheets to classic clay tiles, translucent polycarbonate, and advanced waterproof membranes, we deliver roofs that withstand the elements while enhancing your home's beauty.
                        </p>
                        <p className="hero-description-new fast-fade">
                            As authorized dealers for leading brands, we ensure high-quality materials, expert installation, and customized designs. Your roof is more than just coverage — it's the ultimate shield and crown of your home.
                        </p>

                        {/* Stats Section */}
                        <div className="hero-stats-new fast-fade">
                            <div className="stat-item-new">
                                <i className="fas fa-building"></i>
                                <div>
                                    <h3>15+ Years</h3>
                                    <p>Industry Experience</p>
                                </div>
                            </div>
                            <div className="stat-item-new">
                                <i className="fas fa-medal"></i>
                                <div>
                                    <h3>10+ Brands</h3>
                                    <p>Authorized Partner</p>
                                </div>
                            </div>
                            <div className="stat-item-new">
                                <i className="fas fa-home"></i>
                                <div>
                                    <h3>1000+ Projects</h3>
                                    <p>Completed</p>
                                </div>
                            </div>
                        </div>

                        <Link to='/contacts'>
                            <button className="hero-cta-new fast-fade" >
                                <i className="fas fa-phone-alt"></i> Get  Consultation
                            </button>
                        </Link>
                    </div>

                    {/* Right Image – Quick float in */}
                    <div className="hero-image-wrapper fast-float">
                        <div className="hero-image-container-new">
                            <img
                                src="https://www.cupapizarras.com/wp-content/uploads/2024/10/readyslate-project-.jpg"
                                alt="Modern house with premium roofing materials"
                                className="hero-image-new"
                            />
                            <div className="image-overlay-gradient"></div>
                        </div>

                        <div className="floating-badge quick-pulse">
                            <i className="fas fa-award"></i>
                            <span>Authorized Dealer for Premium Roofing Brands</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* Showcase Section */}
            <section className="showcase-section" id="ceilings">
                <div className="container">
                    <div className="showcase-header">
                        <h2>Premium Roofing Solutions </h2>
                        {/* Beautiful Simple Underline */}
                        {/* <div className="elegant-underline"></div> */}
                    </div>

                    <div className="kitchen-showcase ">
                        {/* 1. Metal Roofing */}
                        <div className="kitchen-type island-kitchen" id="gypsum">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Most Popular Modern Choice</span>
                                <h2 className="kitchen-title"> Roofing</h2>
                                <p className="kitchen-description">
                                    The top choice for contemporary homes, metal roofing provides exceptional longevity, weather resistance, and energy efficiency. Lightweight, low-maintenance, and available in various styles, it's perfect for modern houses seeking durability and a sleek appearance.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Extreme Durability</h4>
                                            <p>Lasts 50+ years and resists harsh weather</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-leaf"></i></div>
                                        <div className="feature-content">
                                            <h4>Energy Efficient</h4>
                                            <p>Reflects sunlight, keeping your home cooler</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-weight-hanging"></i></div>
                                        <div className="feature-content">
                                            <h4>Lightweight</h4>
                                            <p>Reduces structural load and easy installation</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-recycle"></i></div>
                                        <div className="feature-content">
                                            <h4>Eco-Friendly</h4>
                                            <p>Often made from recycled materials and fully recyclable</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://f.hubspotusercontent30.net/hubfs/6069238/images/blogs/top-ten-benefits-standing-seam.jpg" alt="Standing Seam Metal Roofing" />
                                    <div className="gallery-overlay">
                                        <h4>Modern Standing Seam Roof</h4>
                                        <p>Sleek metal roofing on a contemporary house</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/r2.webp" alt="Metal roofing design 2" onClick={handleThumbnailClick} />
                                    <img src="services/r3.webp" alt="Metal roofing design 3" onClick={handleThumbnailClick} />
                                    <img src="services/r4.webp" alt="Metal roofing design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                       
                       
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Roof;