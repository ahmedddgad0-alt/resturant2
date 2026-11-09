const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 450));

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.menu-card').forEach(card => {
      card.classList.toggle('hide', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// Gentle 3D parallax on desktop; disabled for touch devices and reduced-motion preferences.
const stage = document.getElementById('pizzaStage');
if (stage && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', event => {
    const x = (event.clientX / window.innerWidth - .5);
    const y = (event.clientY / window.innerHeight - .5);
    stage.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 8}deg)`;
  });
  document.addEventListener('mouseleave', () => stage.style.transform = 'rotateY(0) rotateX(0)');
}

const dateInput = document.querySelector('input[type="date"]');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

document.getElementById('bookingForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const note = document.getElementById('formNote');
  note.textContent = `شكرًا ${data.get('name')}! تم تسجيل بياناتك في النموذج التجريبي. يلزم ربطه بخدمة حجز لإرسال الطلب للمطعم.`;
  note.style.color = '#d6b77f';
  event.currentTarget.reset();
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
});
