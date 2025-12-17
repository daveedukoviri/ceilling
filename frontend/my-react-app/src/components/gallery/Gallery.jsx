import { useState, useEffect } from 'react';
import './Gallery.css';

const images = [
  { src: 'src/assets/img/gallery/1 (1).JPG' },
  { src: 'src/assets/img/gallery/1 (2).JPG' },
  { src: 'src/assets/img/gallery/1 (3).JPG' },
  { src: 'src/assets/img/gallery/1 (4).JPG' },
  { src: 'src/assets/img/gallery/1 (5).JPG' },
  { src: 'src/assets/img/gallery/1 (6).JPG' },
  { src: 'src/assets/img/gallery/1 (7).JPG' },
  { src: 'src/assets/img/gallery/1 (8).JPG' },
  { src: 'src/assets/img/gallery/1 (9).JPG' },
  { src: 'src/assets/img/gallery/1 (10).JPG' },

  { src: 'src/assets/img/gallery/1 (11).JPG' },
  { src: 'src/assets/img/gallery/1 (12).JPG' },
  { src: 'src/assets/img/gallery/1 (13).JPG' },
  { src: 'src/assets/img/gallery/1 (14).JPG' },
  { src: 'src/assets/img/gallery/1 (15).JPG' },
  { src: 'src/assets/img/gallery/1 (16).JPG' },
  { src: 'src/assets/img/gallery/1 (17).JPG' },
  { src: 'src/assets/img/gallery/1 (18).JPG' },
  { src: 'src/assets/img/gallery/1 (19).JPG' },
  { src: 'src/assets/img/gallery/1 (20).JPG' },

  { src: 'src/assets/img/gallery/1 (21).JPG' },
  { src: 'src/assets/img/gallery/1 (22).JPG' },
  { src: 'src/assets/img/gallery/1 (23).JPG' },
  { src: 'src/assets/img/gallery/1 (24).JPG' },
  { src: 'src/assets/img/gallery/1 (25).JPG' },
  { src: 'src/assets/img/gallery/1 (26).JPG' },
  { src: 'src/assets/img/gallery/1 (27).JPG' },
  { src: 'src/assets/img/gallery/1 (28).JPG' },
  { src: 'src/assets/img/gallery/1 (29).JPG' },
  { src: 'src/assets/img/gallery/1 (30).JPG' },

  { src: 'src/assets/img/gallery/1 (31).JPG' },
  { src: 'src/assets/img/gallery/1 (32).JPG' },
  { src: 'src/assets/img/gallery/1 (33).JPG' },
  { src: 'src/assets/img/gallery/1 (34).JPG' },
  { src: 'src/assets/img/gallery/1 (35).JPG' },
  { src: 'src/assets/img/gallery/1 (36).JPG' },
  { src: 'src/assets/img/gallery/1 (37).JPG' },
  { src: 'src/assets/img/gallery/1 (38).JPG' },
  { src: 'src/assets/img/gallery/1 (39).JPG' },
  { src: 'src/assets/img/gallery/1 (40).JPG' },

  { src: 'src/assets/img/gallery/1 (41).JPG' },
  { src: 'src/assets/img/gallery/1 (42).JPG' },
  { src: 'src/assets/img/gallery/1 (43).JPG' },
  { src: 'src/assets/img/gallery/1 (44).JPG' },
  { src: 'src/assets/img/gallery/1 (45).JPG' },
  { src: 'src/assets/img/gallery/1 (46).JPG' },
  { src: 'src/assets/img/gallery/1 (47).JPG' },
  { src: 'src/assets/img/gallery/1 (48).JPG' },
  { src: 'src/assets/img/gallery/1 (49).JPG' },
  { src: 'src/assets/img/gallery/1 (50).JPG' },

  { src: 'src/assets/img/gallery/1 (51).JPG' },
  { src: 'src/assets/img/gallery/1 (52).JPG' },
  { src: 'src/assets/img/gallery/1 (53).JPG' },
  { src: 'src/assets/img/gallery/1 (54).JPG' },
  { src: 'src/assets/img/gallery/1 (55).JPG' },
  { src: 'src/assets/img/gallery/1 (56).JPG' },
  { src: 'src/assets/img/gallery/1 (57).JPG' },
  { src: 'src/assets/img/gallery/1 (58).JPG' },
  { src: 'src/assets/img/gallery/1 (59).JPG' },
  { src: 'src/assets/img/gallery/1 (60).JPG' },

  { src: 'src/assets/img/gallery/1 (61).JPG' },
  { src: 'src/assets/img/gallery/1 (62).JPG' },
  { src: 'src/assets/img/gallery/1 (63).JPG' },
  { src: 'src/assets/img/gallery/1 (64).JPG' },
  { src: 'src/assets/img/gallery/1 (65).JPG' },
  { src: 'src/assets/img/gallery/1 (66).JPG' },
  { src: 'src/assets/img/gallery/1 (67).JPG' },
  { src: 'src/assets/img/gallery/1 (68).JPG' },
  { src: 'src/assets/img/gallery/1 (69).JPG' },
  { src: 'src/assets/img/gallery/1 (70).JPG' },

  { src: 'src/assets/img/gallery/1 (71).JPG' },
  { src: 'src/assets/img/gallery/1 (72).JPG' },
  { src: 'src/assets/img/gallery/1 (73).JPG' },
  { src: 'src/assets/img/gallery/1 (74).JPG' },
  { src: 'src/assets/img/gallery/1 (75).JPG' },
  { src: 'src/assets/img/gallery/1 (76).JPG' },
  { src: 'src/assets/img/gallery/1 (77).JPG' },
  { src: 'src/assets/img/gallery/1 (78).JPG' },
  { src: 'src/assets/img/gallery/1 (79).JPG' },
  { src: 'src/assets/img/gallery/1 (80).JPG' },

  { src: 'src/assets/img/gallery/1 (81).JPG' },
  { src: 'src/assets/img/gallery/1 (82).JPG' },
  { src: 'src/assets/img/gallery/1 (83).JPG' },
  { src: 'src/assets/img/gallery/1 (84).JPG' },
  { src: 'src/assets/img/gallery/1 (85).JPG' },
  { src: 'src/assets/img/gallery/1 (86).JPG' },
  { src: 'src/assets/img/gallery/1 (87).JPG' },
  { src: 'src/assets/img/gallery/1 (88).JPG' },
  { src: 'src/assets/img/gallery/1 (89).JPG' },
  { src: 'src/assets/img/gallery/1 (90).JPG' },

  { src: 'src/assets/img/gallery/1 (91).JPG' },
  { src: 'src/assets/img/gallery/1 (92).JPG' },
  { src: 'src/assets/img/gallery/1 (93).JPG' },
  { src: 'src/assets/img/gallery/1 (94).JPG' },
  { src: 'src/assets/img/gallery/1 (95).JPG' },
  { src: 'src/assets/img/gallery/1 (96).JPG' },
  { src: 'src/assets/img/gallery/1 (97).JPG' },
  { src: 'src/assets/img/gallery/1 (98).JPG' },
  { src: 'src/assets/img/gallery/1 (99).JPG' },
  { src: 'src/assets/img/gallery/1 (100).JPG' },

  { src: 'src/assets/img/gallery/1 (101).JPG' },
  { src: 'src/assets/img/gallery/1 (102).JPG' },
  { src: 'src/assets/img/gallery/1 (103).JPG' },
  { src: 'src/assets/img/gallery/1 (104).JPG' },
  { src: 'src/assets/img/gallery/1 (105).JPG' },
  { src: 'src/assets/img/gallery/1 (106).JPG' },
  { src: 'src/assets/img/gallery/1 (107).JPG' },
  { src: 'src/assets/img/gallery/1 (108).JPG' },
  { src: 'src/assets/img/gallery/1 (109).JPG' },
  { src: 'src/assets/img/gallery/1 (110).JPG' },

  { src: 'src/assets/img/gallery/1 (111).JPG' },
  { src: 'src/assets/img/gallery/1 (112).JPG' },
];


function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Shuffle images on load for Pinterest feel
  const shuffledImages = [...images].sort(() => Math.random() - 0.5);

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
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={shuffledImages[selectedIndex].src} alt={shuffledImages[selectedIndex].alt} className="lightbox-image" />
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
              <button className="lightbox-prev" onClick={goPrev}>‹</button>
              <button className="lightbox-next" onClick={goNext}>›</button>
              <div className="lightbox-caption">{selectedIndex + 1} / {shuffledImages.length}</div>
            </div>
          </div>
        )}

        <div className="gallery-footer">
          <p>Images sourced from premium design collections • Gallery inspired by Pinterest</p>
        </div>
      </div>
    </>
  );
}

export default Gallery;