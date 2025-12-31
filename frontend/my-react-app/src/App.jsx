import { lazy, Suspense } from 'react';
import './index.css';
import Header from './components/header/Header';
import Footer from './components/footter/Footer'; // Fixed typo: Footter → Footer
const Body = lazy(() => import('./components/body/Body'));
const Gallery = lazy(() => import('./components/gallery/Gallery'));
const Aboutus = lazy(() => import('./components/Aboutus/Aboutus'));
const Contact = lazy(() => import('./components/contact/Contact'));
const Upload = lazy(() => import('./components/upload/Upload'));
const Login = lazy(() => import('./components/login/Login'));
const Ceilings = lazy(() => import('./components/products/ceilings/Ceilings'));
const Paints = lazy(() => import('./components/products/paints/Paints'));
const Walls = lazy(() => import('./components/products/walls/Walls'));

// Import React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            {/* Default route - Home (Body) */}
            <Route path="/" element={<Body />} />

            {/* Other routes */}
            <Route path="/company" element={<Aboutus />} /> {/* Assuming Aboutus is Company page */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contacts" element={<Contact />} /> {/* Note: you used /contacts in nav */}
            <Route path="/offers" element={<div><h1>Offers Page (Create this component)</h1></div>} />
            <Route path="/blog" element={<div><h1>Blogs Page</h1></div>} />

            {/* Product sub-pages */}
            <Route path="/ceilings" element={<Ceilings />} />
            <Route path="/paints" element={<Paints />} />
            <Route path="/walls" element={<Walls />} />
            

            {/* Optional other pages */}
            <Route path="/custom-made" element={<div><h1>Customized Interiors</h1></div>} />
            <Route path="/design-and-build" element={<div><h1>Design and Build</h1></div>} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<Login />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Body />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;