import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to show/hide the button
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="btn btn-primary back-to-top rounded-circle"
      onClick={scrollToTop}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
      }}
    >
      <i className='bi bi-chevron-double-up' />
    </button>
  );
};

export default BackToTopButton;