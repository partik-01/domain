const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

reveals.forEach(el => obs.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => navObs.observe(section));

// Lottie player bootstrap: ensure local Lottie animation starts and surface errors
document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('lottiePlayer');
  if (!player) {
    console.warn('Lottie player element not found (id=lottiePlayer)');
    return;
  }

  // Log when lottie-player is ready or errors
  player.addEventListener('load', () => console.log('Lottie player: load event'));
  player.addEventListener('error', (e) => console.error('Lottie player error:', e));

  // Try to play; some browsers disallow autoplay on file:// — use an HTTP server.
  try {
    if (typeof player.play === 'function') {
      player.play();
      console.log('Lottie player: play() invoked');
    }
  } catch (err) {
    console.error('Error invoking lottie play():', err);
  }
});
