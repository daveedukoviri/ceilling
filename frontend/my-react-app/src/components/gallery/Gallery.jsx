import { useState, useEffect } from 'react';
import './Gallery.css';

const images = [
  { src: 'gallery/11.webp' },
  { src: 'gallery/12.webp' },
  { src: 'gallery/13.webp' },
  { src: 'gallery/14.webp' },
  { src: 'gallery/15.webp' },
  { src: 'gallery/16.webp' },
  { src: 'gallery/17.webp' },
  { src: 'gallery/18.webp' },
  { src: 'gallery/19.webp' },
  { src: 'gallery/110.webp' },

  { src: 'gallery/111.webp' },
  { src: 'gallery/112.webp' },
  { src: 'gallery/113.webp' },
  { src: 'gallery/114.webp' },
  { src: 'gallery/115.webp' },
  { src: 'gallery/116.webp' },
  { src: 'gallery/117.webp' },
  { src: 'gallery/118.webp' },
  { src: 'gallery/119.webp' },
  { src: 'gallery/120.webp' },

  { src: 'gallery/121.webp' },
  { src: 'gallery/122.webp' },
  { src: 'gallery/123.webp' },
  { src: 'gallery/124.webp' },
  { src: 'gallery/125.webp' },
  { src: 'gallery/126.webp' },
  { src: 'gallery/127.webp' },
  { src: 'gallery/128.webp' },
  { src: 'gallery/129.webp' },
  { src: 'gallery/130.webp' },

  { src: 'gallery/131.webp' },
  { src: 'gallery/132.webp' },
  { src: 'gallery/133.webp' },
  { src: 'gallery/134.webp' },
  { src: 'gallery/135.webp' },
  { src: 'gallery/136.webp' },
  { src: 'gallery/137.webp' },
  { src: 'gallery/138.webp' },
  { src: 'gallery/139.webp' },
  { src: 'gallery/140.webp' },

  { src: 'gallery/141.webp' },
  { src: 'gallery/142.webp' },
  { src: 'gallery/143.webp' },
  { src: 'gallery/144.webp' },
  { src: 'gallery/145.webp' },
  { src: 'gallery/146.webp' },
  { src: 'gallery/147.webp' },
  { src: 'gallery/148.webp' },
  { src: 'gallery/149.webp' },
  { src: 'gallery/150.webp' },

  { src: 'gallery/151.webp' },
  { src: 'gallery/152.webp' },
  { src: 'gallery/153.webp' },
  { src: 'gallery/154.webp' },
  { src: 'gallery/155.webp' },
  { src: 'gallery/156.webp' },
  { src: 'gallery/157.webp' },
  { src: 'gallery/158.webp' },
  { src: 'gallery/159.webp' },
  { src: 'gallery/160.webp' },

  { src: 'gallery/161.webp' },
  { src: 'gallery/162.webp' },
  { src: 'gallery/163.webp' },
  { src: 'gallery/164.webp' },
  { src: 'gallery/165.webp' },
  { src: 'gallery/166.webp' },
  { src: 'gallery/167.webp' },
  { src: 'gallery/168.webp' },
  { src: 'gallery/169.webp' },
  { src: 'gallery/170.webp' },

  { src: 'gallery/171.webp' },
  { src: 'gallery/172.webp' },
  { src: 'gallery/173.webp' },
  { src: 'gallery/174.webp' },
  { src: 'gallery/175.webp' },
  { src: 'gallery/176.webp' },
  { src: 'gallery/177.webp' },
  { src: 'gallery/178.webp' },
  { src: 'gallery/179.webp' },
  { src: 'gallery/180.webp' },

  { src: 'gallery/181.webp' },
  { src: 'gallery/182.webp' },
  { src: 'gallery/183.webp' },
  { src: 'gallery/184.webp' },
  { src: 'gallery/185.webp' },
  { src: 'gallery/186.webp' },
  { src: 'gallery/187.webp' },
  { src: 'gallery/188.webp' },
  { src: 'gallery/189.webp' },
  { src: 'gallery/190.webp' },

  { src: 'gallery/191.webp' },
  { src: 'gallery/192.webp' },
  { src: 'gallery/193.webp' },
  { src: 'gallery/194.webp' },
  { src: 'gallery/195.webp' },
  { src: 'gallery/196.webp' },
  { src: 'gallery/197.webp' },
  { src: 'gallery/198.webp' },
  { src: 'gallery/199.webp' },
  { src: 'gallery/1100.webp' },

  { src: 'gallery/1101.webp' },
  { src: 'gallery/1102.webp' },
  { src: 'gallery/1103.webp' },
  { src: 'gallery/1104.webp' },
  { src: 'gallery/1105.webp' },
  { src: 'gallery/1106.webp' },
  { src: 'gallery/1107.webp' },
  { src: 'gallery/1108.webp' },
  { src: 'gallery/1109.webp' },
  { src: 'gallery/1110.webp' },

  { src: 'gallery/1111.webp' },
  { src: 'gallery/1112.webp' },
];



function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]); // From backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Assume more until we know

  // Shuffle static images once
  const shuffledStatic = [...images];

  // Combine all images: static + uploaded
  const allImages = [...shuffledStatic, ...uploadedImages];

  // Lightbox handlers
  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') goPrev(e);
      if (e.key === 'ArrowRight') goNext(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex]);

  // Fetch uploaded images from backend
  const loadUploadedImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/upload');
      const data = await response.json();

      if (data.success && data.images.length > 0) {
        const newImages = data.images.map(img => ({
          src: `http://localhost:5000${img.url}`, // Full URL
          isUploaded: true
        }));
        setUploadedImages(prev => [...prev, ...newImages]);
        setHasMore(data.images.length === 10); // If less than max, probably no more
      } else {
        setHasMore(false);
        if (uploadedImages.length === 0) {
          setError('No uploaded images found yet.');
        }
      }
    } catch (err) {
      console.error('Failed to load uploaded images:', err);
      setError('Failed to load uploaded images. Please try again.');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="Gallery">
      <section className="gallery-hero">
        <div className="hero-overlay"></div>
        <div className="container text-center">
          <h1 className="section-title">Our Interior Design Gallery</h1>
          <p className="small">
            Discover exquisite interior designs that transform houses into homes.
            Click any image to view full size and navigate.
          </p>
        </div>
      </section>

      <div className="gallery-wrapper">
        <div className="gallery-header">
          <h1 className="section-title">Visual Inspiration</h1>
          <p className="small">Beautiful interiors • Plus your uploaded projects below</p>
        </div>

        <div className="pinterest-gallery">
          {allImages.map((image, index) => (
            <div key={index} className="pin" onClick={() => openLightbox(index)}>
              <img
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                className="pin-image"
                loading="lazy"
              />
             
            </div>
          ))}
        </div>

        {/* Load More Button & Status */}
        <div className="text-center my-5">
          {error && <p className="text-danger">{error}</p>}

          {hasMore || uploadedImages.length === 0 ? (
            <button
              className="cta-button"
              onClick={loadUploadedImages}
              disabled={loading}
            >
              {loading ? (
                <>Loading Uploaded Images...</>
              ) : uploadedImages.length === 0 ? (
                <span class="">Explore More</span>

              ) : (
                <span class="">Explore More</span>
              )}
            </button>
          ) : (
            <p className="text-muted">All uploaded images loaded!</p>
          )}
        </div>

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div className="g-lightbox-overlay" onClick={closeLightbox}>
            <div className="g-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={allImages[selectedIndex].src}
                alt={`Full view ${selectedIndex + 1}`}
                className="g-lightbox-image"
              />
              <button className="g-lightbox-close" onClick={closeLightbox}>×</button>
              <button className="g-lightbox-prev" onClick={goPrev}>
                <i className="fa fa-chevron-left"></i>
              </button>
              <button className="g-lightbox-next" onClick={goNext}>
                <i className="fa fa-chevron-right"></i>
              </button>
              <div className="g-lightbox-caption">
                {selectedIndex + 1} / {allImages.length}
                {allImages[selectedIndex].isUploaded && ' • Your Upload'}
              </div>
            </div>
          </div>
        )}

        <div className="gallery-footer">
          <p>
            Inspiration images from premium collections •
            Uploaded images from Shambhavi Enterprises clients
          </p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;