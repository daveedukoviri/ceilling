import React, { useEffect } from 'react';
import '../ceilings/Ceilings.css'; // You might want to rename or keep as Ceilings.css if using same styles
import { Link , useNavigate} from 'react-router-dom';

const Paints = () => {

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
                            <i className="fas fa-palette"></i> GNG Group Premium Paints
                        </div>

                        <h1 className="hero-title-new fast-fade">
                            Color Your World. <span>Protect Your Space.</span>
                        </h1>

                        <p className="hero-subtitle-new fast-fade">
                            Premium Paint Solutions for Every Surface
                        </p>

                        <p className="hero-description-new fast-fade">
                            Sree Sai Shambhavi Enterprises (GNG Group) brings you the finest paint solutions that combine beauty, durability, and protection. As authorized dealers for leading brands like Asian Paints, JSW, and other premium manufacturers, we offer a complete range of interior, exterior, and specialty paints for every need.
                        </p>
                        <p className="hero-description-new fast-fade">
                            From weather-resistant exterior emulsions to elegant interior finishes, from waterproofing solutions to decorative textures — we provide expert consultation, quality products, and professional application services to transform your spaces.
                        </p>

                        {/* Stats Section */}
                        <div className="hero-stats-new fast-fade">
                            <div className="stat-item-new">
                                <i className="fas fa-building"></i>
                                <div>
                                    <h3>15+ Years</h3>
                                    <p>Paint Expertise</p>
                                </div>
                            </div>
                            <div className="stat-item-new">
                                <i className="fas fa-medal"></i>
                                <div>
                                    <h3>Premium Brands</h3>
                                    <p>Authorized Dealer</p>
                                </div>
                            </div>
                            <div className="stat-item-new">
                                <i className="fas fa-home"></i>
                                <div>
                                    <h3>5000+ Projects</h3>
                                    <p>Completed</p>
                                </div>
                            </div>
                        </div>

                        <Link to="/contact" >
                            <button className="hero-cta-new fast-fade" >
                                <i className="fas fa-phone-alt"></i> Get Color Consultation
                            </button>
                        </Link>
                    </div>

                    {/* Right Image – Quick float in */}
                    <div className="hero-image-wrapper fast-float">
                        <div className="hero-image-container-new">
                            <img
                                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Beautiful paint color samples and application"
                                className="hero-image-new"
                            />
                            <div className="image-overlay-gradient"></div>
                        </div>

                        <div className="floating-badge quick-pulse">
                            <i className="fas fa-award"></i>
                            <span>Authorized Dealer for Asian Paints & More</span>
                        </div>
                    </div>
                </div>

                <div className="hero-bg-pattern"></div>
            </section>


            {/* Showcase Section */}
            <section className="showcase-section" id="paints">
                <div className="container">
                    <div className="showcase-header">
                        <h2>Premium Paint Categories</h2>
                        {/* Beautiful Simple Underline */}
                        <div className="elegant-underline"></div>
                    </div>

                    <div className="kitchen-showcase">
                        {/* 1. Interior Paints */}
                        <div className="kitchen-type island-kitchen" id="interior">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Most Popular</span>
                                <h2 className="kitchen-title">Interior Paints</h2>
                                <p className="kitchen-description">
                                    Transform your living spaces with our premium interior paints that offer stunning finishes,
                                    excellent coverage, and long-lasting beauty. Available in matte, satin, silk, and gloss finishes
                                    to match your style and lighting requirements.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-home"></i></div>
                                        <div className="feature-content">
                                            <h4>Washable & Durable</h4>
                                            <p>Easy to clean, stain-resistant formulas for busy households</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-wind"></i></div>
                                        <div className="feature-content">
                                            <h4>Low Odor</h4>
                                            <p>Low-VOC formulas for healthier indoor air quality</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-paint-roller"></i></div>
                                        <div className="feature-content">
                                            <h4>Excellent Coverage</h4>
                                            <p>One-coat coverage with smooth, even application</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-palette"></i></div>
                                        <div className="feature-content">
                                            <h4>Vast Color Range</h4>
                                            <p>Thousands of shades with custom color matching</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Colors <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/paints/i1.webp" alt="Interior Paint Application" />
                                    <div className="gallery-overlay">
                                        <h4>Elegant Interior Finish</h4>
                                        <p>Smooth matte finish in contemporary living space</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/paints/i2.webp" alt="Interior painting design 2" onClick={handleThumbnailClick} />
                                    <img src="services/paints/i3.webp" alt="Interior painting design 3" onClick={handleThumbnailClick} />
                                    <img src="services/paints/i4.webp" alt="Interior painting design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 2. Exterior Paints */}
                        <div className="kitchen-type lshape-kitchen" id="exterior">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/paints/e1.webp" alt="Exterior House Painting" />
                                    <div className="gallery-overlay">
                                        <h4>Weather Protection</h4>
                                        <p>Durable exterior emulsion protecting against sun and rain</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/paints/e2.webp" alt="Exterior painting design 2" onClick={handleThumbnailClick} />
                                    <img src="services/paints/e3.webp" alt="Exterior painting design 3" onClick={handleThumbnailClick} />
                                    <img src="services/paints/e4.webp" alt="Exterior painting design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Weather Resistant</span>
                                <h2 className="kitchen-title">Exterior Paints</h2>
                                <p className="kitchen-description">
                                    Protect and beautify your property with our high-performance exterior paints.
                                    Specially formulated to withstand harsh weather conditions, UV rays, and pollution
                                    while maintaining vibrant colors for years.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-sun"></i></div>
                                        <div className="feature-content">
                                            <h4>UV Resistant</h4>
                                            <p>Prevents fading and maintains color brightness</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-umbrella"></i></div>
                                        <div className="feature-content">
                                            <h4>Waterproof</h4>
                                            <p>Excellent water resistance prevents dampness and algae</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-temperature-high"></i></div>
                                        <div className="feature-content">
                                            <h4>Thermal Reflective</h4>
                                            <p>Keeps interiors cooler by reflecting sunlight</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Crack Resistant</h4>
                                            <p>Flexible formula prevents cracking in temperature changes</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Products <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 3. Texture Paints */}
                        <div className="kitchen-type ushape-kitchen" id="texture">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Decorative</span>
                                <h2 className="kitchen-title">Texture Paints</h2>
                                <p className="kitchen-description">
                                    Add depth, character, and visual interest to your walls with our premium texture paints.
                                    From subtle sand textures to bold patterns, create stunning feature walls that become
                                    the focal point of any room.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-mountain"></i></div>
                                        <div className="feature-content">
                                            <h4>Sand Texture</h4>
                                            <p>Fine to coarse sand finishes for tactile surfaces</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-water"></i></div>
                                        <div className="feature-content">
                                            <h4>Venetian Plaster</h4>
                                            <p>Marble-like polished finishes for luxurious look</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-star"></i></div>
                                        <div className="feature-content">
                                            <h4>Metallic Effects</h4>
                                            <p>Shimmery metallic finishes for contemporary spaces</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-mask"></i></div>
                                        <div className="feature-content">
                                            <h4>Pattern Effects</h4>
                                            <p>Create patterns with combs, rollers, and special tools</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Textures <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/paints/t1.webp" alt="Texture Paint Walls" />
                                    <div className="gallery-overlay">
                                        <h4>Decorative Texture</h4>
                                        <p>Sand texture with metallic accents for feature wall</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/paints/t2.webp" alt="Texture painting design 2" onClick={handleThumbnailClick} />
                                    <img src="services/paints/t3.webp" alt="Texture painting design 3" onClick={handleThumbnailClick} />
                                    <img src="services/paints/t4.webp" alt="Texture painting design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Enamel Paints */}
                        <div className="kitchen-type parallel-kitchen" id="enamel">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/paints/en1.webp" alt="Waterproofing Application" />
                                    <div className="gallery-overlay">
                                        <h4>Roof Waterproofing</h4>
                                        <p>Elastic coating for terrace and roof protection</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/paints/en2.webp" alt="Waterproofing design 2" onClick={handleThumbnailClick} />
                                    <img src="services/paints/en3.webp" alt="Waterproofing design 3" onClick={handleThumbnailClick} />
                                    <img src="services/paints/en4.webp" alt="Waterproofing design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">High Durability</span>
                                <h2 className="kitchen-title">Enamel Paints</h2>
                                <p className="kitchen-description">
                                    Our premium enamel paints provide hard, glossy finishes that are exceptionally durable
                                    and easy to clean. Perfect for woodwork, metal surfaces, doors, windows, and areas
                                    requiring frequent cleaning.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-gem"></i></div>
                                        <div className="feature-content">
                                            <h4>High Gloss Finish</h4>
                                            <p>Brilliant shine that enhances wood grain and details</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Scratch Resistant</h4>
                                            <p>Hard finish resists scratches and daily wear</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tint-slash"></i></div>
                                        <div className="feature-content">
                                            <h4>Stain Proof</h4>
                                            <p>Easy to clean, resists stains and moisture</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-broom"></i></div>
                                        <div className="feature-content">
                                            <h4>Easy Maintenance</h4>
                                            <p>Wipe clean with damp cloth, maintains shine for years</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Enamels <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 5. Waterproofing Solutions */}
                        <div className="kitchen-type galley-kitchen" id="waterproofing">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Protective</span>
                                <h2 className="kitchen-title">Waterproofing Solutions</h2>
                                <p className="kitchen-description">
                                    Comprehensive waterproofing solutions to protect your property from water damage.
                                    Our specialized products seal cracks, prevent leakage, and provide long-term protection
                                    for roofs, bathrooms, terraces, and basements.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tint-slash"></i></div>
                                        <div className="feature-content">
                                            <h4>100% Waterproof</h4>
                                            <p>Complete protection against water penetration</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-expand-arrows-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Elastic Coating</h4>
                                            <p>Flexible coating that moves with building settlement</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-sun"></i></div>
                                        <div className="feature-content">
                                            <h4>UV Resistant</h4>
                                            <p>Withstands sunlight without cracking or peeling</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-seedling"></i></div>
                                        <div className="feature-content">
                                            <h4>Algae Resistant</h4>
                                            <p>Prevents growth of algae, fungi, and moss</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Solutions <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/paints/w1.webp" alt="Waterproofing Application" />
                                    <div className="gallery-overlay">
                                        <h4>Roof Waterproofing</h4>
                                        <p>Elastic coating for terrace and roof protection</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/paints/w2.webp" alt="Waterproofing design 2" onClick={handleThumbnailClick} />
                                    <img src="services/paints/w3.webp" alt="Waterproofing design 3" onClick={handleThumbnailClick} />
                                    <img src="services/paints/w4.webp" alt="Waterproofing design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 6. Sealants & Primers */}
                        <div className="kitchen-type peninsula-kitchen" id="sealants">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/paints/s1.webp" alt="Sealants and Primers" />
                                    <div className="gallery-overlay">
                                        <h4>Surface Preparation</h4>
                                        <p>Essential primers and sealants for perfect paint adhesion</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/paints/s2.webp" alt="Primer/sealant design 2" onClick={handleThumbnailClick} />
                                    <img src="services/paints/s3.webp" alt="Primer/sealant design 3" onClick={handleThumbnailClick} />
                                    <img src="services/paints/s4.webp" alt="Primer/sealant design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Essential</span>
                                <h2 className="kitchen-title">Sealants & Primers</h2>
                                <p className="kitchen-description">
                                    The foundation of any great paint job. Our premium primers and sealants ensure proper adhesion,
                                    block stains, prevent moisture problems, and create the perfect surface for your topcoat.
                                    Essential for long-lasting, professional results.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-layer-group"></i></div>
                                        <div className="feature-content">
                                            <h4>Surface Sealer</h4>
                                            <p>Seals porous surfaces for uniform paint absorption</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-filter"></i></div>
                                        <div className="feature-content">
                                            <h4>Stain Blocker</h4>
                                            <p>Prevents water stains, rust, and smoke marks from bleeding through</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-anchor"></i></div>
                                        <div className="feature-content">
                                            <h4>Adhesion Promoter</h4>
                                            <p>Ensures strong bond between surface and paint</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-compress-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Filler & Leveler</h4>
                                            <p>Fills minor cracks and creates smooth surface</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Products <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Paints;