import './index.css'
import Header from './components/header/Header';
import Footter from './components/footter/Footter';
import Body from './components/body/Body';
// import Gallery from './components/gallery/Gallery';
// import Aboutus from './components/Aboutus/Aboutus';
// import Contact from './components/contact/Contact';
// import Upload from './components/upload/Upload';
// import Login  from './components/login/login';
// import KitchenShowcase from './components/products/kitchen/Kitchen';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Gallery /> */}
      {/* <Aboutus /> */}
      {/* <Contact /> */}
      {/* <Upload /> */}
      {/* <Login /> */}
      {/* <KitchenShowcase /> */}
      <Body />
      <Footter />
    </div>
  );
}

export default App;




