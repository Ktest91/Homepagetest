/**
 * Sets up all animations for the page
 */
export function setupAnimations() {
  setupHeroAnimations();
  setupParticles();
  setupScrollReveal();
}

/**
 * Sets up hero section animations using GSAP
 */
function setupHeroAnimations() {
  // Fade and slide animations for hero elements
  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });
  
  gsap.from('.cta-button', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
  });
}

/**
 * Creates and animates particle background
 */
function setupParticles() {
  const particles = document.getElementById('particles');
  const particleCount = 100;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle(particles);
  }
  
  // Animate particles
  animateParticles();
}

/**
 * Creates a single particle element
 * @param {HTMLElement} container - Container for particles
 */
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random size between 1 and 3px
  const size = Math.random() * 2 + 1;
  
  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  
  // Random opacity
  const opacity = Math.random() * 0.5 + 0.3;
  
  // Set particle styles
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background-color: rgba(46, 134, 255, ${opacity});
    left: ${posX}%;
    top: ${posY}%;
    border-radius: 50%;
    pointer-events: none;
  `;
  
  // Store random values for animation
  particle.dataset.speedX = (Math.random() - 0.5) * 0.5;
  particle.dataset.speedY = (Math.random() - 0.5) * 0.5;
  particle.dataset.x = posX;
  particle.dataset.y = posY;
  
  // Add to container
  container.appendChild(particle);
}

/**
 * Animates all particles
 */
function animateParticles() {
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach(particle => {
    // Get current position and speed
    let x = parseFloat(particle.dataset.x);
    let y = parseFloat(particle.dataset.y);
    const speedX = parseFloat(particle.dataset.speedX);
    const speedY = parseFloat(particle.dataset.speedY);
    
    // Update position
    x += speedX;
    y += speedY;
    
    // Boundary check
    if (x < 0) x = 100;
    if (x > 100) x = 0;
    if (y < 0) y = 100;
    if (y > 100) y = 0;
    
    // Update position in dataset
    particle.dataset.x = x;
    particle.dataset.y = y;
    
    // Apply updated position
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
  });
  
  // Continue animation
  requestAnimationFrame(animateParticles);
}

/**
 * Sets up animations for elements that appear on scroll
 */
function setupScrollReveal() {
  // Animate section titles as they come into view
  const sectionTitles = document.querySelectorAll('.section-title');
  
  gsap.from(sectionTitles, {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.categories',
      start: 'top 80%',
    }
  });
  
  // Animate category cards
  const categoryCards = document.querySelectorAll('.category-card');
  
  gsap.from(categoryCards, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.category-container',
      start: 'top 80%',
    }
  });
}
