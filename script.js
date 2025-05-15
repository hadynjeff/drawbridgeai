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

async function fetchIdeas() {
  // Gather & validate inputs as before…
  const name      = document.getElementById("apprenticeshipName").value.trim();
  const workplace = document.getElementById("workplaceType").value.trim();
  const criteria  = document.getElementById("apprenticeshipCriteria").value.trim();
  // … (validation UI logic) …

  // Call your Azure Function
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, workplaceType: workplace,  criteria })
  });

  if (!res.ok) {
    const err = await res.text();
    alert("Error generating ideas: " + err);
    return;
  }

  const ideas = await res.json();  // this is your array of 8 objects
  renderIdeas(ideas);              // same rendering logic you already have
}

// Expose to global scope
window.fetchIdeas = fetchIdeas;

