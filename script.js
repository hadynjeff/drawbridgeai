// ------------ Smooth scroll util ------------
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distanceY = targetY - startY;
  let startTime = null;
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + distanceY * eased);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  requestAnimationFrame(animation);
}

// ------------ Globals ------------
let progressInterval = null;

// ------------ Data maps ------------
const keywordImageMap = { /* ... as before ... */ };
const keywordLearningStyleMap = { /* ... as before ... */ };
const apprenticeshipNames = [ /* ... full list ... */ ];

// ------------ Helper functions ------------
function showSuggestions() {
  const input = document.getElementById("apprenticeshipName");
  const box = document.getElementById("suggestions");
  if (!input || !box) return; // guard
  const filter = input.value.toLowerCase().trim();
  box.innerHTML = "";
  box.style.display = "none";
  if (!filter) return;
  const matches = apprenticeshipNames.filter(n => n.toLowerCase().includes(filter));
  if (!matches.length) return;
  box.style.display = "block";
  matches.forEach(n => {
    const d = document.createElement("div");
    d.textContent = n;
    d.style.padding = "10px";
    d.style.cursor = "pointer";
    d.style.borderBottom = "1px solid #ddd";
    d.addEventListener("click", () => {
      input.value = n;
      box.innerHTML = "";
      box.style.display = "none";
    });
    box.appendChild(d);
  });
}

function getImageForTitle(title) {
  const t = title.toLowerCase();
  for (const k in keywordImageMap) {
    if (t.includes(k)) return keywordImageMap[k][Math.floor(Math.random()*keywordImageMap[k].length)];
  }
  return "images/default.jpg";
}

function getLearningStyle(text) {
  if (!text) return "All Learners";
  const t = text.toLowerCase();
  for (const k in keywordLearningStyleMap) {
    if (new RegExp(`\\b${k}\\b`, 'i').test(t)) return keywordLearningStyleMap[k];
  }
  return "All Learners";
}

function showModal(act) {
  const img = document.getElementById('modalImage');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDescription');
  const timeEl = document.getElementById('modalTime');
  const styleEl = document.getElementById('modalStyle');
  if (!img || !title || !desc || !timeEl || !styleEl) return;
  img.src = getImageForTitle(act.title);
  title.textContent = act.title;
  desc.textContent = act.description;
  timeEl.textContent = act.time;
  styleEl.textContent = getLearningStyle(act.title);
  document.getElementById('section2')?.classList.add('blurred');
  document.getElementById('modalOverlay')?.classList.remove('hidden');
  const copyBtn = document.getElementById('copyBtn');
  copyBtn?.addEventListener('click', () => {
    const text = `${act.title}\n\n${act.description}\n\nEstimated Time: ${act.time}\nLearning Style: ${getLearningStyle(act.title)}`;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = "Copy Activity"; }, 1000);
    });
  });
}

function closeModal() {
  document.getElementById('section2')?.classList.remove('blurred');
  document.getElementById('modalOverlay')?.classList.add('hidden');
}

// ------------ Main generation function ------------
async function fetchIdeas() {
  // ... unchanged ... remains within DOMContentLoaded binding for events and uses fetch('/api/generate') ...
}
window.fetchIdeas = fetchIdeas;

// ------------ DOMContentLoaded: bind events ------------
document.addEventListener('DOMContentLoaded', () => {
  // Autocomplete
  document.getElementById('apprenticeshipName')?.addEventListener('input', showSuggestions);

  // Onboarding generate button
  const generateButton = document.getElementById('generateButton');
  const logoContainer = document.getElementById('logo-container');
  const fieldsContainer = document.getElementById('fieldsContainer');
  let onboarding = false;
  generateButton?.addEventListener('click', () => {
    if (!onboarding) {
      onboarding = true;
      logoContainer?.classList.add('shifted');
      fieldsContainer?.classList.add('expanded');
      generateButton.querySelector('span').textContent = 'Craft Experiences';
    } else {
      fieldsContainer?.classList.remove('expanded');
      fetchIdeas();
    }
  });

  // Modal backdrop close
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Top-bar controls
  const section2 = document.getElementById('section2');
  const topBar = document.getElementById('topBar');
  const startOverTop = document.getElementById('startOverTop');
  const refreshTop = document.getElementById('refreshTop');
  startOverTop?.addEventListener('click', () => {
    document.querySelector('.dropdown')?.classList.remove('hidden');
    document.getElementById('section1')?.classList.remove('hidden');
    section2?.classList.add('hidden');
  });
  refreshTop?.addEventListener('click', fetchIdeas);

  let barTimer;
  function showTopBar() {
    if (section2?.classList.contains('hidden')) return;
    topBar?.classList.add('visible');
    topBar?.classList.remove('hidden');
    section2?.classList.add('bar-visible');
    clearTimeout(barTimer);
    barTimer = setTimeout(() => {
      topBar?.classList.remove('visible');
      topBar?.classList.add('hidden');
      section2?.classList.remove('bar-visible');
    }, 3000);
  }
  ['mousemove','scroll','keydown','touchstart'].forEach(evt =>
    window.addEventListener(evt, showTopBar, { passive: true })
  );
});
