import './index.css'
import Header from './components/header/Header';
// import Gallery from './components/gallery/Gallery';
import Footter from './components/footter/Footter';
// import Aboutus from './components/Aboutus/Aboutus';
// import Contact from './components/contact/Contact';
import Upload from './components/upload/Upload';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Gallery /> */}
      {/* <Aboutus /> */}
      {/* <Contact /> */}
      <Upload />
      <Footter />
    </div>
  );
}

export default App;




