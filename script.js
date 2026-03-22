// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const toggle = document.querySelector('.nav__toggle');
const links  = document.querySelector('.nav__links');
if (toggle){ toggle.addEventListener('click', () => links.classList.toggle('open')); }

// ===== THEME SWITCHER =====
const themes = ["aurora", "sunset", "oceanic", "royal", "nebula"];
const bodyEl = document.body;
const themeBtn = document.getElementById('themeBtn');

// Load saved theme or default to aurora
const saved = localStorage.getItem('theme');
let idx = Math.max(0, themes.indexOf(saved));
bodyEl.setAttribute('data-theme', themes[idx] || 'aurora');

// Manual cycle
if (themeBtn){
  themeBtn.addEventListener('click', () => {
    idx = (idx + 1) % themes.length;
    bodyEl.setAttribute('data-theme', themes[idx]);
    localStorage.setItem('theme', themes[idx]);
  });
}

// Auto-rotate every 20s (disable by commenting out this block)
let rotateTimer = setInterval(() => {
  idx = (idx + 1) % themes.length;
  bodyEl.setAttribute('data-theme', themes[idx]);
  localStorage.setItem('theme', themes[idx]);
}, 20000);

// ===== Profile image fallback =====
const visual = document.getElementById('heroVisual');
const avatar = document.getElementById('avatarImg');
if (avatar) {
  avatar.addEventListener('error', () => {
    visual.classList.add('no-photo');
  });
}

// ===== Projects data =====
const projects = [
  {
    title: 'House Price Prediction – Kaggle (Advanced Regression)',
    description:
      'End‑to‑end ML pipeline with ensemble stacking (LightGBM + XGBoost + Ridge). Robust CV and feature engineering.',
    tech: ['LightGBM', 'XGBoost', 'Ridge', 'scikit‑learn', 'Pipelines'],
    metrics: [
      { label: 'RMSE', value: '0.1160' },
      { label: 'R²',   value: '0.9008' },
      { label: 'Rank', value: '< 1300' },
    ],
    github: 'https://github.com/devesh12318759singh/House_price_prediction',
    kaggle: 'https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques',
    image: 'images/house-price-cover.png',
  },
  {
    title: 'Titanic Survival Prediction',
    description:
      'Classification pipeline with feature engineering and robust evaluation. Strong baseline with clean CV split.',
    tech: ['Pandas', 'scikit‑learn', 'Classification', 'EDA'],
    metrics: [
      { label: 'Accuracy', value: '83.24%' },
      { label: 'ROC‑AUC',  value: '0.89' },
    ],
    github: 'https://github.com/devesh12318759singh/Titanic_survival_prediction',
    kaggle: 'https://www.kaggle.com/c/titanic',
    image: 'images/titanic-cover.png',
  },
];

const grid = document.getElementById('projectsGrid');

// ===== Render project cards =====
projects.forEach(p => {
  const outer = document.createElement('div');
  outer.className = 'project reveal';

  const inner = document.createElement('div');
  inner.className = 'project__inner';
  inner.setAttribute('data-tilt', '');
  inner.setAttribute('data-tilt-max', '6');
  inner.setAttribute('data-tilt-speed', '600');

  const header = document.createElement('div');
  header.className = 'project__header';

  const title = document.createElement('h3');
  title.className = 'project__title';
  title.textContent = p.title;

  const headerLinks = document.createElement('div');
  headerLinks.className = 'project__links';
  if (p.github) {
    const gh = document.createElement('a');
    gh.href = p.github; gh.target = '_blank'; gh.rel = 'noopener noreferrer'; gh.textContent = 'GitHub';
    headerLinks.appendChild(gh);
  }
  if (p.kaggle) {
    const kg = document.createElement('a');
    kg.style.marginLeft = '10px';
    kg.href = p.kaggle; kg.target = '_blank'; kg.rel = 'noopener noreferrer'; kg.textContent = 'Kaggle';
    headerLinks.appendChild(kg);
  }
  header.appendChild(title);
  header.appendChild(headerLinks);
  inner.appendChild(header);

  // Full-bleed cover
  const cover = document.createElement('div');
  cover.className = 'project__cover';
  if (p.image) {
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title + ' cover';
    img.addEventListener('error', () => {
      img.remove();
      cover.style.display = 'none';
    });
    cover.appendChild(img);
  }
  inner.appendChild(cover);

  // Description
  const desc = document.createElement('p');
  desc.className = 'project__desc';
  desc.textContent = p.description;
  inner.appendChild(desc);

  // Tech badges
  if (Array.isArray(p.tech) && p.tech.length) {
    const badges = document.createElement('div');
    badges.className = 'badges';
    p.tech.forEach(t => {
      const b = document.createElement('span');
      b.className = 'badge'; b.textContent = t;
      badges.appendChild(b);
    });
    inner.appendChild(badges);
  }

  // Metrics
  if (Array.isArray(p.metrics) && p.metrics.length) {
    const metrics = document.createElement('div');
    metrics.className = 'metrics';
    p.metrics.forEach(m => {
      const chip = document.createElement('span');
      chip.className = 'metric';
      const k = document.createElement('span');
      k.className = 'k'; k.textContent = m.value;
      const l = document.createElement('span');
      l.textContent = ' ' + m.label;
      chip.appendChild(k); chip.appendChild(l);
      metrics.appendChild(chip);
    });
    inner.appendChild(metrics);
  }

  // Actions
  const actions = document.createElement('div');
  actions.className = 'actions';
  if (p.github) {
    const gh = document.createElement('a');
    gh.href = p.github; gh.target = '_blank'; gh.rel = 'noopener noreferrer';
    gh.className = 'btn btn--sm btn--line'; gh.textContent = 'Open GitHub';
    actions.appendChild(gh);
  }
  if (p.kaggle) {
    const kg = document.createElement('a');
    kg.href = p.kaggle; kg.target = '_blank'; kg.rel = 'noopener noreferrer';
    kg.className = 'btn btn--sm btn--ghost'; kg.textContent = 'Competition';
    actions.appendChild(kg);
  }
  inner.appendChild(actions);

  outer.appendChild(inner);
  grid.appendChild(outer);
});

// ===== Scroll reveal =====
const observer = new IntersectionObserver(
  (entries, obs) => entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }),
  { threshold: 0.2 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Tilt (optional) =====
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { max: 6, speed: 600, glare: false, gyroscope: true });
}