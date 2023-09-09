import { getViewCount, updateViewCount } from './api.js';

const yearSpan = document.getElementById('year');
const viewsDiv = document.getElementById('views');

function animateValue(obj, start, end, duration, easingFunction) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const timeElapsed = timestamp - startTimestamp;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easingFunction(progress);
    obj.innerHTML = Math.floor(easedProgress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Easing function: easeInOutQuad
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function setYear() {
  const currentYear = new Date().getFullYear();
  yearSpan.innerHTML = currentYear;
}

(async () => {
  setYear();
  await updateViewCount();
  const updated = await getViewCount();
  animateValue(viewsDiv, 0, updated, 4000, easeInOutQuad);
})();
