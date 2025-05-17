/**
 * Checks if the device is a touch device
 * @returns {boolean} True if the device is a touch device
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Throttles a function to limit how often it can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Maps a value from one range to another
 * @param {number} value - The value to map
 * @param {number} in_min - Input range minimum
 * @param {number} in_max - Input range maximum
 * @param {number} out_min - Output range minimum
 * @param {number} out_max - Output range maximum
 * @returns {number} Mapped value
 */
export function mapRange(value, in_min, in_max, out_min, out_max) {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/**
 * Calculates the distance between two points
 * @param {number} x1 - X coordinate of point 1
 * @param {number} y1 - Y coordinate of point 1
 * @param {number} x2 - X coordinate of point 2
 * @param {number} y2 - Y coordinate of point 2
 * @returns {number} Distance between the points
 */
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Adds a CSS class for a short duration then removes it
 * @param {HTMLElement} element - The element to add the class to
 * @param {string} className - The class name to add
 * @param {number} duration - Duration in milliseconds
 */
export function addTemporaryClass(element, className, duration) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}
