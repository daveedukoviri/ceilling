import React, { useEffect } from 'react';
import './Kitchen.css';

const Kitchen = () => {
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
        const btn = e.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Thank you! Our design expert will contact you soon.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    };

    return (
        <>

           {/* Fast, Light & Sentimental Hero Section */}
<section className="hero-section-new">
  <div className="container hero-container-new">
    {/* Left Content */}
    <div className="hero-content-new">
      <div className="hero-badge-new fast-fade">
        <i className="fas fa-crown"></i> Artisan Modular Kitchens
      </div>

      <h1 className="hero-title-new fast-fade">
        Your Kitchen. <span>Your Story.</span>
      </h1>

      <p className="hero-subtitle-new fast-fade">
        Where Life Unfolds Beautifully
      </p>

      <p className="hero-description-new fast-fade">
        Some spaces hold more than meals — they hold memories.  
        The quiet mornings. The late-night talks. The laughter that echoes long after.  
        For fifteen years, we've crafted kitchens that don't just work —  
        they feel like home.  
        Because the heart of every house deserves to be loved.
      </p>
      <p className="hero-description-new fast-fade">
        Some spaces hold more than meals — they hold memories.  
        The quiet mornings. The late-night talks. The laughter that echoes long after.  
        For fifteen years, we've crafted kitchens that don't just work —  
        they feel like home.  
        Because the heart of every house deserves to be loved.
      </p>

     

     
    </div>

    {/* Right Image – Quick float in */}
    <div className="hero-image-wrapper fast-float">
      <div className="hero-image-container-new">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
          alt="A warm, sunlit kitchen filled with quiet joy"
          className="hero-image-new"
        />
       
   


        <div className="image-overlay-gradient"></div>
      </div>

      <div className="floating-badge quick-pulse">
        <i className="fas fa-heart"></i>
        <span>Made with Love, Built for Life</span>
      </div>
    </div>
  </div>

  <div className="hero-bg-pattern"></div>
</section>


            {/* Showcase Section */}
            <section className="showcase-section" id="kitchens">
                <div className="container">
                    <div className="showcase-header">
                        <h2>Premium Kitchen Types</h2>
                        {/* Beautiful Simple Underline */}
  <div className="elegant-underline"></div>
                    </div>

                    <div className="kitchen-showcase">
                        {/* 1. Island Kitchen */}
                        <div className="kitchen-type island-kitchen" id="island">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Most Popular</span>
                                <h2 className="kitchen-title">Island Kitchen</h2>
                                <p className="kitchen-description">
                                    The epitome of modern luxury, our Island Kitchens feature a central workspace that serves as the heart of your home.
                                    Perfect for social cooking experiences and open-plan living, these designs combine premium materials with intelligent
                                    storage solutions and integrated smart technology.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-users"></i></div>
                                        <div className="feature-content">
                                            <h4>Social Hub</h4>
                                            <p>Designed for entertaining with integrated seating and multiple preparation zones</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-gem"></i></div>
                                        <div className="feature-content">
                                            <h4>Premium Materials</h4>
                                            <p>Italian marble, quartzite, and custom lacquer cabinetry with gold accents</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-lightbulb"></i></div>
                                        <div className="feature-content">
                                            <h4>Smart Lighting</h4>
                                            <p>Ambient, task, and accent lighting with smart home integration</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-wine-bottle"></i></div>
                                        <div className="feature-content">
                                            <h4>Integrated Appliances</h4>
                                            <p>Seamless integration of premium appliances with hidden panels</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Gallery <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Island Kitchen" />
                                    <div className="gallery-overlay">
                                        <h4>Luxury Central Island</h4>
                                        <p>Calacatta marble with waterfall edges and integrated wine cooler</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view1" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view2" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view3" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 2. L-Shape Kitchen */}
                        <div className="kitchen-type lshape-kitchen" id="lshape">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="L-Shape Kitchen" />
                                    <div className="gallery-overlay">
                                        <h4>Corner Optimized Design</h4>
                                        <p>Maximizing space efficiency with smart corner solutions and premium finishes</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view1" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view2" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view3" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Space Efficient</span>
                                <h2 className="kitchen-title">L-Shape Kitchen</h2>
                                <p className="kitchen-description">
                                    Our L-Shape designs masterfully utilize corner spaces to create highly efficient workflows.
                                    Perfect for medium-sized kitchens, these layouts maximize storage while maintaining an elegant,
                                    uncluttered appearance with premium handle-less cabinetry and integrated appliances.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-vector-square"></i></div>
                                        <div className="feature-content">
                                            <h4>Corner Solutions</h4>
                                            <p>LeMans systems and magic corners for optimal storage utilization</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-sitemap"></i></div>
                                        <div className="feature-content">
                                            <h4>Work Triangle</h4>
                                            <p>Efficient workflow between sink, cooktop, and refrigerator</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-boxes"></i></div>
                                        <div className="feature-content">
                                            <h4>Smart Storage</h4>
                                            <p>Vertical pull-outs, corner carousels, and custom drawer systems</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-ruler-combined"></i></div>
                                        <div className="feature-content">
                                            <h4>Space Optimized</h4>
                                            <p>Maximum functionality in minimal footprint without compromising luxury</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Gallery <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 3. U-Shape Kitchen */}
                        <div className="kitchen-type ushape-kitchen" id="ushape">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Maximum Storage</span>
                                <h2 className="kitchen-title">U-Shape Kitchen</h2>
                                <p className="kitchen-description">
                                    The ultimate in kitchen functionality, our U-Shape designs provide extensive counter space
                                    and storage solutions on three walls. Perfect for larger families and serious home chefs.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-archive"></i></div>
                                        <div className="feature-content">
                                            <h4>Maximum Storage</h4>
                                            <p>Three walls of custom cabinetry with premium organizational systems</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
                                        <div className="feature-content">
                                            <h4>Work Efficiency</h4>
                                            <p>Everything within easy reach with optimized zone planning</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-ruler-combined"></i></div>
                                        <div className="feature-content">
                                            <h4>Large Counter Space</h4>
                                            <p>Ample preparation areas on three sides with premium stone surfaces</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-home"></i></div>
                                        <div className="feature-content">
                                            <h4>Perfect for Families</h4>
                                            <p>Designed for multiple cooks and extensive storage needs</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Gallery <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="U-Shape Kitchen" />
                                    <div className="gallery-overlay">
                                        <h4>Wrap-Around Luxury</h4>
                                        <p>Premium wood veneers with integrated smart home technology</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view1" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view2" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view3" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Parallel Kitchen */}
                        <div className="kitchen-type parallel-kitchen" id="parallel">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Parallel Kitchen" />
                                    <div className="gallery-overlay">
                                        <h4>Efficient Parallel Layout</h4>
                                        <p>Optimized for narrow spaces with premium finishes and smart storage</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view1" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view2" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view3" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Compact Design</span>
                                <h2 className="kitchen-title">Parallel Kitchen</h2>
                                <p className="kitchen-description">
                                    Ideal for compact and utility-focused spaces, our Parallel Kitchens feature facing countertops
                                    that create an efficient work triangle while maintaining a clean, uncluttered appearance.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-compress-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Space Optimized</h4>
                                            <p>Perfect for narrow and galley-style layouts with premium finishes</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-bolt"></i></div>
                                        <div className="feature-content">
                                            <h4>Efficient Workflow</h4>
                                            <p>Short distances between workstations for maximum productivity</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-layer-group"></i></div>
                                        <div className="feature-content">
                                            <h4>Clean Symmetry</h4>
                                            <p>Balanced design creates organized, harmonious appearance</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-utensils"></i></div>
                                        <div className="feature-content">
                                            <h4>High Utility</h4>
                                            <p>Focus on functionality and efficiency with premium materials</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Gallery <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* 5. Galley Kitchen */}
                        <div className="kitchen-type galley-kitchen" id="galley">
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Professional Grade</span>
                                <h2 className="kitchen-title">Galley Kitchen</h2>
                                <p className="kitchen-description">
                                    Inspired by professional kitchens, our Galley designs maximize efficiency in compact spaces.
                                    Featuring parallel countertops with everything within arm's reach.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-tachometer-alt"></i></div>
                                        <div className="feature-content">
                                            <h4>Maximum Efficiency</h4>
                                            <p>Everything within two steps for professional-grade cooking efficiency</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-industry"></i></div>
                                        <div className="feature-content">
                                            <h4>Professional Layout</h4>
                                            <p>Inspired by commercial kitchens with premium residential finishes</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-sliders-h"></i></div>
                                        <div className="feature-content">
                                            <h4>Compact Design</h4>
                                            <p>Perfect for apartments and smaller homes without sacrificing luxury</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-fire"></i></div>
                                        <div className="feature-content">
                                            <h4>Serious Cooking</h4>
                                            <p>Designed for passionate cooks who value efficiency and performance</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Gallery <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Galley Kitchen" />
                                    <div className="gallery-overlay">
                                        <h4>Professional Efficiency</h4>
                                        <p>Compact design with professional-grade appliances and premium finishes</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view1" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view2" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view3" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                        </div>

                        {/* 6. Peninsula Kitchen */}
                        <div className="kitchen-type peninsula-kitchen" id="peninsula">
                            <div className="kitchen-gallery">
                                <div className="main-gallery">
                                    <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Peninsula Kitchen" />
                                    <div className="gallery-overlay">
                                        <h4>Connected Design</h4>
                                        <p>Extended countertop for dining and socializing with luxury finishes</p>
                                    </div>
                                </div>
                                <div className="thumbnail-grid">
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view1" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view2" onClick={handleThumbnailClick} />
                                    <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="view3" onClick={handleThumbnailClick} />
                                </div>
                            </div>
                            <div className="kitchen-content">
                                <span className="kitchen-badge">Connected Living</span>
                                <h2 className="kitchen-title">Peninsula Kitchen</h2>
                                <p className="kitchen-description">
                                    The perfect blend of island and L-shape designs, our Peninsula Kitchens feature an extended
                                    countertop that connects to a wall or cabinetry. This creates additional workspace and dining
                                    area while maintaining an open, flowing connection to adjacent living spaces.
                                </p>
                                <div className="kitchen-features">
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-hands-helping"></i></div>
                                        <div className="feature-content">
                                            <h4>Connected Space</h4>
                                            <p>Seamless connection between kitchen and living areas with flowing design</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-chair"></i></div>
                                        <div className="feature-content">
                                            <h4>Integrated Seating</h4>
                                            <p>Built-in breakfast bar with premium countertop materials</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-route"></i></div>
                                        <div className="feature-content">
                                            <h4>Traffic Flow</h4>
                                            <p>Optimized movement patterns with clear pathways and work zones</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon"><i className="fas fa-expand"></i></div>
                                        <div className="feature-content">
                                            <h4>Versatile Layout</h4>
                                            <p>Combines benefits of island and L-shape designs in one premium package</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="kitchen-cta" onClick={handleCTAClick}>
                                    View Gallery <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Kitchen;