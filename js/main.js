// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Resize-on-scroll using IntersectionObserver (fixes “last bubble not enlarging” too)
const bubbles = [...document.querySelectorAll('.bubble')];

// IntersectionObserver to scale bubbles when ~50% visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: Array.from({length:11},(_,i)=>i/10) // 0.0..1.0
});

bubbles.forEach(b => observer.observe(b));

// Edge case: ensure the last bubble activates when scrolled to the bottom
function activateLastAtBottom() {
  const nearBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight - 2);
  if (nearBottom) {
    bubbles.forEach(b => b.classList.remove('active'));
    bubbles[bubbles.length - 1].classList.add('active');
  }
}
window.addEventListener('scroll', activateLastAtBottom);
window.addEventListener('load', activateLastAtBottom);

// Smooth scroll to section when a bubble is clicked
bubbles.forEach(b => {
  b.addEventListener('click', (e) => {
    const id = b.getAttribute('href');
    if (id && id.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
