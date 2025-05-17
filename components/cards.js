import { isTouchDevice } from '../utils/helpers.js';

/**
 * Sets up card effects and animations
 */
export function setupCards() {
  // Only apply 3D effects on non-touch devices
  if (!isTouchDevice()) {
    setup3DCards();
    setupMagneticButtons();
  }
  
  // Setup on-scroll animations for featured cards
  setupScrollAnimations();
}

/**
 * Sets up 3D tilt effect for cards
 */
function setup3DCards() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      // Calculate mouse position relative to card center
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Calculate rotation (limited to a small range)
      const rotateY = mouseX * 0.05;
      const rotateX = -mouseY * 0.05;
      
      // Apply the 3D effect
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      // Light effect to follow mouse
      const shine = card.querySelector('.card-content');
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${mouseX + cardRect.width/2}px ${mouseY + cardRect.height/2}px, rgba(255,255,255,0.1), transparent)`;
      }
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      
      const shine = card.querySelector('.card-content');
      if (shine) {
        shine.style.background = 'none';
      }
    });
    
    // Smooth transition when mouse enters
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.2s';
      setTimeout(() => {
        card.style.transition = '';
      }, 200);
    });
  });
}

/**
 * Sets up magnetic effect for buttons
 */
function setupMagneticButtons() {
  const buttons = document.querySelectorAll('.card-btn, .cta-button');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const boundingRect = button.getBoundingClientRect();
      const relX = e.clientX - boundingRect.left;
      const relY = e.clientY - boundingRect.top;
      
      const centerX = boundingRect.width / 2;
      const centerY = boundingRect.height / 2;
      
      const distanceX = (relX - centerX) / 3;
      const distanceY = (relY - centerY) / 3;
      
      button.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * Sets up scroll-based animations for cards
 */
function setupScrollAnimations() {
  const featuredCards = document.querySelectorAll('.featured-card');
  
  // Add animation classes based on position in array
  featuredCards.forEach((card, index) => {
    card.classList.add('animate__fadeInUp');
    card.style.animationDelay = `${0.2 * index}s`;
    
    // Initially hide the cards
    card.style.opacity = '0';
  });
  
  // Callback for Intersection Observer
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Create and configure Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.1
  });
  
  // Observe each featured card
  featuredCards.forEach(card => {
    observer.observe(card);
  });
}