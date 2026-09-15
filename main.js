/* main.js — micro-interações da landing page Sui Generis */

// Scroll reveal suave nos elementos das seções
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .arch-item, .phase, .diag-node').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Ativa visibilidade nos elementos observados
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // Stagger nos cards e fases
  document.querySelectorAll('.cards-grid .card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.phase').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });
  document.querySelectorAll('.arch-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Header shrink no scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.6)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Diagrama: highlight sequencial dos nós
  const nodes = document.querySelectorAll('.diag-node');
  let current = 0;
  setInterval(() => {
    nodes.forEach(n => n.style.opacity = '0.6');
    if (nodes[current]) nodes[current].style.opacity = '1';
    current = (current + 1) % nodes.length;
  }, 1200);
});
