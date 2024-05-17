// import React, { useState, useEffect, Suspense } from 'react';
// import { Element, Events, scroller } from 'react-scroll';
// import Header from './components/Header';
// import Home from "./components/Home";
//
// // Lazy loading other components
// const About = React.lazy(() => import('./components/About'));
// const Contact = React.lazy(() => import('./components/Contact'));
// const Skills = React.lazy(() => import('./components/Skills'));
// const Projects = React.lazy(() => import('./components/Projects'));
// const Services = React.lazy(() => import('./components/Services'));
//
// function App() {
//     const [activeSection, setActiveSection] = useState('home');
//
//     useEffect(() => {
//         // Listen for scroll events
//         Events.scrollEvent.register('begin', (to, element) => {
//             setActiveSection(to);
//         });
//
//         // Clean up
//         return () => {
//             Events.scrollEvent.remove('begin');
//         };
//     }, []);
//
//     const handleSetActiveSection = (section) => {
//         setActiveSection(section);
//         scroller.scrollTo(section, {
//             duration: 800,
//             smooth: true,
//         });
//     };
//
//     return (
//         <div>
//             <Header setActiveSection={handleSetActiveSection} />
//             <div className="page-content" style={{ minHeight: "100vh" }}>
//                 {activeSection === 'home' && (
//                     <Element name="home">
//                         <Home />
//                     </Element>
//                 )}
//                 <Suspense fallback={<div>Loading...</div>}>
//                     {activeSection === 'about' && (
//                         <Element name="about">
//                             <About />
//                         </Element>
//                     )}
//                     {activeSection === 'skills' && (
//                         <Element name="skills">
//                             <Skills />
//                         </Element>
//                     )}
//                     {activeSection === 'services' && (
//                         <Element name="services">
//                             <Services />
//                         </Element>
//                     )}
//                     {activeSection === 'projects' && (
//                         <Element name="projects">
//                             <Projects />
//                         </Element>
//                     )}
//                     {activeSection === 'contact' && (
//                         <Element name="contact">
//                             <Contact />
//                         </Element>
//                     )}
//                 </Suspense>
//             </div>
//         </div>
//     );
// }
//
// export default App;
import React, { useState, useEffect, Suspense } from 'react';
import { Element, Events, scroller } from 'react-scroll';
import Header from './components/Header';
import Home from "./components/Home";
import About from "./components/About";

// Lazy loading other components with delay

const LazyContact = React.lazy(() => new Promise(resolve => setTimeout(resolve, 200)).then(() => import('./components/Contact')));
const LazySkills = React.lazy(() => new Promise(resolve => setTimeout(resolve, 300)).then(() => import('./components/Skills')));
const LazyProjects = React.lazy(() => new Promise(resolve => setTimeout(resolve, 500)).then(() => import('./components/Projects')));

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Listen for scroll events
    Events.scrollEvent.register('begin', (to, element) => {
      setActiveSection(to);
    });

    // Clean up
    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    scroller.scrollTo(section, {
      duration: 800,
      smooth: true,
    });
  };

  return (
      <div>
        <Header setActiveSection={handleSetActiveSection} />
        <div className="page-content" style={{ minHeight: "100vh" }}>
          <Element name="home">
            <Home />
          </Element>
          <Element name="about">
            <About />
          </Element>
          <Suspense fallback={<div>Loading...</div>}>
            <LazySkills />
            <LazyProjects />
            <LazyContact />
          </Suspense>
        </div>
      </div>
  );
}

export default App;
