// Products.jsx
import React, { useEffect, useRef } from 'react';
import './products.css';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {

    const Navigate = useNavigate();

    const videoRefs = useRef([]);

    useEffect(() => {
        // Product section animations
        const animateProducts = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const productSection = entry.target;
                            productSection.classList.add('in-view');

                            // Animate product cards
                            const cards = productSection.querySelectorAll('.product-card');
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('animate-fade-in-up');
                                }, index * 150);
                            });

                            // Animate video section
                            const videoSection = productSection.querySelector('.video-collateral-section');
                            if (videoSection) {
                                setTimeout(() => {
                                    videoSection.classList.add('animate-fade-in');
                                }, 600);
                            }

                            // Animate brand partners
                            const brands = productSection.querySelectorAll('.brand-item');
                            brands.forEach((brand, index) => {
                                setTimeout(() => {
                                    brand.classList.add('animate-fade-in');
                                }, index * 100);
                            });
                        }
                    });
                },
                { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
            );

            document.querySelectorAll('.product-section, .video-collateral-section, .brands-section').forEach((section) => {
                observer.observe(section);
            });

            return () => observer.disconnect();
        };

        animateProducts();

        // Setup video play/pause functionality
        const setupVideoPlayers = () => {
            const videoPlayers = document.querySelectorAll('.video-player');

            videoPlayers.forEach((player, index) => {
                const video = player.querySelector('video');
                const playBtn = player.querySelector('.play-button');

                if (playBtn && video) {
                    // Store reference
                    videoRefs.current[index] = { video, playBtn };

                    playBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        togglePlayPause(video, playBtn);
                    });

                    video.addEventListener('click', (e) => {
                        e.stopPropagation();
                        togglePlayPause(video, playBtn);
                    });

                    video.addEventListener('play', () => {
                        playBtn.style.opacity = '0';
                        playBtn.style.transform = 'scale(0)';
                    });

                    video.addEventListener('pause', () => {
                        playBtn.style.opacity = '1';
                        playBtn.style.transform = 'scale(1)';
                    });

                    video.addEventListener('ended', () => {
                        playBtn.style.opacity = '1';
                        playBtn.style.transform = 'scale(1)';
                    });
                }
            });
        };

        // Add small delay to ensure DOM is ready
        setTimeout(setupVideoPlayers, 500);

        return () => {
            // Cleanup
            videoRefs.current.forEach(ref => {
                if (ref && ref.video) {
                    ref.video.removeEventListener('play', () => { });
                    ref.video.removeEventListener('pause', () => { });
                    ref.video.removeEventListener('ended', () => { });
                }
            });
        };
    }, []);

    const togglePlayPause = (video, playBtn) => {
        if (video.paused || video.ended) {
            video.play().catch(error => {
                console.error('Error playing video:', error);
                // Fallback: Show controls if autoplay is blocked
                video.setAttribute('controls', true);
                playBtn.style.display = 'none';
            });
        } else {
            video.pause();
        }
    };

    // Handle product inquiry
    const handleInquiryClick = (productName) => {
        Navigate('/contacts')
    };

    // Video sources - replace these with your actual video paths
    const videoSources = [
        '/videos/video1.mp4',  // Gypsum Installation
        'videos/video2.mp4',  // Fire-Resistant Solutions
        'videos/video3.mp4',  // Design Trends
        'videos/video4.mp4'   // Maintenance Guide
    ];



    // Video thumbnails
    const videoThumbnails = [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    ];

    // Video titles
    const videoTitles = [
        'Gypsum Ceiling Installation',
        'Fire-Resistant Ceiling Solutions',
        'Modern Ceiling Design Trends',
        'Premium Ceiling Maintenance'
    ];

    return (
        <div id='Products'>
            {/* Hero Section for Products */}
            <section className="products-hero-section">
                <div className="container products-hero-container">
                    <div className="products-hero-content">
                        <div className="products-hero-badge">
                            <i className="fas fa-box-open"></i> Premium Products Collection
                        </div>

                        <h1 className="products-hero-title">
                            Certified Excellence <span>in Every Product</span>
                        </h1>

                        <p className="products-hero-description">
                            Discover our curated selection of premium ceiling materials and accessories.
                            Each product is backed by years of expertise, certified quality, and our
                            commitment to transforming spaces with lasting beauty.
                        </p>

                        <div className="hero-stats-products">
                            <div className="stat-item-product">
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h3>Quality Certified</h3>
                                    <p>All products meet international standards</p>
                                </div>
                            </div>
                            <div className="stat-item-product">
                                <i className="fas fa-truck"></i>
                                <div>
                                    <h3>Direct Supply</h3>
                                    <p>From manufacturer to your project</p>
                                </div>
                            </div>
                            <div className="stat-item-product">
                                <i className="fas fa-headset"></i>
                                <div>
                                    <h3>Expert Support</h3>
                                    <p>Technical guidance & installation support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="products-hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                            alt="Premium ceiling materials showcase"
                        />
                        <div className="floating-badge-product">
                            <i className="fas fa-star"></i>
                            <span>Authorized Partner for Leading Brands</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Collateral Section - Simplified */}
            <section className="video-collateral-section" id="videos">
                <div className="container">
                    <div className="section-header">
                        <h2>Product Insights </h2>
                        <p className="section-subtitle">Learn about our premium products through expert-led videos</p>
                        <div className="elegant-underline"></div>
                    </div>

                    <div className="video-grid">
                        {[0, 1, 2, 3].map((index) => (
                            <div className="video-card" key={index}>
                                <div className="video-player">
                                    <video
                                        src={videoSources[index]}
                                        controls
                                    // poster={videoThumbnails[index]}
                                    // preload="metadata"
                                    >
                                        Your browser does not support the video tag.
                                    </video>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Products Showcase */}
            <section className="product-section" id="products">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Premium Products</h2>
                        <p className="section-subtitle">Carefully curated materials for exceptional results</p>
                        <div className="elegant-underline"></div>
                    </div>

                    <div className="products-grid">
                        {/* Product 1 */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="services/ceilings/g2.webp" alt="Premium Gypsum Board" />
                                <span className="product-badge">Best Seller</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('Premium Gypsum Board')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>Premium Gypsum Board</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.8
                                    </span>
                                </div>
                                <p className="product-description">
                                    High-quality gypsum boards with enhanced fire resistance and smooth finish. Perfect for modern interiors.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-ruler"></i> Thickness: 12.5mm</span>
                                    <span><i className="fas fa-fire"></i> Fire Rating: Class A</span>
                                    <span><i className="fas fa-weight"></i> Weight: 8.5 kg/m²</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="Premium Gypsum Board"
                                        onClick={() => handleInquiryClick('Premium Gypsum Board')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="services/walls/ts1.webp" alt="Acoustic Mineral Tiles" />
                                <span className="product-badge">Noise Control</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('Acoustic Mineral Tiles')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>Acoustic Mineral Tiles</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.7
                                    </span>
                                </div>
                                <p className="product-description">
                                    2'×2' acoustic tiles with superior sound absorption and thermal insulation properties.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-expand"></i> Size: 2'×2'</span>
                                    <span><i className="fas fa-volume-mute"></i> NRC: 0.75</span>
                                    <span><i className="fas fa-snowflake"></i> Thermal: 0.85 R-value</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="Acoustic Mineral Tiles"
                                        onClick={() => handleInquiryClick('Acoustic Mineral Tiles')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="services/paints/w3.webp" alt="Waterproof PVC Panels" />
                                <span className="product-badge">Waterproof</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('Waterproof PVC Panels')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>Waterproof PVC Panels</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.9
                                    </span>
                                </div>
                                <p className="product-description">
                                    100% waterproof PVC panels perfect for bathrooms, kitchens, and high-moisture areas.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-tint-slash"></i> Waterproof</span>
                                    <span><i className="fas fa-ruler"></i> Thickness: 8mm</span>
                                    <span><i className="fas fa-broom"></i> Easy Maintenance</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="Waterproof PVC Panels"
                                        onClick={() => handleInquiryClick('Waterproof PVC Panels')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product 4 */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="services/ceilings/f3.webp" alt="Fiber Cement Board" />
                                <span className="product-badge">High Strength</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('Fiber Cement Board')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>Fiber Cement Board</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.6
                                    </span>
                                </div>
                                <p className="product-description">
                                    Ultra-durable fiber cement boards for exterior and high-humidity applications.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-shield-alt"></i> Impact Resistant</span>
                                    <span><i className="fas fa-sun"></i> Weather Proof</span>
                                    <span><i className="fas fa-fire"></i> Fire Resistant</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="Fiber Cement Board"
                                        onClick={() => handleInquiryClick('Fiber Cement Board')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PPGL Roofing Sheets */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://prabhatglobal.com/wp-content/uploads/2025/02/Prabhats-Colour-Coated-Galvanised.webp" alt="PPGL Roofing Sheets" />
                                <span className="product-badge">Premium Quality</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('PPGL Roofing Sheets')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>PPGL Roofing Sheets</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.8
                                    </span>
                                </div>
                                <p className="product-description">
                                    Durable color-coated PPGL sheets from trusted brands like TATA and JSW Kalinga for long-lasting roofing solutions.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-tint"></i> Weather Resistant</span>
                                    <span><i className="fas fa-shield-alt"></i> Corrosion Proof</span>
                                    <span><i className="fas fa-wind"></i> High Strength</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="PPGL Roofing Sheets"
                                        onClick={() => handleInquiryClick('PPGL Roofing Sheets')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* GI Channels */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://5.imimg.com/data5/SELLER/Default/2021/12/CA/QE/GM/20541238/ceiling-section-500x500.jpg" alt="GI Channels" />
                                <span className="product-badge">Strong Framework</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('GI Channels')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>GI Channels</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.7
                                    </span>
                                </div>
                                <p className="product-description">
                                    High-quality galvanized iron channels for robust ceiling and roofing support structures.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-shield-alt"></i> Rust Resistant</span>
                                    <span><i className="fas fa-weight-hanging"></i> Load Bearing</span>
                                    <span><i className="fas fa-tools"></i> Easy Installation</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="GI Channels"
                                        onClick={() => handleInquiryClick('GI Channels')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Ceiling Boards */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://arktura.com/wp-content/uploads/2021/07/Gypsum-Board-Installation-Stock-Photo-1600x900.jpeg" alt="Ceiling Boards" />
                                <span className="product-badge">Premium Finish</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('Ceiling Boards')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>Ceiling Boards</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.9
                                    </span>
                                </div>
                                <p className="product-description">
                                    Premium gypsum, Shera fiber cement, and other ceiling boards for elegant and durable false ceilings.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-fire"></i> Fire Resistant</span>
                                    <span><i className="fas fa-tint-slash"></i> Moisture Proof</span>
                                    <span><i className="fas fa-volume-mute"></i> Sound Insulation</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="Ceiling Boards"
                                        onClick={() => handleInquiryClick('Ceiling Boards')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Tile Adhesives */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://5.imimg.com/data5/SELLER/Default/2023/8/334143027/EW/NZ/PH/190409614/20-kg-weberset-fastfix.jpg" alt="Tile Adhesives" />

                                <grok-card data-id="6f5236" data-type="image_card" data-arg-size="LARGE" ></grok-card>

                                <span className="product-badge">Strong Bond</span>
                                <div className="product-overlay">
                                    <button className="quick-view-btn" onClick={() => handleInquiryClick('Tile Adhesives')}>
                                        <i className="fas fa-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="product-header">
                                    <h3>Tile Adhesives</h3>
                                    <span className="product-rating">
                                        <i className="fas fa-star"></i> 4.8
                                    </span>
                                </div>
                                <p className="product-description">
                                    Premium cement-based tile adhesives for secure fixing of ceramic, vitrified, and stone tiles on floors and walls.
                                </p>
                                <div className="product-specs">
                                    <span><i className="fas fa-hand-holding-heart"></i> High Adhesion</span>
                                    <span><i className="fas fa-tint"></i> Waterproof</span>
                                    <span><i className="fas fa-tools"></i> Easy to Apply</span>
                                </div>
                                <div className="product-footer">
                                    <button
                                        className="inquiry-btn"
                                        data-product="Tile Adhesives"
                                        onClick={() => handleInquiryClick('Tile Adhesives')}
                                    >
                                        <i className="fas fa-info-circle"></i> Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Partners Section */}
            <section className="brands-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Trusted by Leading Brands</h2>
                        <p className="section-subtitle">Authorized dealer for premium ceiling solutions</p>
                        <div className="elegant-underline"></div>
                    </div>

                    <div className="brands-grid">
                        <div className="brand-item">
                            <div className="brand-logo">
                                <i className="fas fa-industry"></i>
                            </div>
                            <h4>Gyproc</h4>
                            <p>Premium Gypsum Solutions</p>
                        </div>
                        <div className="brand-item">
                            <div className="brand-logo">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h4>USG Boral</h4>
                            <p>Advanced Ceiling Systems</p>
                        </div>
                        <div className="brand-item">
                            <div className="brand-logo">
                                <i className="fas fa-gem"></i>
                            </div>
                            <h4>JSW</h4>
                            <p>Steel & Building Materials</p>
                        </div>
                        <div className="brand-item">
                            <div className="brand-logo">
                                <i className="fas fa-cubes"></i>
                            </div>
                            <h4>Armstrong</h4>
                            <p>World-Class Ceilings</p>
                        </div>
                        <div className="brand-item">
                            <div className="brand-logo">
                                <i className="fas fa-layer-group"></i>
                            </div>
                            <h4>Plywood</h4>
                            <p>Premium Wood Panels</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="products-cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Transform Your Space?</h2>
                        <p>Get expert advice and premium products for your next project</p>
                        <div className="cta-buttons">
                            {/* <button className="cta-btn-primary" onClick={() => handleInquiryClick('Full Product Catalog')}>
                                <i className="fas fa-download"></i> Download Catalog
                            </button> */}
                            <button className="cta-btn-secondary" onClick={() => handleInquiryClick('Consultation')}>
                                <i className="fas fa-phone-alt"></i> Book Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;