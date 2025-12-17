// import './Gallery.css'
// import { useState, useEffect, useRef } from 'react';

// function Gallery(){
//     const [activeFilter, setActiveFilter] = useState('all');
//     const [modalSrc, setModalSrc] = useState('');
//     const [modalTitle, setModalTitle] = useState('');
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const statsRef = useRef(null);

//     // Counter animation logic
//     useEffect(() => {
//         const counters = statsRef.current?.querySelectorAll('.stat-number');
//         if (!counters) return;

//         let animated = false;

//         const animateCounters = () => {
//             if (animated) return;
//             animated = true;

//             const speed = 200;

//             counters.forEach(counter => {
//                 const target = +counter.getAttribute('data-count');
//                 let count = 0;
//                 const increment = target / speed;

//                 const timer = setInterval(() => {
//                     count += increment;
//                     if (count >= target) {
//                         counter.innerText = target;
//                         clearInterval(timer);
//                     } else {
//                         counter.innerText = Math.ceil(count);
//                     }
//                 }, 10);
//             });
//         };

//         const observer = new IntersectionObserver((entries) => {
//             if (entries[0].isIntersecting) {
//                 animateCounters();
//                 observer.disconnect();
//             }
//         }, { threshold: 0.5 });

//         observer.observe(statsRef.current);

//         return () => observer.disconnect();
//     }, []);

//     // Filter click handler
//     const handleFilterClick = (filter) => {
//         setActiveFilter(filter);
//     };

//     // Quick view (modal open)
//     const openModal = (src, title) => {
//         setModalSrc(src);
//         setModalTitle(title);
//         // Bootstrap modal will show via data attributes, but we set values here for consistency
//     };

//     // Load more simulation
//     const handleLoadMore = () => {
//         setIsLoadingMore(true);
//         setTimeout(() => {
//             setIsLoadingMore(false);
//             // In real app, add more items here
//             // For demo: disable button as in original script
//             const btn = document.querySelector('.load-more-btn span');
//             const arrow = document.querySelector('.load-more-btn .fa-arrow-down');
//             if (btn) btn.textContent = 'All Designs Loaded';
//             if (arrow) arrow.classList.add('d-none');
//             const loadBtn = document.querySelector('.load-more-btn');
//             if (loadBtn) {
//                 loadBtn.disabled = true;
//                 loadBtn.style.opacity = '0.7';
//             }
//         }, 1500);
//     };

//     // Helper to check if item matches filter
//     const matchesFilter = (category) => {
//         if (activeFilter === 'all') return true;
//         return category.split(' ').includes(activeFilter);
//     };

//     return (
//         <>
       
//     <section className="gallery-hero text-center">
//         <div className="container">
//             <h1>Our Interior Design Gallery</h1>
//             <p>Discover exquisite interior designs that transform houses into homes. Explore our portfolio of modern, contemporary, and classic designs.</p>
//         </div>
//     </section>

    
//     <div className="container">
//         <div className="filter-buttons">
//             <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterClick('all')}>All Projects</button>
//             <button className={`filter-btn ${activeFilter === 'living-room' ? 'active' : ''}`} onClick={() => handleFilterClick('living-room')}>Living Room</button>
//             <button className={`filter-btn ${activeFilter === 'bedroom' ? 'active' : ''}`} onClick={() => handleFilterClick('bedroom')}>Bedroom</button>
//             <button className={`filter-btn ${activeFilter === 'kitchen' ? 'active' : ''}`} onClick={() => handleFilterClick('kitchen')}>Kitchen</button>
//             <button className={`filter-btn ${activeFilter === 'dining' ? 'active' : ''}`} onClick={() => handleFilterClick('dining')}>Dining</button>
//             <button className={`filter-btn ${activeFilter === 'modern' ? 'active' : ''}`} onClick={() => handleFilterClick('modern')}>Modern</button>
//             <button className={`filter-btn ${activeFilter === 'classic' ? 'active' : ''}`} onClick={() => handleFilterClick('classic')}>Classic</button>
//         </div>
//     </div>

  
//     <div className="container gallery-container">
//         <div className="row" id="galleryGrid">
            
//             <div className="col-lg-4 col-md-6 gallery-item" data-category="living-room modern" style={{display: matchesFilter('living-room modern') ? 'block' : 'none'}}>
//                 <img src="https://dlifeinteriors.com/wp-content/uploads/2025/10/Modern-Living-room-with-painting-frame.jpg" 
//                      alt="Modern Living Room" className="gallery-img" />
//                 <button className="quick-view" data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => openModal("https://dlifeinteriors.com/wp-content/uploads/2025/10/Modern-Living-room-with-painting-frame.jpg", "Modern Living Room")}>
//                     <i className="fas fa-expand-alt"></i>
//                 </button>
//                 <div className="gallery-overlay">
//                     <span className="gallery-category">Living Room</span>
//                     <h3 className="gallery-title">Modern Living Room</h3>
//                     <p className="gallery-description">Contemporary design with artistic wall painting</p>
//                 </div>
//             </div>

//             <div className="col-lg-4 col-md-6 gallery-item" data-category="kitchen modern" style={{display: matchesFilter('kitchen modern') ? 'block' : 'none'}}>
//                 <img src="https://dlifeinteriors.com/wp-content/uploads/2025/10/Modular-Kitchen-with-dining-table.jpg" 
//                      alt="Modular Kitchen" className="gallery-img" />
//                 <button className="quick-view" data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => openModal("https://dlifeinteriors.com/wp-content/uploads/2025/10/Modular-Kitchen-with-dining-table.jpg", "Modular Kitchen")}>
//                     <i className="fas fa-expand-alt"></i>
//                 </button>
//                 <div className="gallery-overlay">
//                     <span className="gallery-category">Kitchen</span>
//                     <h3 className="gallery-title">Modular Kitchen Design</h3>
//                     <p className="gallery-description">Efficient layout with integrated dining space</p>
//                 </div>
//             </div>

//             <div className="col-lg-4 col-md-6 gallery-item" data-category="bedroom classic" style={{display: matchesFilter('bedroom classic') ? 'block' : 'none'}}>
//                 <img src="https://dlifeinteriors.com/wp-content/uploads/2025/10/Bedroom-Interior-Design.jpg" 
//                      alt="Bedroom Interior" className="gallery-img" />
//                 <button className="quick-view" data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => openModal("https://dlifeinteriors.com/wp-content/uploads/2025/10/Bedroom-Interior-Design.jpg", "Bedroom Interior")}>
//                     <i className="fas fa-expand-alt"></i>
//                 </button>
//                 <div className="gallery-overlay">
//                     <span className="gallery-category">Bedroom</span>
//                     <h3 className="gallery-title">Luxury Bedroom</h3>
//                     <p className="gallery-description">Elegant bedroom with premium furnishings</p>
//                 </div>
//             </div>

            
//         </div>

        
//         <div className="load-more-container">
//             <button className="load-more-btn" onClick={handleLoadMore}>
//                 <i className={`fas fa-spinner fa-spin ${isLoadingMore ? '' : 'd-none'}`}></i>
//                 <span>{isLoadingMore ? 'Loading...' : 'Load More Designs'}</span>
//                 <i className="fas fa-arrow-down"></i>
//             </button>
//         </div>
//     </div>

   
//     <section className="gallery-stats" ref={statsRef}>
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-3 col-6">
//                     <div className="stat-item">
//                         <div className="stat-number" data-count="500">0</div>
//                         <div className="stat-label">Projects Completed</div>
//                     </div>
//                 </div>
//                 <div className="col-md-3 col-6">
//                     <div className="stat-item">
//                         <div className="stat-number" data-count="250">0</div>
//                         <div className="stat-label">Happy Clients</div>
//                     </div>
//                 </div>
//                 <div className="col-md-3 col-6">
//                     <div className="stat-item">
//                         <div className="stat-number" data-count="15">0</div>
//                         <div className="stat-label">Years Experience</div>
//                     </div>
//                 </div>
//                 <div className="col-md-3 col-6">
//                     <div className="stat-item">
//                         <div className="stat-number" data-count="50">0</div>
//                         <div className="stat-label">Awards Won</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>


   
//    <div className="modal fade" id="imageModal" tabIndex={-1} aria-hidden="true">
//   <div className="modal-dialog modal-dialog-centered modal-xl">
//     <div
//       className="modal-content"
//       style={{ background: 'transparent', border: 'none' }}
//     >
//       <div
//         className="modal-header border-0"
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           zIndex: 1,
//         }}
//       >
//         <button
//           type="button"
//           className="btn-close btn-close-white"
//           data-bs-dismiss="modal"
//           aria-label="Close"
//         ></button>
//       </div>

//       <div className="modal-body p-0">
//         <img
//           id="modalImage"
//           src={modalSrc}
//           alt={modalTitle}
//           className="img-fluid rounded"
//         />
//       </div>

//       <div
//         className="modal-footer border-0 justify-content-center"
//         style={{
//           position: 'absolute',
//           bottom: '20px',
//           width: '100%',
//           background: 'rgba(0,0,0,0.5)',
//         }}
//       >
//         <h5 id="modalTitle" className="text-white mb-0">{modalTitle}</h5>
//       </div>
//     </div>
//   </div>
// </div>

//         </>
//     )
// }

// export default Gallery;




//  :root {
//             --pastel-cream: #F9F5F0;
//             --pastel-sand: #F0E6D6;
//             --pastel-taupe: #E8DED2;
//             --pastel-clay: #D4C4B8;
//             --pastel-rose: #E8CDC8;
//             --pastel-moss: #D8D4C5;
//             --pastel-sage: #CBD2C0;
//             --classic-gold: #C5A572;
//             --classic-charcoal: #3A3A38;
//             --classic-walnut: #8B7355;
//             --transition: all 0.3s ease;
//         }

//         body {
//             font-family: 'Inter', sans-serif;
//             background-color: var(--pastel-cream);
//             color: var(--classic-charcoal);
//             line-height: 1.6;
//             padding-top: 80px;
//         }

//         h1, h2, h3, h4, h5, h6 {
//             font-family: 'Cormorant Garamond', serif;
//             font-weight: 600;
//             color: var(--classic-charcoal);
//         }

//         /* Gallery Header */
//         .gallery-hero {
//             background: linear-gradient(rgba(58, 58, 56, 0.8), rgba(58, 58, 56, 0.8)), 
//                         url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
//             background-size: cover;
//             background-position: center;
//             padding: 80px 0 60px;
//             margin-bottom: 60px;
//             color: white;
//         }

//         .gallery-hero h1 {
//             font-size: 3.5rem;
//             color: white;
//             margin-bottom: 15px;
//             letter-spacing: 1px;
//         }

//         .gallery-hero p {
//             font-size: 1.2rem;
//             max-width: 600px;
//             margin: 0 auto;
//             opacity: 0.9;
//         }

//         /* Filter Buttons */
//         .filter-buttons {
//             margin-bottom: 40px;
//             display: flex;
//             flex-wrap: wrap;
//             justify-content: center;
//             gap: 10px;
//         }

//         .filter-btn {
//             background: transparent;
//             border: 1px solid var(--pastel-clay);
//             color: var(--classic-walnut);
//             padding: 8px 24px;
//             border-radius: 30px;
//             font-weight: 500;
//             transition: var(--transition);
//             font-size: 14px;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//         }

//         .filter-btn:hover,
//         .filter-btn.active {
//             background: var(--classic-gold);
//             border-color: var(--classic-gold);
//             color: white;
//             transform: translateY(-2px);
//         }

//         /* Gallery Grid */
//         .gallery-container {
//             padding: 0 20px 80px;
//         }

//         .gallery-item {
//             margin-bottom: 30px;
//             position: relative;
//             overflow: hidden;
//             border-radius: 8px;
//             box-shadow: 0 5px 20px rgba(58, 58, 56, 0.05);
//             transition: var(--transition);
//             height: 320px;
//             background: var(--pastel-cream);
//         }

//         .gallery-item:hover {
//             transform: translateY(-10px);
//             box-shadow: 0 15px 30px rgba(58, 58, 56, 0.1);
//         }

//         .gallery-img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//             transition: transform 0.6s ease;
//         }

//         .gallery-item:hover .gallery-img {
//             transform: scale(1.05);
//         }

//         .gallery-overlay {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             right: 0;
//             background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
//             color: white;
//             padding: 30px 20px 20px;
//             transform: translateY(100%);
//             transition: transform 0.3s ease;
//         }

//         .gallery-item:hover .gallery-overlay {
//             transform: translateY(0);
//         }

//         .gallery-category {
//             display: inline-block;
//             background: var(--classic-gold);
//             color: white;
//             padding: 4px 12px;
//             border-radius: 3px;
//             font-size: 11px;
//             font-weight: 600;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             margin-bottom: 10px;
//         }

//         .gallery-title {
//             font-family: 'Cormorant Garamond', serif;
//             font-size: 1.4rem;
//             font-weight: 600;
//             margin: 0;
//             color: white;
//         }

//         .gallery-description {
//             font-size: 0.9rem;
//             opacity: 0.8;
//             margin: 5px 0 0;
//         }

//         /* Quick View Button */
//         .quick-view {
//             position: absolute;
//             top: 20px;
//             right: 20px;
//             background: rgba(255, 255, 255, 0.95);
//             border: none;
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: var(--classic-charcoal);
//             opacity: 0;
//             transform: translateY(-10px);
//             transition: all 0.3s ease;
//             cursor: pointer;
//         }

//         .gallery-item:hover .quick-view {
//             opacity: 1;
//             transform: translateY(0);
//         }

//         .quick-view:hover {
//             background: white;
//             color: var(--classic-gold);
//         }

//         /* Load More Button */
//         .load-more-container {
//             text-align: center;
//             margin-top: 60px;
//         }

//         .load-more-btn {
//             background: transparent;
//             border: 2px solid var(--classic-gold);
//             color: var(--classic-gold);
//             padding: 12px 40px;
//             border-radius: 30px;
//             font-weight: 600;
//             font-size: 14px;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             transition: var(--transition);
//             display: inline-flex;
//             align-items: center;
//             gap: 10px;
//         }

//         .load-more-btn:hover {
//             background: var(--classic-gold);
//             color: white;
//             transform: translateY(-3px);
//             box-shadow: 0 10px 20px rgba(197, 165, 114, 0.2);
//         }

//         /* Stats Section */
//         .gallery-stats {
//             background: var(--pastel-sand);
//             padding: 60px 0;
//             margin: 60px 0;
//         }

//         .stat-item {
//             text-align: center;
//             padding: 20px;
//         }

//         .stat-number {
//             font-family: 'Cormorant Garamond', serif;
//             font-size: 3rem;
//             font-weight: 700;
//             color: var(--classic-gold);
//             margin-bottom: 5px;
//         }

//         .stat-label {
//             font-size: 14px;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             color: var(--classic-charcoal);
//             font-weight: 600;
//         }

//         /* CTA Section */
//         .gallery-cta {
//             background: linear-gradient(135deg, var(--classic-gold), var(--classic-walnut));
//             color: white;
//             padding: 80px 0;
//             text-align: center;
//             border-radius: 10px;
//             margin: 80px 0;
//         }

//         .gallery-cta h2 {
//             color: white;
//             font-size: 2.5rem;
//             margin-bottom: 20px;
//         }

//         .cta-btn {
//             background: white;
//             color: var(--classic-walnut);
//             border: none;
//             padding: 15px 40px;
//             border-radius: 30px;
//             font-weight: 600;
//             font-size: 14px;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             transition: var(--transition);
//             margin-top: 20px;
//         }

//         .cta-btn:hover {
//             background: var(--pastel-cream);
//             transform: translateY(-3px);
//             box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
//         }

//         /* Video Gallery Promo */
//         .video-promo {
//             margin: 60px 0;
//         }

//         .video-card {
//             background: white;
//             border-radius: 10px;
//             overflow: hidden;
//             box-shadow: 0 10px 30px rgba(58, 58, 56, 0.1);
//             transition: var(--transition);
//         }

//         .video-card:hover {
//             transform: translateY(-10px);
//             box-shadow: 0 20px 40px rgba(58, 58, 56, 0.15);
//         }

//         .video-thumbnail {
//             position: relative;
//             overflow: hidden;
//             height: 250px;
//         }

//         .video-thumbnail img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//         }

//         .play-button {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             width: 70px;
//             height: 70px;
//             background: rgba(197, 165, 114, 0.9);
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-size: 24px;
//             transition: var(--transition);
//         }

//         .video-card:hover .play-button {
//             background: var(--classic-gold);
//             transform: translate(-50%, -50%) scale(1.1);
//         }

//         .video-content {
//             padding: 30px;
//         }

//         .video-content h3 {
//             margin-bottom: 15px;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//             .gallery-hero {
//                 padding: 60px 0 40px;
//             }

//             .gallery-hero h1 {
//                 font-size: 2.5rem;
//             }

//             .gallery-item {
//                 height: 250px;
//             }

//             .stat-number {
//                 font-size: 2.5rem;
//             }

//             .gallery-cta h2 {
//                 font-size: 2rem;
//             }
//         }

//         @media (max-width: 576px) {
//             .gallery-item {
//                 height: 200px;
//             }

//             .filter-buttons {
//                 gap: 8px;
//             }

//             .filter-btn {
//                 padding: 6px 16px;
//                 font-size: 12px;
//             }
//         }