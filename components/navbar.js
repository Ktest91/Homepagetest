/**
 * Sets up the navbar functionality
 */
export function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  
  // Handle scroll effects for navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
  });
  
  // Handle mobile menu toggle
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    
    // Animate hamburger lines
    const spans = navToggle.querySelectorAll('span');
    if (document.body.classList.contains('nav-open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      
      // Reset hamburger
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
  
  // Setup magnetic effect on nav links
  if (!isTouchDevice()) {
    setupMagneticEffect();
  }
}

/**
 * Checks if the device is a touch device
 * @returns {boolean} True if the device is a touch device
 */
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Sets up magnetic effect on navigation links
 */
function setupMagneticEffect() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const boundingRect = link.getBoundingClientRect();
      const relX = e.clientX - boundingRect.left;
      const relY = e.clientY - boundingRect.top;
      
      const centerX = boundingRect.width / 2;
      const centerY = boundingRect.height / 2;
      
      const distanceX = (relX - centerX) / 5;
      const distanceY = (relY - centerY) / 5;
      
      link.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translate(0, 0)';
    });
  });
}