import React, { useEffect ,} from 'react';
import './Ceilings.css';
import { Link , useNavigate} from 'react-router-dom';




const Ceilings = () => {

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
                            <i className="fas fa-crown"></i> GNG Group Premium Ceilings
                        </div>

                        <h1 className="hero-title-new fast-fade">
                            Transform Your Space. <span>Elevate Your Style.</span>
                        </h1>

                        <p className="hero-subtitle-new fast-fade">
                            Premium Ceiling Solutions for Modern Living
                        </p>

                        <p className="hero-description-new fast-fade">
                            For years, Sree Sai Shambhavi Enterprises (GNG Group) has been redefining interiors with premium ceiling systems that combine beauty, functionality, and durability. From elegant gypsum designs to practical POP ceilings and advanced acoustic solutions, we create overhead spaces that inspire.
                        </p>
                        <p className="hero-description-new fast-fade">
                            As authorized dealers for leading brands like Gyproc, USG Boral, JSW, and Armstrong, we bring you certified quality, professional installation, and designs that reflect your vision. Because the ceiling isn't just overhead — it's a statement.
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
                                <i className="fas fa-phone-alt"></i> Get Free Consultation
                            </button>
                        </Link>
                    </div>

                    {/* Right Image – Quick float in */}
                    <div className="hero-image-wrapper fast-float">
                        <div className="hero-image-container-new">
                            <img
                                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Elegant modern ceiling design with lighting"
                                className="hero-image-new"
                            />
                            <div className="image-overlay-gradient"></div>
                        </div>

                        <div className="floating-badge quick-pulse">
                            <i className="fas fa-award"></i>
                            <span>Authorized Dealer for Premium Brands</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* Showcase Section */}
            <section className="showcase-section" id="ceilings">
                <div className="container">
                    <div className="showcase-header">
                        <h2>Premium Ceiling Types</h2>
                        {/* Beautiful Simple Underline */}
                        {/* <div className="elegant-underline"></div> */}
                    </div>

                    <div className="kitchen-showcase ">
                        {/* 1. Gypsum Ceiling */}
                        <div className="kitchen-type island-kitchen" id="gypsum">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Most Popular</span>
                                <h2 className="kitchen-title">Gypsum Ceiling</h2>
                                <p className="kitchen-description">
                                    The ultimate choice for modern interiors, our Gypsum Ceilings offer seamless finishes,
                                    flexibility in design, and excellent fire-resistant properties. Perfect for creating
                                    smooth surfaces, intricate designs, and contemporary looks that elevate any space.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-fire"></i></div>
                                        <div className="feature-content">
                                            <h4>Fire Resistant</h4>
                                            <p>Certified fire-retardant gypsum boards for enhanced safety</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-paint-roller"></i></div>
                                        <div className="feature-content">
                                            <h4>Smooth Finish</h4>
                                            <p>Perfectly seamless surfaces ready for any paint or finish</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-water"></i></div>
                                        <div className="feature-content">
                                            <h4>Water Resistant</h4>
                                            <p>Moisture-resistant options available for bathrooms & kitchens</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-lightbulb"></i></div>
                                        <div className="feature-content">
                                            <h4>Lighting Integration</h4>
                                            <p>Easy integration of recessed, cove, and accent lighting</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/ceilings/g1.webp" alt="Gypsum Ceiling Design" />
                                    <div className="gallery-overlay">
                                        <h4>Modern Gypsum Design</h4>
                                        <p>Multi-level gypsum ceiling with integrated LED lighting</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/ceilings/g2.webp" alt="Gypsum ceiling design 2" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/g3.webp" alt="Gypsum ceiling design 3" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/g4.webp" alt="Gypsum ceiling design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 2. POP Ceiling */}
                        <div className="kitchen-type lshape-kitchen" id="pop">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/ceilings/p1.webp" alt="POP Ceiling Design" />
                                    <div className="gallery-overlay">
                                        <h4>Ornate POP Design</h4>
                                        <p>Custom decorative POP work with intricate patterns</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/ceilings/p2.webp" alt="POP ceiling design 2" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/p3.webp" alt="POP ceiling design 3" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/p4.webp" alt="POP ceiling design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Custom Designs</span>
                                <h2 className="kitchen-title">POP Ceiling</h2>
                                <p className="kitchen-description">
                                    Plaster of Paris ceilings offer unparalleled flexibility for creating custom shapes,
                                    curves, and intricate decorative elements. Perfect for adding artistic flair and
                                    architectural interest to residential and commercial spaces.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-drafting-compass"></i></div>
                                        <div className="feature-content">
                                            <h4>Custom Designs</h4>
                                            <p>Create any shape, curve, or decorative pattern imaginable</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-fan"></i></div>
                                        <div className="feature-content">
                                            <h4>Curves & Arches</h4>
                                            <p>Seamless curved surfaces for elegant, flowing designs</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-palette"></i></div>
                                        <div className="feature-content">
                                            <h4>Artistic Freedom</h4>
                                            <p>Perfect for creating feature ceilings and focal points</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-weight-hanging"></i></div>
                                        <div className="feature-content">
                                            <h4>Lightweight</h4>
                                            <p>Easier to work with for complex decorative elements</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 3. Mineral Acoustic Ceiling */}
                        <div className="kitchen-type ushape-kitchen" id="acoustic">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Noise Control</span>
                                <h2 className="kitchen-title">Mineral Acoustic Ceiling</h2>
                                <p className="kitchen-description">
                                    Our 2'×2' Mineral Acoustic Tiles provide superior sound absorption and thermal insulation.
                                    Perfect for offices, conference rooms, theaters, and any space where noise control and
                                    comfort are priorities.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-volume-mute"></i></div>
                                        <div className="feature-content">
                                            <h4>Sound Absorption</h4>
                                            <p>Excellent noise reduction coefficient (NRC) ratings</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-snowflake"></i></div>
                                        <div className="feature-content">
                                            <h4>Thermal Insulation</h4>
                                            <p>Helps maintain comfortable room temperatures</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-leaf"></i></div>
                                        <div className="feature-content">
                                            <h4>Eco-Friendly</h4>
                                            <p>Made from natural mineral fibers, environmentally safe</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-fire-extinguisher"></i></div>
                                        <div className="feature-content">
                                            <h4>Fire Resistant</h4>
                                            <p>Non-combustible material for enhanced safety</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/ceilings/m1.webp" alt="Acoustic Ceiling" />
                                    <div className="gallery-overlay">
                                        <h4>Acoustic Tile Grid</h4>
                                        <p>2'×2' mineral tiles in suspended grid system</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/ceilings/m2.webp" alt="Acoustic ceiling design 2" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/m3.webp" alt="Acoustic ceiling design 3" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/m4.webp" alt="Acoustic ceiling design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 4. PVC Ceiling */}
                        <div className="kitchen-type parallel-kitchen " id="pvc">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/ceilings/pvc1.webp" alt="PVC Ceiling" />
                                    <div className="gallery-overlay">
                                        <h4>Waterproof PVC Panels</h4>
                                        <p>Moisture-resistant ceiling perfect for bathrooms & kitchens</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/ceilings/pvc2.webp" alt="PVC ceiling design 2" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/pvc3.webp" alt="PVC ceiling design 3" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/pvc4.webp" alt="PVC ceiling design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Moisture Resistant</span>
                                <h2 className="kitchen-title">PVC Ceiling</h2>
                                <p className="kitchen-description">
                                    Ideal for high-moisture areas, our PVC ceilings offer complete waterproof protection,
                                    easy maintenance, and modern aesthetics. Perfect for bathrooms, kitchens, balconies,
                                    and commercial wet areas.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tint-slash"></i></div>
                                        <div className="feature-content">
                                            <h4>100% Waterproof</h4>
                                            <p>Zero water absorption, perfect for humid environments</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-broom"></i></div>
                                        <div className="feature-content">
                                            <h4>Easy Cleaning</h4>
                                            <p>Wipe clean with damp cloth, resistant to stains</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-weight"></i></div>
                                        <div className="feature-content">
                                            <h4>Lightweight</h4>
                                            <p>Easy installation without heavy structural support</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-paint-brush"></i></div>
                                        <div className="feature-content">
                                            <h4>Multiple Finishes</h4>
                                            <p>Available in glossy, matte, wood, and marble patterns</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 5. Fiber Cement Ceiling */}
                        <div className="kitchen-type galley-kitchen" id="cement">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">High Strength</span>
                                <h2 className="kitchen-title">Fiber Cement Ceiling</h2>
                                <p className="kitchen-description">
                                    For areas requiring exceptional durability and moisture resistance, our Fiber Cement
                                    Boards provide robust, long-lasting solutions. Perfect for exterior applications,
                                    high-humidity areas, and commercial installations.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Extreme Durability</h4>
                                            <p>Resistant to impact, moisture, and temperature changes</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-sun"></i></div>
                                        <div className="feature-content">
                                            <h4>Weather Resistant</h4>
                                            <p>Suitable for exterior and semi-exterior applications</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-bug"></i></div>
                                        <div className="feature-content">
                                            <h4>Termite Proof</h4>
                                            <p>Inorganic material that doesn't attract pests</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-fire"></i></div>
                                        <div className="feature-content">
                                            <h4>Non-Combustible</h4>
                                            <p>Excellent fire resistance rating for safety</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Designs <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/ceilings/f1.webp" alt="Fiber Cement Ceiling" />
                                    <div className="gallery-overlay">
                                        <h4>Durable Cement Board</h4>
                                        <p>High-strength fiber cement for demanding applications</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/ceilings/f2.webp" alt="Fiber cement ceiling design 2" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/f3.webp" alt="Fiber cement ceiling design 3" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/f4.webp" alt="Fiber cement ceiling design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 6. GI Roofing Sheets */}
                        <div className="kitchen-type peninsula-kitchen" id="roofing">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="services/ceilings/g1.webp" alt="GI Roofing Sheets" />
                                    <div className="gallery-overlay">
                                        <h4>Colored GI Roofing</h4>
                                        <p>Durable galvanized iron sheets with protective coatings</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="services/ceilings/g2.webp" alt="GI roofing design 2" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/g3.webp" alt="GI roofing design 3" onClick={handleThumbnailClick} />
                                    <img src="services/ceilings/g4.webp" alt="GI roofing design 4" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Exterior Solution</span>
                                <h2 className="kitchen-title">GI Roofing Sheets</h2>
                                <p className="kitchen-description">
                                    Our Galvanized Iron Roofing Sheets offer superior protection against weather elements
                                    with excellent durability and corrosion resistance. Available in various colors and
                                    profiles for both residential and industrial applications.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-umbrella"></i></div>
                                        <div className="feature-content">
                                            <h4>Weather Protection</h4>
                                            <p>Superior resistance to rain, sun, and temperature extremes</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-ruler-combined"></i></div>
                                        <div className="feature-content">
                                            <h4>Long Spans</h4>
                                            <p>Cover large areas without intermediate supports</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-palette"></i></div>
                                        <div className="feature-content">
                                            <h4>Color Options</h4>
                                            <p>Available in multiple colors with protective coatings</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-bolt"></i></div>
                                        <div className="feature-content">
                                            <h4>Quick Installation</h4>
                                            <p>Lightweight and easy to install, reducing labor costs</p>
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

export default Ceilings;