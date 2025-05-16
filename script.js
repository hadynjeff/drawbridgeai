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

// ------------ Keyword → Image map ------------
const keywordImageMap = {
  "shadow": ["images/workplace.jpg", "images/workplace2.jpg"],
  "shadowing": ["images/workplace.jpg", "images/workplace.jpg"],
  "simulation": ["images/workplace.jpg", "images/workplace2.jpg"],
  "project": ["images/writing.png", "images/writing2.jpeg"],
  "evaluate": ["images/workplace.jpg", "images/workplace2.jpg"],
  "evaluation": ["images/workplace.jpg", "images/workplace2.jpg"],
  "quiz": ["images/workplace.jpg", "images/workplace2.jpg"],
  "scenario": ["images/workplace.jpg", "images/workplace2.jpg"],
  "coaching": ["images/workplace.jpg", "images/workplace2.jpg"],
  "planning": ["images/workplace.jpg", "images/workplace2.jpg"],
  "exercise": ["images/workplace.jpg", "images/workplace2.jpg"],
  "activity": ["images/workplace.jpg", "images/workplace2.jpg"],
  "review": ["images/workplace.jpg", "images/workplace2.jpg"],
  "reflective": ["images/reflection.jpg", "images/reflection2.jpg"],
  "reflection": ["images/reflection.jpg", "images/reflection2.jpg"],
  "reflect": ["images/reflection.jpg", "images/reflection2.jpg"],
  "discussion": ["images/discussion.jpg", "images/discussion2.png"],
  "discuss": ["images/discussion.jpg", "images/discussion2.png"],
  "research": ["images/research.jpg", "images/research2.jpeg"],
  "writing": ["images/writing.png", "images/writing2.jpeg"],
  "plan": ["images/writing.png", "images/writing2.jpeg"],
  "analyse": ["images/writing.png", "images/writing2.jpeg"],
  "analysis": ["images/writing.png", "images/writing2.jpeg"],
  "action plan": ["images/writing.png", "images/writing2.jpeg"],
  "journal": ["images/writing.png", "images/writing2.jpeg"],
  "journaling": ["images/writing.png", "images/writing2.jpeg"],
  "interactive": ["images/interactive.jpg", "images/interactive2.jpg"],
  "role-play": ["images/interactive.jpg", "images/interactive2.jpg"],
  "role-playing": ["images/interactive.jpg", "images/interactive2.jpg"],
  "workshop": ["images/interactive.jpg", "images/interactive2.jpg"],
  "meeting": ["images/meeting.jpeg", "images/meeting2.webp"]
};

// ------------ Keyword → Learning style map ------------
const keywordLearningStyleMap = {
  "observe": "Visual",       "observing": "Visual",
  "shadow": "Visual",        "shadowing": "Visual",
  "writing": "Reading/Writing", "journal": "Reading/Writing",
  "journaling": "Reading/Writing", "project": "Reading/Writing",
  "role-play": "Kinesthetic", "role-playing": "Kinesthetic",
  "exercise": "Kinesthetic",    "activity": "Kinesthetic",
  "simulation": "Kinesthetic",  "practical": "Kinesthetic",
  "interactive": "Kinesthetic", "scenario": "Kinesthetic",
  "workshop": "Kinesthetic",    "presentation": "Kinesthetic",
  "research": "Reading/Writing","plan": "Reading/Writing",
  "planning": "Reading/Writing","evaluate": "Reading/Writing",
  "quiz": "Reading/Writing",     "review": "Reading/Writing",
  "discussion": "Auditory",      "discuss": "Auditory",
  "meeting": "Auditory",         "reflection": "Reflective",
  "reflect": "Reflective",       "reflective": "Reflective",
  "evaluation": "Reading/Writing"
};

// ------------ Apprenticeship name suggestions ------------
const apprenticeshipNames = [
  "Hospitality Manager Level 4","Hospitality Supervisor Level 3",
  "Hospitality Team Member Level 2","Production Chef Level 2",
  "Senior Production Chef Level 3","Commis Chef Level 2",
  "Food & Beverage Team Member Level 2","Hospitality Accommodation Team Member Level 2",
  "Retailer Level 2","Trade Supplier Level 2","Retail Team Leader Level 3",
  "Retail Manager Level 4","Customer Service Practitioner Level 2",
  "Customer Service Specialist Level 3","Business Administrator Level 3",
  "Community Activator Coach Level 2","Leisure Team Member Level 2",
  "Community Sport Health Officer Level 3","Leisure Duty Manager Level 3",
  "Personal Trainer Level 3","Adult Care Worker Level 2",
  "Lead Adult Care Worker Level 3","Lead Practitioner in Adult Care Level 4",
  "Leader in Adult Care Level 5","Care Certificate Qualification Level 2",
  "Data Technician Level 3","Data Analysis Level 4","Early Years Practitioner Level 2",
  "Early Years Educator Level 3","Early Years Lead Practitioner Level 5",
  "HR Support Level 3","Learning & Development Practitioner Level 3",
  "Learning & Development Consultant Business Partner Level 5",
  "People Professional Level 5","Information Communications Technician Level 3",
  "Team Leader Level 3","Associate Project Manager Level 4",
  "Coaching Professional Level 5","Operations Manager Level 5",
  "Express Delivery Sortation Level 2","Supply Chain Warehouse Operative Level 2",
  "Multichain Marketer Level 3"
];

// ------------ Autocomplete suggestions ------------
document.getElementById("apprenticeshipName").addEventListener("input", showSuggestions);
function showSuggestions() {
  const input = document.getElementById("apprenticeshipName");
  const box   = document.getElementById("suggestions");
  const filter = input.value.toLowerCase().trim();
  box.innerHTML = ""; box.style.display = "none";
  if (!filter) return;
  const matches = apprenticeshipNames.filter(n => n.toLowerCase().includes(filter));
  if (!matches.length) return;
  box.style.display = "block";
  matches.forEach(n => {
    const d = document.createElement("div");
    d.textContent = n;
    d.style.padding = "10px";
    d.style.cursor  = "pointer";
    d.onclick = () => {
      input.value = n;
      box.innerHTML = "";
      box.style.display = "none";
    };
    box.appendChild(d);
  });
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
    // use backticks and escape the backslashes for the word-boundary regex
    if (new RegExp(`\\b${k}\\b`, "i").test(text)) {
      return keywordLearningStyleMap[k];
    }
  }
  return "All Learners";
}

// ------------ Modal logic ------------
function showModal(act) {
  document.getElementById('modalImage').src             = getImageForTitle(act.title);
  document.getElementById('modalTitle').textContent     = act.title;
  document.getElementById('modalDescription').textContent = act.description;
  document.getElementById('modalTime').textContent      = act.time;
  document.getElementById('modalStyle').textContent     = getLearningStyle(act.title);
  document.getElementById('section2').classList.add('blurred');
  document.getElementById('modalOverlay').classList.remove('hidden');

  document.getElementById('copyBtn').onclick = () => {
    // wrap the text in a proper template literal
    const text = `
${act.title}

${act.description}

Estimated Time: ${act.time}
Learning Style: ${getLearningStyle(act.title)}
`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('copyBtn');
      btn.textContent = "Copied!";
      setTimeout(() => btn.textContent = "Copy Activity", 1000);
    });
  };
}

function closeModal() {
  document.getElementById('section2').classList.remove('blurred');
  document.getElementById('modalOverlay').classList.add('hidden');
}

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

// ------------ Top-bar show/hide ------------
const section2     = document.getElementById('section2');
const topBar       = document.getElementById('topBar');
const startOverTop = document.getElementById('startOverTop');
startOverTop.onclick = () => {
  document.getElementById('section1').classList.remove('hidden');
  section2.classList.add('hidden');
};

let barTimer;
function showTopBar() {
  if (section2.classList.contains('hidden')) return;
  topBar.classList.add('visible');
  clearTimeout(barTimer);
  barTimer = setTimeout(() => topBar.classList.remove('visible'), 3000);
}
['mousemove','scroll','keydown','touchstart'].forEach(evt =>
  window.addEventListener(evt, showTopBar, { passive: true })
);

// ------------ Main generation function ------------
async function fetchIdeas() {
  const nameInput      = document.getElementById("apprenticeshipName");
  const workInput      = document.getElementById("workplaceType");
  const critInput      = document.getElementById("apprenticeshipCriteria");
  const btn            = document.getElementById("generateButton");
  const btnText        = btn.querySelector("span");
  const btnProg        = document.getElementById("buttonProgress");
  const ideasContainer = document.getElementById("ideasContainer");
  const logoContainer  = document.getElementById("logo-container");
  const section1       = document.getElementById("section1");
  const dropdown       = document.querySelector('.dropdown');

  // Gather & validate
  const name      = nameInput.value.trim();
  const workplace = workInput.value.trim();
  const criteria  = critInput.value.trim();
  let valid = name.length >= 6 && workplace.length >= 3 && criteria.length >= 12;
  [nameInput, workInput, critInput].forEach(el => {
    if (!el.value.trim()) el.classList.add("invalid");
    else                  el.classList.remove("invalid");
  });
  if (!valid) {
    btn.classList.add("error","error-animation");
    btnText.textContent = "Please enter valid values";
    setTimeout(() => {
      btn.classList.remove("error","error-animation");
      btnText.textContent = "Craft Experiences";
    }, 2000);
    return;
  }

  // Loading UI
  btn.disabled = true;

  // rotating progress messages
  const progressMessages = [
    "Clarifying Intent\u2026",
    "Shaping Implementation\u2026",
    "Evaluating Impact\u2026",
    "Finalising\u2026"
  ];
  let msgIndex = 0;
  btnText.textContent = progressMessages[msgIndex];

  // bar animation
  btnProg.style.width = "0%";
  let p = 0;
  const progressInterval = setInterval(() => {
    if (p < 99) {
      p++;
      btnProg.style.width = p + "%";
    }
  }, 200);

  // text rotation
  const textInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % progressMessages.length;
    btnText.textContent = progressMessages[msgIndex];
  }, 8000);

  ideasContainer.innerHTML = "";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, workplaceType: workplace, criteria })
    });

    const raw = await response.text();
    if (!response.ok) {
      let err;
      try { err = JSON.parse(raw); }
      catch { err = raw; }
      alert("Error generating ideas:\n" +
            (typeof err === "string" ? err : JSON.stringify(err, null, 2)));
      return;
    }

    const ideas = JSON.parse(raw);
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
      ideasContainer.appendChild(card);
    });

    // Reveal section2
    dropdown.classList.add('hidden');
    topBar.classList.add('hidden');
    logoContainer.classList.remove("hidden");
    document.getElementById("section2").classList.remove("hidden");
    smoothScrollTo(document.getElementById("section2").offsetTop, 500);
    setTimeout(() => section1.classList.add("hidden"), 800);

  } catch (err) {
    alert("Unexpected error:\n" + err.message);
  } finally {
    // stop intervals
    clearInterval(progressInterval);
    clearInterval(textInterval);

    // fill bar to 100%
    btnProg.style.width = "100%";

    // only reset the button once it's out of view
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          btnText.textContent = "Craft Experiences";
          btn.disabled = false;
          btnProg.style.width = "0%";
          obs.disconnect();
        }
      });
    });
    observer.observe(btn);
  }
}

window.fetchIdeas = fetchIdeas;

// ------------ Initialize button behavior ------------
document.addEventListener("DOMContentLoaded", () => {
  const btn        = document.getElementById("generateButton");
  const logoCont   = document.getElementById("logo-container");
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
