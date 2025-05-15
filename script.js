 // Custom smooth scroll function using requestAnimationFrame
    function smoothScrollTo(targetY, duration) {
      const startY = window.scrollY;
      const distanceY = targetY - startY;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        // Ease in/out cubic function
        const easedProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startY + distanceY * easedProgress);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      requestAnimationFrame(animation);
    }

    let loadingInterval = null;

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

const keywordLearningStyleMap = {
  "observe": "Visual",
  "observing": "Visual",
  "shadow": "Visual",
  "shadowing": "Visual",
  "writing": "Reading/Writing",
  "journal": "Reading/Writing",
  "journaling": "Reading/Writing",
  "Project": "Reading/Writing",
  "role-play": "Kinesthetic",
  "role-playing": "Kinesthetic",
  "exercise": "Kinesthetic",
  "activity": "Kinesthetic",
  "simulation": "Kinesthetic",
  "practical": "Kinesthetic",
  "interactive": "Kinesthetic",
  "scenario": "Kinesthetic",
  "workshop": "Kinesthetic",
  "presentation": "Kinesthetic",
  "research": "Reading/Writing",
  "plan": "Reading/Writing",
  "planning": "Reading/Writing",
  "evaluate": "Reading/Writing",
  "quiz": "Reading/Writing",
  "review": "Reading/Writing",
  "discussion": "Auditory",
  "discuss": "Auditory",
  "meeting": "Auditory",
  "reflection": "Reflective",
  "reflect": "Reflective",
  "reflective": "Reflective",
   "evaluation": "Reading/Writing"
};

    document.getElementById("apprenticeshipName").addEventListener("input", showSuggestions);

    const apprenticeshipNames = [
      "Hospitality Manager Level 4",
      "Hospitality Supervisor Level 3",
      "Hospitality Team Member Level 2",
      "Production Chef Level 2",
      "Senior Production Chef Level 3",
      "Commis Chef Level 2",
      "Food & Beverage Team Member Level 2",
      "Hospitality Accommodation Team Member Level 2",
      "Retailer Level 2",
      "Trade Supplier Level 2",
      "Retail Team Leader Level 3",
      "Retail Manager Level 4",
      "Customer Service Practitioner Level 2",
      "Customer Service Specialist Level 3",
      "Business Administrator Level 3",
      "Community Activator Coach Level 2",
      "Leisure Team Member Level 2",
      "Community Sport Health Officer Level 3",
      "Leisure Duty Manager Level 3",
      "Personal Trainer Level 3",
      "Adult Care Worker Level 2",
      "Lead Adult Care Worker Level 3",
      "Lead Practitioner in Adult Care Level 4",
      "Leader in Adult Care Level 5",
      "Care Certificate Qualification Level 2",
      "Data Technician Level 3",
      "Data Analysis Level 4",
      "Early Years Practitioner Level 2",
      "Early Years Educator Level 3",
      "Early Years Lead Practitioner Level 5",
      "HR Support Level 3",
      "Learning & Development Practitioner Level 3",
      "Learning & Development Consultant Business Partner Level 5",
      "People Professional Level 5",
      "Information Communications Technician Level 3",
      "Team Leader Level 3",
      "Associate Project Manager Level 4",
      "Coaching Professional Level 5",
      "Operations Manager Level 5",
      "Express Delivery Sortation Level 2",
      "Supply Chain Warehouse Operative Level 2",
      "Multichain Marketer Level 3"
    ];

    function showSuggestions() {
      const input = document.getElementById("apprenticeshipName");
      const suggestionsContainer = document.getElementById("suggestions");
      const filter = input.value.toLowerCase().trim(); // Trim spaces to avoid empty matches

      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";

      if (!filter) return;

      const filteredNames = apprenticeshipNames.filter(name => name.toLowerCase().includes(filter));

      if (filteredNames.length > 0) {
        suggestionsContainer.style.display = "block"; // Show the box if we have results
      }

      filteredNames.forEach(name => {
        const div = document.createElement("div");
        div.textContent = name;
        div.style.padding = "10px";
        div.style.cursor = "pointer";
        div.style.borderBottom = "1px solid #ddd"; // Add some visual separation
        div.onclick = () => {
          input.value = name; // Auto-fill input when clicked
          suggestionsContainer.innerHTML = "";
          suggestionsContainer.style.display = "none";
        };
        suggestionsContainer.appendChild(div);
      });
    }

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * progress);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}


function toggleInput() {
    const section1 = document.getElementById("section1");
    const section2 = document.getElementById("section2");
    
    
    const dropdown = document.querySelector('.dropdown');
dropdown.classList.remove('hidden');
section1.classList.remove('hidden');
section2.classList.add('hidden');
}


function getImageForTitle(title) {
  const lowerTitle = title.toLowerCase();

  for (const keyword in keywordImageMap) {
    if (lowerTitle.includes(keyword)) {
      const images = keywordImageMap[keyword];
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    }
  }

  return "images/default.jpg"; // fallback
}


function getLearningStyle(text) {
  text = text.toLowerCase();  // Convert the text to lowercase for case-insensitive matching

  console.log("Checking learning style for:", text);  // Log the input text

  // Loop through each keyword in the map
  for (const keyword in keywordLearningStyleMap) {
    // Create a regular expression to match whole words only
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');  // 'i' makes the match case-insensitive
    

    if (regex.test(text)) {
      
      return keywordLearningStyleMap[keyword];  // Return the corresponding learning style
    }
  }

  console.log("No match found, returning default: All Learners");
  return "All Learners";  // Default if no match found
}


function showModal(activity) {
  // Populate modal…
  document.getElementById('modalImage').src           = getImageForTitle(activity.title);
  document.getElementById('modalTitle').textContent   = activity.title;
  document.getElementById('modalDescription').textContent = activity.description;
  document.getElementById('modalTime').textContent    = activity.time;
  document.getElementById('modalStyle').textContent   = getLearningStyle(activity.title);

  // Show modal & blur background…
  document.getElementById('section2').classList.add('blurred');
  document.getElementById('modalOverlay').classList.remove('hidden');

  // ← NEW: wire up the copy button
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.onclick = () => {
    const text = 
      `${activity.title}\n\n` +
      `${activity.description}\n\n` +
      `Estimated Time: ${activity.time}\n` +
      `Learning Style: ${getLearningStyle(activity.title)}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Activity', 1000);
      });
  };

}



function closeModal() {
  // Un-blur the grid
  document.getElementById('section2').classList.remove('blurred');
  // Hide the modal
  document.getElementById('modalOverlay').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generateButton');
  const logoContainer  = document.getElementById('logo-container');
  const fieldsContainer = document.getElementById('fieldsContainer');
  let onboarding       = false;

  generateButton.addEventListener('click', () => {
    if (!onboarding) {
      onboarding = true;
      // slide the logo up
      logoContainer.classList.add('shifted');
      // expand only the inputs
      fieldsContainer.classList.add('expanded');
      // relabel the button
      generateButton.querySelector('span').textContent = 'Craft Experiences';
    } else {
    fieldsContainer.classList.remove('expanded');
      fetchIdeas();
    }
  });
});


// Close when clicking on the semi-transparent backdrop:
document
  .getElementById('modalOverlay')
  .addEventListener('click', function(e) {
    // only close if the click was on the overlay itself,
    // not on the inner #modalContent
    if (e.target === this) {
      closeModal();
    }
  });

  // 1) grab references
const section2 = document.getElementById('section2');
const topBar   = document.getElementById('topBar');
const startOverTop = document.getElementById('startOverTop');
const refreshTop   = document.getElementById('refreshTop');

// 2) wire up the top-bar buttons
startOverTop.onclick = () => toggleInput();


// 3) the show/hide logic with auto-hide timer
let barTimer;
function showTopBar() {
  // only run if section2 is visible
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

// 4) listen for user activity (only slides in when section2 is live)
['mousemove','scroll','keydown','touchstart'].forEach(evt =>
  window.addEventListener(evt, showTopBar, { passive: true })
);

// Your OpenAI API key
const API_KEY = "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";

  // Generic wrapper to retry on 5xx errors
  async function callOpenAI(payload, retries = 3) {
    let attempt = 0, delay = 1000;
    while (true) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) return res;
      if (res.status >= 500 && res.status < 600 && attempt < retries) {
        console.warn(`OpenAI server error ${res.status}. Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        attempt++; delay *= 2;
        continue;
      }
      const body = await res.text().catch(() => "<no body>");
      throw new Error(`OpenAI error ${res.status}: ${body}`);
    }
  }

  // Extract JSON from LLM response
  function parseJSONFromLLM(raw) {
    let txt = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    const a = txt.indexOf("["), b = txt.lastIndexOf("]");
    if (a !== -1 && b !== -1 && b > a) return JSON.parse(txt.slice(a, b+1));
    const c = txt.indexOf("{"), d = txt.lastIndexOf("}");
    if (c !== -1 && d !== -1 && d > c) return JSON.parse(txt.slice(c, d+1));
    console.error("Failed to extract JSON. Raw content:\n", raw);
    throw new Error("Unable to parse JSON from model response");
  }

  // Main function: single-pass generation + rendering + token count
  async function fetchIdeas() {
    let totalTokens = 0;
    console.log('fetchIdeas started');
    let progress = 0, progressInterval;

    // UI elements
    const section1        = document.getElementById("section1");
    const fieldsContainer = document.getElementById("fieldsContainer");
    const ideasContainer  = document.getElementById("ideasContainer");
    const logoContainer   = document.getElementById("logo-container");
    const button          = document.getElementById("generateButton");
    const buttonProgress  = document.getElementById("buttonProgress");
    const buttonText      = button.querySelector("span");
    const dropdown        = document.querySelector('.dropdown');

    // Gather & validate inputs
    const name      = document.getElementById("apprenticeshipName").value.trim();
    const workplace = document.getElementById("workplaceType").value.trim();
    const criteria  = document.getElementById("apprenticeshipCriteria").value.trim();
    let valid = true;
    [{ field: name, id: "apprenticeshipName" },
     { field: workplace, id: "workplaceType" },
     { field: criteria, id: "apprenticeshipCriteria" }]
      .forEach(({ field, id }) => {
        const el = document.getElementById(id);
        if (!field) { valid = false; el.classList.add('invalid'); }
        else         el.classList.remove('invalid');
      });
    if (!valid || criteria.length < 12 || name.length < 6 || workplace.length < 3) {
      console.error('Validation failed');
      button.classList.add('error','error-animation');
      buttonText.textContent = valid
        ? "Please enter valid values"
        : "Please fill in all fields";
      button.style.backgroundColor = '#c0392b';
      setTimeout(() => {
        button.classList.remove('error','error-animation');
        buttonText.textContent = "Craft Experiences";
        button.style.backgroundColor = '';
      }, 2000);
      return 0;
    }

    // Loading state
    button.disabled = true;
    buttonText.textContent = "Initialising";
    buttonProgress.style.width = "0%";
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (progress < 99) {
        progress++;
        buttonProgress.style.width = `${progress}%`;
        if (progress === 10) buttonText.textContent = "Clarifying Intent";
        else if (progress === 40) buttonText.textContent = "Shaping Implementation";
        else if (progress === 70) buttonText.textContent = "Evaluating Impact";
      }
    }, 270);

    ideasContainer.innerHTML = "";

    try {
      // Phase 1: Initial Draft
      console.log('Phase 1: initial draft');
      const draftPayload = {
        model: "gpt-4o-mini",
        temperature: 0.8,
        messages: [
          { role: "system", content: `You are tasked with generating 8 off-the-job training activities that are fully ESFA-compliant for a UK apprentice.

Apprenticeship standard: ${name}
Workplace type: ${workplace}
Learning focus/criteria: ${criteria}.

Activities must fall into one of the following categories:
- Shadowing
- Research & Presentation Tasks
- Simulation or Role-Play
- Coaching or Mentoring Session with mentor/manager
- Projects
- Discussion
- Reflective Learning Activities
- Practical Skills Development (outside usual day-to-day tasks)
- Workplace secondment/rotation
- Independant Study
- Technical Training


Each activity must:
1. Include a rich, detailed, step-by-step description (minimum 110 words, up to 150 words) with concrete examples and actionable guidance on what they will do.
2. Use clear, instructional language directed at the learner.
3. Align with the specific KSB: (${criteria}).
4. Be overseen by a mentor or manager, and theres accountability or feedback involved.
5. Use British English spelling ONLY.
6. Not include the attendance or participation in webinars, seminars or workshops.
7. Ensure the description doesn't include what the impact of the activity will be on the learner.
8. Be compliant with ESFA guidlines regarding off-the-job training.

Return a valid JSON array of 8 objects:
[
  {"title":"Short summary (≤100 chars)","description":"Detailed, robust description"," time":"estimated time to complete the activity in X hours"},
  …
]` },
          { role: "user", content:
`Standard: ${name}
Workplace: ${workplace}
KSB: ${criteria}

Return only the JSON array of 8 items.` }
        ]
      };
      let res  = await callOpenAI(draftPayload);
      let body = await res.json();
      totalTokens += body.usage.total_tokens;
      let draftIdeas;
      try {
        draftIdeas = parseJSONFromLLM(body.choices[0].message.content);
      } catch (e) {
        console.warn("Draft parse failed, retrying with strict JSON-only instruction");
        draftPayload.messages[0].content = "You MUST respond with ONLY the JSON array, no text.";
        res  = await callOpenAI(draftPayload);
        body = await res.json();
        totalTokens += body.usage.total_tokens;
        draftIdeas = parseJSONFromLLM(body.choices[0].message.content);
      }
      console.log(`Drafted ${draftIdeas.length} ideas (tokens ${body.usage.total_tokens})`);

      // Phase 2: Render immediately
      console.log(`🎉 All done! Total tokens used: ${totalTokens}`);
      ideasContainer.innerHTML = "";
      draftIdeas.forEach(a => {
        const card = document.createElement("div");
        card.classList.add("card");
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
        card.addEventListener("click", () => showModal(a));
        ideasContainer.appendChild(card);
      });

      // Final reveal
      logoContainer.classList.remove("hidden");
      document.getElementById("section2").classList.remove("hidden");
      showTopBar();
      dropdown.classList.add("hidden");
      document.getElementById("section2").scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => section1.classList.add('hidden'), 1100);

      return totalTokens;

    } catch (err) {
      console.error('Error in fetchIdeas:', err);
      alert("An unexpected error occurred. Please try again.");
      return totalTokens;
    } finally {
      clearInterval(progressInterval);
      buttonProgress.style.width = "100%";
      setTimeout(() => {
        buttonText.textContent = "Craft Experiences";
        fieldsContainer.classList.add('expanded');
        buttonProgress.style.width = "0%";
        button.disabled = false;
        button.style.backgroundColor = '';
      }, 500);
    }
  }

  // Expose to global scope
  window.fetchIdeas = fetchIdeas;
