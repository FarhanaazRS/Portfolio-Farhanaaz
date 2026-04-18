/* ═══════════════════════════════════════════════════════════
   FARHANAAZ RS — PREMIUM PORTFOLIO SCRIPT
═══════════════════════════════════════════════════════════ */

/* ── PAGE LOADER ── */
(function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loaderBar');
  if (!loader || !bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
    if (progress === 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initReveal();
      }, 400);
    }
  }, 60);

  document.body.style.overflow = 'hidden';
})();

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function followCursor() {
    fx += (mx - fx) * .12;
    fy += (my - fy) * .12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(followCursor);
  }
  followCursor();

  document.querySelectorAll('a, button, .sk-card, .project-row, .svc-card, .channel-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    });
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = 0; follower.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = 1; follower.style.opacity = 1; });
})();

/* ── NAVBAR ── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const lightBgSections = new Set(['about', 'skills', 'work']);

  function onScroll() {
    const scrollY = window.scrollY;

    // Scrolled backdrop
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Active section tracking
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 150) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    // Light/dark adaptation
    if (scrollY <= 60) {
      navbar.classList.toggle('light-bg', lightBgSections.has(current));
    } else {
      navbar.classList.remove('light-bg');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── MOBILE DRAWER ── */
(function initDrawer() {
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('drawer');
  const close  = document.getElementById('drawerClose');
  const bg     = document.getElementById('drawerBg');
  const links  = document.querySelectorAll('.d-link');

  const open  = () => { drawer.classList.add('open'); bg.style.display = 'block'; document.body.style.overflow = 'hidden'; };
  const shut  = () => { drawer.classList.remove('open'); bg.style.display = 'none'; document.body.style.overflow = ''; };

  if (burger) burger.addEventListener('click', open);
  if (close)  close.addEventListener('click', shut);
  if (bg)     bg.addEventListener('click', shut);
  links.forEach(l => l.addEventListener('click', shut));
})();

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-clip');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ── SKILL BARS ── */
(function initSkillBars() {
  const cards = document.querySelectorAll('.sk-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(c => obs.observe(c));
})();

/* ── HERO CANVAS: Particle Field ── */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -1000, y: -1000 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .4,
        vy: (Math.random() - .5) * .4,
        r: Math.random() * 1.5 + .3,
        opacity: Math.random() * .5 + .1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Mouse influence
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        p.x += dx / dist * .8;
        p.y += dy / dist * .8;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,169,110,${p.opacity})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i+1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(200,169,110,${.12 * (1 - d/100)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(drawParticles);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('resize', resize);
  resize();
  drawParticles();
})();

/* ── TYPEWRITER ── */
(function initTypewriter() {
  const el = document.getElementById('tw');
  if (!el) return;

  const phrases = [
    'Full Stack Apps.',
    'Embedded Systems.',
    'Real-Time Pipelines.',
    'Secure IoT Devices.',
    'ML-Powered Platforms.',
    'Cloud Architectures.',
    'REST APIs.',
    'Ideas Into Reality.'
  ];

  let idx = 0, charIdx = 0, deleting = false;

  function tick() {
    const word = phrases[idx];
    el.textContent = deleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);

    let delay = deleting ? 38 : 88;
    if (!deleting && charIdx === word.length + 1) { deleting = true; delay = 1600; }
    else if (deleting && charIdx < 0)  { deleting = false; idx = (idx + 1) % phrases.length; delay = 400; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 1800);
})();

/* ── PROJECT ROW HOVER IMAGE ── */
(function initProjectHover() {
  document.querySelectorAll('.project-row').forEach(row => {
    const img = row.querySelector('.pr-hover-img');
    if (!img) return;

    row.addEventListener('mouseenter', () => img.classList.add('active'));
    row.addEventListener('mouseleave', () => img.classList.remove('active'));
    row.addEventListener('mousemove', e => {
      img.style.left  = (e.clientX + 20) + 'px';
      img.style.top   = (e.clientY - 80) + 'px';
    });
  });
})();

/* ── CONTACT FORM ── */
(function initForm() {
  const form  = document.getElementById('cf');
  const btn   = document.getElementById('cf-btn');
  const msg   = document.getElementById('cf-msg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.querySelector('span').textContent = 'Sending…';
    btn.disabled = true;
    msg.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        btn.querySelector('span').textContent = 'Message Sent ✓';
        btn.style.background = '#173130';
        msg.textContent = "Thank you! I'll respond shortly.";
        form.reset();
        setTimeout(() => {
          btn.querySelector('span').textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
          msg.textContent = '';
        }, 4500);
      } else {
        throw new Error('Failed');
      }
    } catch {
      msg.textContent = 'Something went wrong. Please try again.';
      btn.querySelector('span').textContent = 'Send Message';
      btn.disabled = false;
    }
  });
})();

/* ── SMOOTH SECTION PARALLAX ── */
(function initParallax() {
  const bgTexts = document.querySelectorAll('.section-bg-text');

  function onScroll() {
    bgTexts.forEach(el => {
      const rect  = el.closest('section').getBoundingClientRect();
      const ratio = -rect.top / window.innerHeight;
      el.style.transform = `translateX(-50%) translateY(${ratio * 30}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── STAGGERED NAV LINK ANIMATION ON LOAD ── */
(function initNavStagger() {
  const links = document.querySelectorAll('.nav__link');
  links.forEach((link, i) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      link.style.transition = 'opacity .5s ease, transform .5s ease, color .3s';
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    }, 1400 + i * 80);
  });
})();

/* ── ACTIVE SECTION INDICATOR ── */
(function initSectionIndicator() {
  const sections = document.querySelectorAll('section[id]');
  const indicators = document.querySelectorAll('.nav__link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        const id = entry.target.id;
        indicators.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => obs.observe(s));
})();

/* ── KEYBOARD ACCESSIBILITY ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('drawer');
    const bg     = document.getElementById('drawerBg');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      bg.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

/* ── REVEAL ACTIVE LINKS ON SCROLL (debounced) ── */
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 200) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }, 20);
}, { passive: true });