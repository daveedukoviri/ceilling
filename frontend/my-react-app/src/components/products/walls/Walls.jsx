import React, { useEffect } from 'react';
import '../ceilings/Ceilings.css'; // You might want to rename or keep as Ceilings.css if using same styles
import { Link, useNavigate } from 'react-router-dom';

const Walls = () => {
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

        // Scroll animations for kitchen sections (keeping class names)
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
                            <i className="fas fa-th-large"></i>  Gypsum ‘N’ Gypsum Wall Solutions
                        </div>

                        <h1 className="hero-title-new fast-fade">
                            Beautiful Walls. <span>Lasting Impressions.</span>
                        </h1>

                        <p className="hero-subtitle-new fast-fade">
                            Premium Wall Coverings & Panel Systems
                        </p>

                        <p className="hero-description-new fast-fade">
                             Gypsum ‘N’ Gypsum offers comprehensive wall solutions that transform ordinary spaces into extraordinary environments. From elegant wall coverings to durable paneling systems, we provide the perfect balance of aesthetics, functionality, and durability.
                        </p>
                        <p className="hero-description-new fast-fade">
                            As specialists in interior finishes, we supply and install premium wall systems including laminates, tiles, stone cladding, and decorative panels. Our expertise ensures your walls not only look stunning but also stand the test of time.
                        </p>

                        {/* Stats Section */}
                        <div className="hero-stats-new fast-fade">
                            <div className="stat-item-new">
                                <i className="fas fa-ruler-combined"></i>
                                <div>
                                    <h3>Custom Fit</h3>
                                    <p>Precision Installation</p>
                                </div>
                            </div>
                            <div className="stat-item-new">
                                <i className="fas fa-shield-alt"></i>
                                <div>
                                    <h3>Premium Materials</h3>
                                    <p>Durable & Long-lasting</p>
                                </div>
                            </div>
                            <div className="stat-item-new">
                                <i className="fas fa-palette"></i>
                                <div>
                                    <h3>Endless Designs</h3>
                                    <p>Customizable Options</p>
                                </div>
                            </div>
                        </div>

                        <Link to='/contacts'>
                            <button className="hero-cta-new fast-fade" >
                                <i className="fas fa-phone-alt"></i> Get Wall Consultation
                            </button>
                        </Link>
                    </div>

                    {/* Right Image – Quick float in */}
                    <div className="hero-image-wrapper fast-float">
                        <div className="hero-image-container-new mt-5">
                            <img
                                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Elegant wall paneling and coverings"
                                className="hero-image-new"
                            />
                            <div className="image-overlay-gradient"></div>
                        </div>

                        <div className="floating-badge quick-pulse">
                            <i className="fas fa-award"></i>
                            <span>Complete Wall Solution Providers</span>
                        </div>
                    </div>
                </div>

                <div className="hero-bg-pattern"></div>
            </section>


            {/* Showcase Section */}
            <section className="showcase-section" id="walls">
                <div className="container">
                    <div className="showcase-header">
                        <h2>Premium Wall Solutions</h2>
                        {/* Beautiful Simple Underline */}
                        <div className="elegant-underline"></div>
                    </div>

                    <div className="kitchen-showcase">
                        {/* 1. Wall Coverings   wc*/}
                        <div className="kitchen-type island-kitchen" id="coverings">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Most Popular</span>
                                <h2 className="kitchen-title">Wall Coverings</h2>
                                <p className="kitchen-description">
                                    Transform your walls with our premium wall coverings that offer elegant finishes,
                                    easy maintenance, and endless design possibilities. From vinyl to fabric, wood veneers
                                    to metallic finishes, we provide solutions for every style and budget.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-broom"></i></div>
                                        <div className="feature-content">
                                            <h4>Easy Maintenance</h4>
                                            <p>Wipe-clean surfaces that resist stains and scratches</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-expand"></i></div>
                                        <div className="feature-content">
                                            <h4>Seamless Installation</h4>
                                            <p>Professional installation for seamless, joint-free surfaces</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tint-slash"></i></div>
                                        <div className="feature-content">
                                            <h4>Moisture Resistant</h4>
                                            <p>Ideal for kitchens, bathrooms, and high-humidity areas</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-palette"></i></div>
                                        <div className="feature-content">
                                            <h4>Design Variety</h4>
                                            <p>Thousands of patterns, textures, and color options</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/walls/wc1.webp" alt="Wall Coverings" />
                                    <div className="gallery-overlay">
                                        <h4>Premium Wall Covering</h4>
                                        <p>Textured wall covering in contemporary living space</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/walls/wc2.webp" alt="Wall covering design 2" onClick={handleThumbnailClick} />
                                    <img src="services/walls/wc3.webp" alt="Wall covering design 3" onClick={handleThumbnailClick} />
                                    <img src="services/walls/wc4.webp" alt="Wall covering design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 2. Wall Paneling  wp*/}
                        <div className="kitchen-type lshape-kitchen" id="paneling">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/walls/wp2.webp" alt="Wall Paneling" />
                                    <div className="gallery-overlay">
                                        <h4>3D Wall Panels</h4>
                                        <p>Geometric paneling creating depth and visual interest</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/walls/wp.webp" alt="Wall paneling design 2" onClick={handleThumbnailClick} />
                                    <img src="services/walls/wp3.webp" alt="Wall paneling design 3" onClick={handleThumbnailClick} />
                                    <img src="services/walls/wp4.webp" alt="Wall paneling design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Architectural</span>
                                <h2 className="kitchen-title">Wall Paneling</h2>
                                <p className="kitchen-description">
                                    Create stunning feature walls with our premium wall paneling systems. From classic wood
                                    panels to modern 3D designs, our paneling adds texture, depth, and architectural interest
                                    to any space.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-cube"></i></div>
                                        <div className="feature-content">
                                            <h4>3D Effects</h4>
                                            <p>Create depth and dimension with geometric patterns</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tree"></i></div>
                                        <div className="feature-content">
                                            <h4>Wood & Veneer</h4>
                                            <p>Natural wood and premium veneer options</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-th-large"></i></div>
                                        <div className="feature-content">
                                            <h4>Modular Design</h4>
                                            <p>Easy installation with interlocking panel systems</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-volume-up"></i></div>
                                        <div className="feature-content">
                                            <h4>Acoustic Properties</h4>
                                            <p>Sound-absorbing panels for noise reduction</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Panels <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 3. Tiles & Stone Cladding  ts*/}
                        <div className="kitchen-type ushape-kitchen d-none" id="tiles">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Durable</span>
                                <h2 className="kitchen-title">Tiles & Stone Cladding</h2>
                                <p className="kitchen-description">
                                    Elevate your spaces with our premium tiles and natural stone cladding. From elegant marble
                                    and granite to modern porcelain and ceramic tiles, we offer durable, beautiful solutions
                                    for walls that make a statement.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-gem"></i></div>
                                        <div className="feature-content">
                                            <h4>Natural Stone</h4>
                                            <p>Marble, granite, and slate for luxury finishes</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>High Durability</h4>
                                            <p>Resistant to scratches, stains, and moisture</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-sun"></i></div>
                                        <div className="feature-content">
                                            <h4>Heat Resistant</h4>
                                            <p>Ideal for kitchen backsplashes and fireplace surrounds</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-broom"></i></div>
                                        <div className="feature-content">
                                            <h4>Easy Cleaning</h4>
                                            <p>Non-porous surfaces that wipe clean easily</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Collection <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/walls/ts1.webp" alt="Stone Cladding" />
                                    <div className="gallery-overlay">
                                        <h4>Natural Stone Wall</h4>
                                        <p>Stacked stone cladding for rustic elegance</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/walls/ts2.webp" alt="Tile & stone cladding design 2" onClick={handleThumbnailClick} />
                                    <img src="services/walls/ts3.webp" alt="Tile & stone cladding design 3" onClick={handleThumbnailClick} />
                                    <img src="services/walls/ts4.webp" alt="Tile & stone cladding design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Laminates l1 */}
                        <div className="kitchen-type parallel-kitchen" id="laminates">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/walls/l1.webp" alt="Laminate Walls" />
                                    <div className="gallery-overlay">
                                        <h4>Decorative Laminates</h4>
                                        <p>High-pressure laminates in wood and abstract patterns</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/walls/l2.webp" alt="Laminate design 2" onClick={handleThumbnailClick} />
                                    <img src="services/walls/l3.webp" alt="Laminate design 3" onClick={handleThumbnailClick} />
                                    <img src="services/walls/l4.webp" alt="Laminate design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Versatile</span>
                                <h2 className="kitchen-title">Decorative Laminates</h2>
                                <p className="kitchen-description">
                                    Our premium laminates offer the beauty of natural materials with enhanced durability
                                    and easier maintenance. Available in wood grains, solid colors, metallic finishes,
                                    and abstract patterns for unlimited design possibilities.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tree"></i></div>
                                        <div className="feature-content">
                                            <h4>Wood Look</h4>
                                            <p>Realistic wood grains without maintenance of real wood</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Scratch Resistant</h4>
                                            <p>Durable surface resists scratches and impacts</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tint-slash"></i></div>
                                        <div className="feature-content">
                                            <h4>Moisture Proof</h4>
                                            <p>Ideal for kitchens, bathrooms, and commercial spaces</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-fire"></i></div>
                                        <div className="feature-content">
                                            <h4>Fire Retardant</h4>
                                            <p>Special fire-rated options available for safety</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Laminates <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 5. False Wall Systems f1*/}
                        <div className="kitchen-type galley-kitchen" id="falsewalls">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Functional</span>
                                <h2 className="kitchen-title">False Wall Systems</h2>
                                <p className="kitchen-description">
                                    Create flexible, functional spaces with our false wall systems. Perfect for concealing
                                    utilities, creating storage, dividing spaces, or adding insulation. Customizable solutions
                                    for residential and commercial applications.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-boxes"></i></div>
                                        <div className="feature-content">
                                            <h4>Concealed Storage</h4>
                                            <p>Create hidden storage compartments and shelves</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-plug"></i></div>
                                        <div className="feature-content">
                                            <h4>Utility Concealment</h4>
                                            <p>Hide electrical, plumbing, and HVAC systems neatly</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-volume-mute"></i></div>
                                        <div className="feature-content">
                                            <h4>Sound Insulation</h4>
                                            <p>Improve acoustics with sound-insulating materials</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-snowflake"></i></div>
                                        <div className="feature-content">
                                            <h4>Thermal Insulation</h4>
                                            <p>Add energy efficiency with insulated wall systems</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Systems <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/walls/f1.webp" alt="False Wall Systems" />
                                    <div className="gallery-overlay">
                                        <h4>Modular False Wall</h4>
                                        <p>Custom false wall with integrated storage and lighting</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/walls/f2.webp" alt="False wall design 2" onClick={handleThumbnailClick} />
                                    <img src="services/walls/f3.webp" alt="False wall design 3" onClick={handleThumbnailClick} />
                                    <img src="services/walls/f4.webp" alt="False wall design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 6. Partition Systems p1*/}
                        <div className="kitchen-type peninsula-kitchen" id="partitions">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/walls/p1.webp" alt="Partition Systems" />
                                    <div className="gallery-overlay">
                                        <h4>Professional Partition Systems</h4>
                                        <p>Cement board, gypsum board, and PVC partition solutions</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/walls/p2.webp" alt="Partition design 2" onClick={handleThumbnailClick} />
                                    <img src="services/walls/p3.webp" alt="Partition design 3" onClick={handleThumbnailClick} />
                                    <img src="services/walls/p4.webp" alt="Partition design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Space Division</span>
                                <h2 className="kitchen-title">Partition Systems</h2>
                                <p className="kitchen-description">
                                    Professional partition solutions for dividing spaces efficiently. We specialize in three main types of partitions as per your requirements: Cement board partitions for durability, Gypsum board partitions for flexibility, and PVC partitions for moisture resistance.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Cement Board Partitions</h4>
                                            <p>High-strength, moisture-resistant partitions for durability and fire safety</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-expand-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Gypsum Board Partitions</h4>
                                            <p>Lightweight, flexible partitions with smooth finishes and sound insulation</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tint-slash"></i></div>
                                        <div className="feature-content">
                                            <h4>PVC Partitions</h4>
                                            <p>100% waterproof, easy-to-clean partitions ideal for bathrooms and wet areas</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tools"></i></div>
                                        <div className="feature-content">
                                            <h4>Custom Installation</h4>
                                            <p>Professional measurement, cutting, and installation for perfect fit</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Partitions <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Walls;