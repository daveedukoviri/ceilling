import { useState, useEffect } from 'react';
import './Gallery.css';

const images = [
  { src: 'src/assets/img/gallery/1 (1).webp' },
  { src: 'src/assets/img/gallery/1 (2).webp' },
  { src: 'src/assets/img/gallery/1 (3).webp' },
  { src: 'src/assets/img/gallery/1 (4).webp' },
  { src: 'src/assets/img/gallery/1 (5).webp' },
  { src: 'src/assets/img/gallery/1 (6).webp' },
  { src: 'src/assets/img/gallery/1 (7).webp' },
  { src: 'src/assets/img/gallery/1 (8).webp' },
  { src: 'src/assets/img/gallery/1 (9).webp' },
  { src: 'src/assets/img/gallery/1 (10).webp' },

  { src: 'src/assets/img/gallery/1 (11).webp' },
  { src: 'src/assets/img/gallery/1 (12).webp' },
  { src: 'src/assets/img/gallery/1 (13).webp' },
  { src: 'src/assets/img/gallery/1 (14).webp' },
  { src: 'src/assets/img/gallery/1 (15).webp' },
  { src: 'src/assets/img/gallery/1 (16).webp' },
  { src: 'src/assets/img/gallery/1 (17).webp' },
  { src: 'src/assets/img/gallery/1 (18).webp' },
  { src: 'src/assets/img/gallery/1 (19).webp' },
  { src: 'src/assets/img/gallery/1 (20).webp' },

  { src: 'src/assets/img/gallery/1 (21).webp' },
  { src: 'src/assets/img/gallery/1 (22).webp' },
  { src: 'src/assets/img/gallery/1 (23).webp' },
  { src: 'src/assets/img/gallery/1 (24).webp' },
  { src: 'src/assets/img/gallery/1 (25).webp' },
  { src: 'src/assets/img/gallery/1 (26).webp' },
  { src: 'src/assets/img/gallery/1 (27).webp' },
  { src: 'src/assets/img/gallery/1 (28).webp' },
  { src: 'src/assets/img/gallery/1 (29).webp' },
  { src: 'src/assets/img/gallery/1 (30).webp' },

  { src: 'src/assets/img/gallery/1 (31).webp' },
  { src: 'src/assets/img/gallery/1 (32).webp' },
  { src: 'src/assets/img/gallery/1 (33).webp' },
  { src: 'src/assets/img/gallery/1 (34).webp' },
  { src: 'src/assets/img/gallery/1 (35).webp' },
  { src: 'src/assets/img/gallery/1 (36).webp' },
  { src: 'src/assets/img/gallery/1 (37).webp' },
  { src: 'src/assets/img/gallery/1 (38).webp' },
  { src: 'src/assets/img/gallery/1 (39).webp' },
  { src: 'src/assets/img/gallery/1 (40).webp' },

  { src: 'src/assets/img/gallery/1 (41).webp' },
  { src: 'src/assets/img/gallery/1 (42).webp' },
  { src: 'src/assets/img/gallery/1 (43).webp' },
  { src: 'src/assets/img/gallery/1 (44).webp' },
  { src: 'src/assets/img/gallery/1 (45).webp' },
  { src: 'src/assets/img/gallery/1 (46).webp' },
  { src: 'src/assets/img/gallery/1 (47).webp' },
  { src: 'src/assets/img/gallery/1 (48).webp' },
  { src: 'src/assets/img/gallery/1 (49).webp' },
  { src: 'src/assets/img/gallery/1 (50).webp' },

  { src: 'src/assets/img/gallery/1 (51).webp' },
  { src: 'src/assets/img/gallery/1 (52).webp' },
  { src: 'src/assets/img/gallery/1 (53).webp' },
  { src: 'src/assets/img/gallery/1 (54).webp' },
  { src: 'src/assets/img/gallery/1 (55).webp' },
  { src: 'src/assets/img/gallery/1 (56).webp' },
  { src: 'src/assets/img/gallery/1 (57).webp' },
  { src: 'src/assets/img/gallery/1 (58).webp' },
  { src: 'src/assets/img/gallery/1 (59).webp' },
  { src: 'src/assets/img/gallery/1 (60).webp' },

  { src: 'src/assets/img/gallery/1 (61).webp' },
  { src: 'src/assets/img/gallery/1 (62).webp' },
  { src: 'src/assets/img/gallery/1 (63).webp' },
  { src: 'src/assets/img/gallery/1 (64).webp' },
  { src: 'src/assets/img/gallery/1 (65).webp' },
  { src: 'src/assets/img/gallery/1 (66).webp' },
  { src: 'src/assets/img/gallery/1 (67).webp' },
  { src: 'src/assets/img/gallery/1 (68).webp' },
  { src: 'src/assets/img/gallery/1 (69).webp' },
  { src: 'src/assets/img/gallery/1 (70).webp' },

  { src: 'src/assets/img/gallery/1 (71).webp' },
  { src: 'src/assets/img/gallery/1 (72).webp' },
  { src: 'src/assets/img/gallery/1 (73).webp' },
  { src: 'src/assets/img/gallery/1 (74).webp' },
  { src: 'src/assets/img/gallery/1 (75).webp' },
  { src: 'src/assets/img/gallery/1 (76).webp' },
  { src: 'src/assets/img/gallery/1 (77).webp' },
  { src: 'src/assets/img/gallery/1 (78).webp' },
  { src: 'src/assets/img/gallery/1 (79).webp' },
  { src: 'src/assets/img/gallery/1 (80).webp' },

  { src: 'src/assets/img/gallery/1 (81).webp' },
  { src: 'src/assets/img/gallery/1 (82).webp' },
  { src: 'src/assets/img/gallery/1 (83).webp' },
  { src: 'src/assets/img/gallery/1 (84).webp' },
  { src: 'src/assets/img/gallery/1 (85).webp' },
  { src: 'src/assets/img/gallery/1 (86).webp' },
  { src: 'src/assets/img/gallery/1 (87).webp' },
  { src: 'src/assets/img/gallery/1 (88).webp' },
  { src: 'src/assets/img/gallery/1 (89).webp' },
  { src: 'src/assets/img/gallery/1 (90).webp' },

  { src: 'src/assets/img/gallery/1 (91).webp' },
  { src: 'src/assets/img/gallery/1 (92).webp' },
  { src: 'src/assets/img/gallery/1 (93).webp' },
  { src: 'src/assets/img/gallery/1 (94).webp' },
  { src: 'src/assets/img/gallery/1 (95).webp' },
  { src: 'src/assets/img/gallery/1 (96).webp' },
  { src: 'src/assets/img/gallery/1 (97).webp' },
  { src: 'src/assets/img/gallery/1 (98).webp' },
  { src: 'src/assets/img/gallery/1 (99).webp' },
  { src: 'src/assets/img/gallery/1 (100).webp' },

  { src: 'src/assets/img/gallery/1 (101).webp' },
  { src: 'src/assets/img/gallery/1 (102).webp' },
  { src: 'src/assets/img/gallery/1 (103).webp' },
  { src: 'src/assets/img/gallery/1 (104).webp' },
  { src: 'src/assets/img/gallery/1 (105).webp' },
  { src: 'src/assets/img/gallery/1 (106).webp' },
  { src: 'src/assets/img/gallery/1 (107).webp' },
  { src: 'src/assets/img/gallery/1 (108).webp' },
  { src: 'src/assets/img/gallery/1 (109).webp' },
  { src: 'src/assets/img/gallery/1 (110).webp' },

  { src: 'src/assets/img/gallery/1 (111).webp' },
  { src: 'src/assets/img/gallery/1 (112).webp' },
];


function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Shuffle images on load for Pinterest feel
  const shuffledImages = [...images];

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : shuffledImages.length - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < shuffledImages.length - 1 ? prev + 1 : 0));
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

  return (
    <>
      <section className="gallery-hero">
        <div className="hero-overlay"></div>
        <div className="container text-center">
          <h1>Our Interior Design Gallery</h1>
          <p>Discover exquisite interior designs that transform houses into homes. Click any image to view full size and navigate.</p>
        </div>
      </section>

      <div className="gallery-wrapper">
        <div className="gallery-header">
          <h1>Visual Inspiration</h1>
          <p>Beautiful interiors from around the world.</p>
        </div>

        <div className="pinterest-gallery">
          {shuffledImages.map((image, index) => (
            <div key={index} className="pin" onClick={() => openLightbox(index)}>
              <img src={image.src} alt={image.alt} className="pin-image" loading="lazy" />
            </div>
          ))}
        </div>

        {selectedIndex !== null && (
          <div className="g-lightbox-overlay" onClick={closeLightbox}>
            <div className="g-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={shuffledImages[selectedIndex].src} alt={shuffledImages[selectedIndex].alt} className="g-lightbox-image" />
              <button className="g-lightbox-close" onClick={closeLightbox}>×</button>
              <button className="g-lightbox-prev" onClick={goPrev}><i className='fa fa-chevron-left'></i></button>
              <button className="g-lightbox-next " onClick={goNext}><i className='fa fa-chevron-right'></i></button>
              <div className="g-lightbox-caption">{selectedIndex + 1} / {shuffledImages.length}</div>
            </div>
          </div>
        )}

        <div className="gallery-footer">
          <p>Images sourced from premium design collections sai shambhavi • Gallery inspired by Us</p>
        </div>
      </div>
    </>
  );
}

export default Gallery;