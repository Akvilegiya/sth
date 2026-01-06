// Простой интерактив: меню, модал, tilt и эффекты
document.addEventListener('DOMContentLoaded', ()=> {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const play = document.getElementById('playTrailer');
  const modal = document.getElementById('trailerModal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const toggleVibe = document.getElementById('toggleVibe');
  const heroBg = document.getElementById('heroBg');
  const hero = document.getElementById('hero');

  // Burger toggle for small screens
  burger && burger.addEventListener('click', ()=> {
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
  });

  // Trailer modal
  function openModalWithVideo(youtubeId){
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    modalContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }
  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    modalContent.innerHTML = '';
  }

  play && play.addEventListener('click', (e)=>{
    const id = play.dataset.trailer || 'hNCmb-4oXJA'; // можно заменить в html
    openModalWithVideo(id);
  });
  modalClose && modalClose.addEventListener('click', closeModal);
  modalBackdrop && modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  // Toggle glitch effect
  toggleVibe && toggleVibe.addEventListener('click', ()=>{
    document.querySelectorAll('.glitch').forEach(el=>{
      el.classList.toggle('active-glitch');
      if(el.classList.contains('active-glitch')){
        // запускаем анимацию: сменяем псевдо-элементы через класс
        el.style.animation = 'glitchAnim 1s infinite';
      } else {
        el.style.animation = 'none';
      }
    });
  });

  // Tiny hero parallax on mouse move
  hero && hero.addEventListener('mousemove', (e)=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroBg.style.transform = `translate(${x*20}px, ${y*20}px)`;
  });

  // Small tilt for cards (no libs)
  const tiltEls = document.querySelectorAll('[data-tilt]');
  tiltEls.forEach(el=>{
    el.addEventListener('mousemove', (ev)=>{
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -8;
      const ry = (px - 0.5) * 12;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });
    el.addEventListener('mouseleave', ()=> el.style.transform = '');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length > 1){
        e.preventDefault();
        const target = document.querySelector(id);
        target && target.scrollIntoView({behavior:'smooth', block:'start'});
        // if nav visible on small devices, hide it
        if(window.innerWidth < 820 && nav) nav.style.display = 'none';
      }
    });
  });

  // Small accessibility: focus trap not included (simple modal)
});