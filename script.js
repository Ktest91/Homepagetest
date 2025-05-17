// Import module files
import './utils/helpers.js';
import { setupCursor } from './components/cursor.js';
import { setupNavbar } from './components/navbar.js';
import { setupCards } from './components/cards.js';
import { setupAnimations } from './components/animations.js';

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on a touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Only setup cursor on non-touch devices
  if (!isTouchDevice) {
    setupCursor();
  } else {
    // Hide cursor elements on touch devices
    document.querySelector('.cursor-dot').style.display = 'none';
    document.querySelector('.cursor-outline').style.display = 'none';
  }
  
  // Setup other components
  setupNavbar();
  setupCards();
  setupAnimations();
});