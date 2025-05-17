import { throttle } from '../utils/helpers.js';

/**
 * Sets up the custom cursor
 */
export function setupCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  // Set initial positions off-screen
  cursorDot.style.opacity = 0;
  cursorOutline.style.opacity = 0;
  
  // Track mouse position
  let mouseX = -100;
  let mouseY = -100;
  
  // Track cursor position (with easing)
  let dotX = -100;
  let dotY = -100;
  let outlineX = -100;
  let outlineY = -100;
  
  // Track hover state
  let isHovering = false;
  
  // Mouse move handler (throttled for performance)
  const mouseMove = throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show cursor once we have position
    if (cursorDot.style.opacity === '0') {
      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 1;
    }
  }, 10);
  
  // Set up mouse move event listener
  document.addEventListener('mousemove', mouseMove);
  
  // Set up hover effects
  setupHoverEffects();
  
  // Animation loop for smooth cursor movement
  function animateCursor() {
    // Ease cursor movement
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    // Apply position
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    
    // Scale outline when hovering
    const transform = isHovering 
      ? `translate(${outlineX}px, ${outlineY}px) scale(1.5)` 
      : `translate(${outlineX}px, ${outlineY}px)`;
    
    cursorOutline.style.transform = transform;
    
    // Continue animation loop
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation loop
  animateCursor();
  
  // Handle cursor leaving the window
  document.addEventListener('mouseout', () => {
    cursorDot.style.opacity = 0;
    cursorOutline.style.opacity = 0;
  });
  
  document.addEventListener('mouseover', () => {
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
  });
}

/**
 * Sets up hover effects for interactive elements
 */
function setupHoverEffects() {
  const cursorOutline = document.querySelector('.cursor-outline');
  
  // Elements that should trigger hover effect
  const interactiveElements = document.querySelectorAll('a, button, .card-btn, .category-card, .featured-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.backgroundColor = 'rgba(46, 134, 255, 0.1)';
      cursorOutline.style.borderColor = 'rgba(46, 134, 255, 0.8)';
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.backgroundColor = 'transparent';
      cursorOutline.style.borderColor = 'rgba(46, 134, 255, 1)';
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
    });
  });
}