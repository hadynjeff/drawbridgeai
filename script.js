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

// ------------ Keyword maps ------------
const keywordImageMap = { /* your map… */ };
const keywordLearningStyleMap = { /* your map… */ };

// ------------ Autocomplete ------------
document.getElementById("apprenticeshipName")
  .addEventListener("input", showSuggestions);
function showSuggestions() {
  const input = document.getElementById("apprenticeshipName");
  const box   = document.getElementById("suggestions");
  const filter = input.value.toLowerCase().trim();
  box.innerHTML = ""; box.style.display = "none";
  if (!filter) return;
  const matches = apprenticeshipNames
    .filter(n => n.toLowerCase().includes(filter));
  if (!matches.length) return;
  box.style.display = "block";
  matches.forEach(n => {
    const d = document.createElement("div");
    d.textContent = n;
    d.style.padding = "10px";
    d.onclick = () => {
      input.value = n;
      box.innerHTML = "";
      box.style.display = "none";
    };
    box.appendChild(d);
  });
}

// (list of apprenticeshipNames here…)

// ------------ Helpers ------------
function getImageForTitle(title) {
  const t = title.toLowerCase();
  for (const k in keywordImageMap) {
    if (t.includes(k)) {
      const arr = keywordImageMap[k];
      return arr[Math.floor(Math.random()*arr.length)];
    }
  }
  return "images/default.jpg";
}
function getLearningStyle(text) {
  text = text.toLowerCase();
  for (const k in keywordLearningStyleMap) {
    if (new RegExp(`\\b${k}\\b`, "i").test(text)) {
      return keywordLearningStyleMap[k];
    }
  }
  return "All Learners";
}

// ------------ Modal ------------
function showModal(act) {
  document.getElementById('modalImage').src         = getImageForTitle(act.title);
  document.getElementById('modalTitle').textContent = act.title;
  document.getElementById('modalDescription').textContent = act.description;
  document.getElementById('modalTime').textContent  = act.time;
  document.getElementById('modalStyle').textContent = getLearningStyle(act.title);
  document.getElementById('section2').classList.add('blurred');
  document.getElementById('modalOverlay').classList.remove('hidden');

  const copyBtn = document.getElementById('copyBtn');
  copyBtn.onclick = () => {
    const text = `${act.title}\n\n${act.description}\n\nEstimated Time: ${act.time}\nLearning Style: ${getLearningStyle(act.title)}`;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy Activity", 1000);
    });
  };
}
function closeModal() {
  document.getElementById('section2').classList.remove('blurred');
  document.getElementById('modalOverlay').classList.add('hidden');
}
document.getElementById('modalOverlay')
  .addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

// ------------ Top bar behavior ------------
const section2      = document.getElementById('section2');
const topBar        = document.getElementById('topBar');
const startOverTop  = document.getElementById('startOverTop');
startOverTop.onclick = () => {
  document.getElementById('section1').classList.remove('hidden');
  section2.classList.add('hidden');
};
let barTimer;
function showTopBar() {
  if (section2.classList.contains('hidden')) return;
  topBar.classList.add('visible');
  clearTimeout(barTimer);
  barTimer = setTimeout(() => {
    topBar.classList.remove('visible');
  }, 3000);
}
['mousemove','scroll','keydown','touchstart'].forEach(evt =>
  window.addEventListener(evt, showTopBar, { passive: true })
);

// ------------ Main fetchIdeas ------------
async function fetchIdeas() {
  // UI refs
  const nameInput = document.getElementById("apprenticeshipName");
  const workInput = document.getElementById("workplaceType");
  const critInput = document.getElementById("apprenticeshipCriteria");
  const btn       = document.getElementById("generateButton");
  const btnText   = btn.querySelector("span");
  const btnProg   = document.getElementById("buttonProgress");
  const ideasCont = document.getElementById("ideasContainer");
  const logoCont  = document.getElementById("logo-container");

  // Gather & validate
  const name = nameInput.value.trim();
  const workplace = workInput.value.trim();
  const criteria  = critInput.value.trim();
  let valid = name.length>=6 && workplace.length>=3 && criteria.length>=12;
  [nameInput, workInput, critInput].forEach(el=> {
    if (!el.value.trim()) el.classList.add('invalid');
    else el.classList.remove('invalid');
  });
  if (!valid) {
    btn.classList.add('error','error-animation');
    btnText.textContent = "Please fill valid values";
    setTimeout(() => {
      btn.classList.remove('error','error-animation');
      btnText.textContent = "Craft Experiences";
    }, 2000);
    return;
  }

  // Loading UI
  btn.disabled = true;
  btnText.textContent = "Generating...";
  btnProg.style.width = "0%";
  let p=0;
  const iv = setInterval(()=>{
    if (p<99) { p+=1; btnProg.style.width = p+"%"; }
  }, 200);

  // Clear old ideas
  ideasCont.innerHTML = "";

  try {
    // Call your Azure Function
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, workplaceType: workplace, criteria })
    });
    if (!res.ok) throw new Error(await res.text());
    const ideas = await res.json();

    // Render cards
    ideas.forEach(a => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="image_container">
          <img src="${getImageForTitle(a.title)}" class="activity-image"/>
        </div>
        <div class="card-overlay">
          <div class="title">${a.title}</div>
          <div class="info-container">
            <div class="time-container">
              <i class="fa-solid fa-clock"></i>
              <span class="time-value">${a.time}</span>
            </div>
            <div class="style-container">
              <i class="fa-solid fa-brain"></i>
              <span class="style-label">${getLearningStyle(a.title)}</span>
            </div>
          </div>
        </div>`;
      card.onclick = () => showModal(a);
      ideasCont.appendChild(card);
    });

    // Reveal Section 2
    logoCont.classList.remove("hidden");
    section2.classList.remove("hidden");
    showTopBar();
    smoothScrollTo(section2.offsetTop, 500);
    setTimeout(()=>document.getElementById('section1').classList.add('hidden'), 800);

  } catch (err) {
    alert("Error generating ideas:\n" + err.message);
  } finally {
    clearInterval(iv);
    btnProg.style.width = "100%";
    setTimeout(()=>{
      btnText.textContent = "Craft Experiences";
      btn.disabled = false;
      btnProg.style.width = "0%";
    },500);
  }
}

// Expose to global scope for your button onclick
window.fetchIdeas = fetchIdeas;

// ------------ Init button ------------
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateButton");
  const logoCont = document.getElementById("logo-container");
  const fieldsCont = document.getElementById("fieldsContainer");
  let step1 = false;

  btn.onclick = () => {
    if (!step1) {
      step1 = true;
      logoCont.classList.add("shifted");
      fieldsCont.classList.add("expanded");
      btn.querySelector("span").textContent = "Craft Experiences";
    } else {
      fieldsCont.classList.remove("expanded");
      fetchIdeas();
    }
  };
});

