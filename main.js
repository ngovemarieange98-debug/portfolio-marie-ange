document.documentElement.classList.add('js-enabled');

// Animations d'apparition au défilement
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Année automatique dans le pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Le formulaire est envoyé directement à Formspree via son attribut action dans index.html.

// Navigation fiable : défilement vers la section et fermeture du menu mobile Bootstrap.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', targetId);
    const menu = document.getElementById('navLinks');
    if (menu && menu.classList.contains('show') && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
