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

// ------------ Keyword → Image map ------------
const keywordImageMap = {
  shadow: ["images/workplace.jpg", "images/workplace2.jpg"],
  shadowing: ["images/workplace.jpg", "images/workplace.jpg"],
  simulation: ["images/workplace.jpg", "images/workplace2.jpg"],
  project: ["images/writing.png", "images/writing2.jpeg"],
  evaluate: ["images/workplace.jpg", "images/workplace2.jpg"],
  evaluation: ["images/workplace.jpg", "images/workplace2.jpg"],
  quiz: ["images/workplace.jpg", "images/workplace2.jpg"],
  scenario: ["images/workplace.jpg", "images/workplace2.jpg"],
  coaching: ["images/workplace.jpg", "images/workplace2.jpg"],
  planning: ["images/workplace.jpg", "images/workplace2.jpg"],
  exercise: ["images/workplace.jpg", "images/workplace2.jpg"],
  activity: ["images/workplace.jpg", "images/workplace2.jpg"],
  review: ["images/workplace.jpg", "images/workplace2.jpg"],
  reflective: ["images/reflection.jpg", "images/reflection2.jpg"],
  reflection: ["images/reflection.jpg", "images/reflection2.jpg"],
  reflect: ["images/reflection.jpg", "images/reflection2.jpg"],
  discussion: ["images/discussion.jpg", "images/discussion2.png"],
  discuss: ["images/discussion.jpg", "images/discussion2.png"],
  research: ["images/research.jpg", "images/research2.jpeg"],
  writing: ["images/writing.png", "images/writing2.jpeg"],
  plan: ["images/writing.png", "images/writing2.jpeg"],
  analyse: ["images/writing.png", "images/writing2.jpeg"],
  analysis: ["images/writing.png", "images/writing2.jpeg"],
  'action plan': ["images/writing.png", "images/writing2.jpeg"],
  journal: ["images/writing.png", "images/writing2.jpeg"],
  journaling: ["images/writing.png", "images/writing2.jpeg"],
  interactive: ["images/interactive.jpg", "images/interactive2.jpg"],
  'role-play': ["images/interactive.jpg", "images/interactive2.jpg"],
  'role-playing': ["images/interactive.jpg", "images/interactive2.jpg"],
  workshop: ["images/interactive.jpg", "images/interactive2.jpg"],
  meeting: ["images/meeting.jpeg", "images/meeting2.webp"]
};

// ------------ Keyword → Learning style map ------------
const keywordLearningStyleMap = {
  observe: "Visual",
  observing: "Visual",
  shadow: "Visual",
  shadowing: "Visual",
  writing: "Reading/Writing",
  journal: "Reading/Writing",
  journaling: "Reading/Writing",
  project: "Reading/Writing",
  'role-play': "Kinesthetic",
  'role-playing': "Kinesthetic",
  exercise: "Kinesthetic",
  activity: "Kinesthetic",
  simulation: "Kinesthetic",
  practical: "Kinesthetic",
  interactive: "Kinesthetic",
  scenario: "Kinesthetic",
  workshop: "Kinesthetic",
  presentation: "Kinesthetic",
  research: "Reading/Writing",
  plan: "Reading/Writing",
  planning: "Reading/Writing",
  evaluate: "Reading/Writing",
  quiz: "Reading/Writing",
  review: "Reading/Writing",
  discussion: "Auditory",
  discuss: "Auditory",
  meeting: "Auditory",
  reflection: "Reflective",
  reflect: "Reflective",
  reflective: "Reflective",
  evaluation: "Reading/Writing"
};

// ------------ Autocomplete suggestions ------------
document.getElementById("apprenticeshipName").addEventListener("input", showSuggestions);
const apprenticeshipNames = [
  /* ... list of names ... */
];
function showSuggestions() {
  const input = document.getElementById("apprenticeshipName");
  const box   = document.getElementById("suggestions");
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
    d.style.cursor  = "pointer";
    d.style.borderBottom = "1px solid #ddd";
    d.onclick = () => {
      input.value = n;
      box.innerHTML = "";
      box.style.display = "none";
    };
    box.appendChild(d);
  });
}

// ------------ UI toggles ------------
function toggleInput() {
  document.querySelector('.dropdown').classList.remove('hidden');
  document.getElementById('section1').classList.remove('hidden');
  document.getElementById('section2').classList.add('hidden');
}

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
    if (new RegExp(`\\b${k}\\b`,`i`).test(text)) {
      return keywordLearningStyleMap[k];
    }
  }
  return "All Learners";
}

// ------------ Modal logic ------------
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
      setTimeout(()=>copyBtn.textContent="Copy Activity",1000);
    });
  };
}
function closeModal() {
  document.getElementById('section2').classList.remove('blurred');
  document.getElementById('modalOverlay').classList.add('hidden');
}
document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target===e.currentTarget) closeModal(); });

// ------------ Top-bar show/hide ------------
const section2     = document.getElementById('section2');
const topBar       = document.getElementById('topBar');
const startOverTop = document.getElementById('startOverTop');
const refreshTop   = document.getElementById('refreshTop');
startOverTop.onclick = () => toggleInput();
refreshTop.onclick   = () => fetchIdeas();
let barTimer;
function showTopBar() {
  if (section2.classList.contains('hidden')) return;
  topBar.classList.add('visible');
  topBar.classList.remove('hidden');
  section2.classList.add('bar-visible');
  clearTimeout(barTimer);
  barTimer = setTimeout(() => {
    topBar.classList.remove('visible');
    topBar.classList.add('hidden');
    section2.classList.remove('bar-visible');
  }, 3000);
}
['mousemove','scroll','keydown','touchstart'].forEach(evt =>
  window.addEventListener(evt, showTopBar, { passive: true })
);

// ------------ Main generation function ------------
async function fetchIdeas() {
  const btn            = document.getElementById("generateButton");
  const btnText        = btn.querySelector("span");
  const btnProg        = document.getElementById("buttonProgress");
  const ideasContainer = document.getElementById("ideasContainer");
  const logoContainer  = document.getElementById("logo-container");
  const dropdown       = document.querySelector('.dropdown');
  const section1       = document.getElementById('section1');

  // Gather & validate
  const name      = document.getElementById("apprenticeshipName").value.trim();
  const workplace = document.getElementById("workplaceType").value.trim();
  const criteria  = document.getElementById("apprenticeshipCriteria").value.trim();
  let valid = true;
  [{field:name,id:"apprenticeshipName"},{field:workplace,id:"workplaceType"},{field:criteria,id:"apprenticeshipCriteria"}]
    .forEach(({field,id}) => {
      const el = document.getElementById(id);
      if (!field || (id==='apprenticeshipCriteria'&&criteria.length<12) || (id==='apprenticeshipName'&&name.length<6) || (id==='workplaceType'&&workplace.length<3)) {
        valid = false;
        el.classList.add('invalid');
      } else el.classList.remove('invalid');
    });
  if (!valid) {
    btn.classList.add("error","error-animation");
    btnText.textContent = "Please enter valid values";
    setTimeout(()=>{btn.classList.remove("error","error-animation"); btnText.textContent="Craft Experiences";},2000);
    return;
  }

  // Loading UI
  btn.disabled = true;
  btnText.textContent = "Initialising";
  btnProg.style.width = "0%";
  clearInterval(progressInterval);
  let progress=0;
  progressInterval = setInterval(() => {
    if (progress<99) {
      progress++;
      btnProg.style.width = `${progress}%`;
      if (progress===10) btnText.textContent="Clarifying Intent";
      else if (progress===40) btnText.textContent="Shaping Implementation";
      else if (progress===70) btnText.textContent="Evaluating Impact";
    }
  },270);
  ideasContainer.innerHTML = "";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name,workplaceType:workplace,criteria})
    });
    const raw = await response.text();
    if (!response.ok) {
      let err;
      try { err = JSON.parse(raw); }
      catch { err = raw; }
      alert("Error generating ideas:\n" + (typeof err==="string"?err:JSON.stringify(err,2)));
      return;
    }
    const ideas = JSON.parse(raw);
    ideasContainer.innerHTML = "";
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
            <div class="time-container"><i class="fa-solid fa-clock"></i>
              <span class="time-value">${a.time}</span>
            </div>
            <div class="style-container"><i class="fa-solid fa-brain"></i>
              <span class="style-label">${getLearningStyle(a.title)}</span>
            </div>
          </div>
        </div>`;
      card.onclick = ()=>showModal(a);
      ideasContainer.appendChild(card);
    });

    // Reveal section2
    dropdown.classList.add('hidden');
    document.getElementById('topBar').classList.add('hidden');
    logoContainer.classList.remove("hidden");
    section2.classList.remove('hidden');
    smoothScrollTo(section2.offsetTop,500);
    setTimeout(()=>section1.classList.add('hidden'),800);
  } catch (err) {
    alert("Unexpected error:\n"+err.message);
  } finally {
    clearInterval(progressInterval);
    btnProg.style.width = "100%";
    setTimeout(()=>{btnText.textContent="Craft Experiences"; btn.disabled=false; btnProg.style.width="0%";},500);
  }
}
window.fetchIdeas = fetchIdeas;

// ------------ Initialize button behavior ------------
document.addEventListener("DOMContentLoaded",()=>{
  const btn          = document.getElementById('generateButton');
  const logoCont     = document.getElementById('logo-container');
  const fieldsCont   = document.getElementById('fieldsContainer');
  let step1 = false;
  btn.onclick = ()=>{
    if (!step1) {
      step1=true;
      logoCont.classList.add('shifted');
      fieldsCont.classList.add('expanded');
      btn.querySelector('span').textContent='Craft Experiences';
    } else {
      fieldsCont.classList.remove('expanded');
      fetchIdeas();
    }
  };
});
