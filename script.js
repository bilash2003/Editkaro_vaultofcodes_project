
 
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyduQN1HfHUQGl01hyhhZJeoV0b195MZA7ASHIQqSyEBJZplgy1VJlJPCWg3fU7Icdfqw/exec";

const CATEGORIES = [
  { id: "shortform",   label: "Short-Form Videos" },
  { id: "longform",    label: "Long-Form Videos"  },
  { id: "gaming",      label: "Gaming Videos"     },
  { id: "football",    label: "Football Edits"    },
  { id: "ecommerce",   label: "eCommerce Ads"     },
  { id: "documentary", label: "Documentary Style" },
  { id: "colorgrade",  label: "Color Grading"     },
  { id: "anime",       label: "Anime Videos"      },
  { id: "ads",         label: "Ads"               },
];

const TEAM = [
  { name: "Bilash Mallick",  role: "Founder & Lead Editor" },
  { name: "Sayan Paul",  role: "Colorist" },
  { name: "Subham Das",  role: "Motion Graphics" },
  { name: "Suprakash Majhi",  role: "Sound Design" },
];

const PROJECTS = [
  { title: "Wall Painting in 2021 — Creations",        category: "shortform",   time: "00:00:45:00", desc: "A quick-cut highlight reel of a wall mural in progress, paced for a vertical Shorts feed.", embed: "https://www.youtube.com/embed/GiFZlYHwKYY" },
  { title: "Kamal Haasan — Step-by-Step Colour Pencil Sketch", category: "longform", time: "00:14:32:00", desc: "A full step-by-step colour pencil portrait, edited into a slow-build tutorial format.", embed: "https://www.youtube.com/embed/ooqSQKq7GTs" },
  { title: "How to Draw Nick Fury (Samuel L. Jackson)", category: "gaming",      time: "00:01:47:20", desc: "A pencil-to-portrait drawing tutorial edited for a smooth, satisfying reveal.", embed: "https://www.youtube.com/embed/u6QF70LgPnU" },
  { title: "Drawing of Will Smith",                     category: "football",    time: "00:02:15:08", desc: "A clean step-by-step portrait walkthrough, cut for pacing from sketch to finish.", embed: "https://www.youtube.com/embed/kxBEyPV89E0" },
  { title: "Stan Lee — Tribute Portrait",               category: "ecommerce",   time: "00:00:15:00", desc: "A tribute pencil portrait sketch, edited with a steady, meditative pace.", embed: "https://www.youtube.com/embed/umfmmkBlxss" },
  { title: "Walter White — Drawing, Part 1",            category: "documentary", time: "00:22:10:00", desc: "Part one of a two-part portrait study, edited to show the sketch build up from first lines.", embed: "https://www.youtube.com/embed/7mDF_0oi9Ss" },
  { title: "Walter White — Drawing, Part 2",            category: "colorgrade", time: "00:01:02:04", desc: "Part two of the portrait study, focused on shading, contrast and the final colour pass.", embed: "https://www.youtube.com/embed/mm1E69OLtFc" },
  { title: "Doges Vai — Funny Drawing",                 category: "anime",       time: "00:01:30:15", desc: "A short comic-style sketch edited for a quick, punchy payoff.", embed: "https://www.youtube.com/embed/tvqw9Xo_Kps" },
  { title: "Jay Shree Ram — Drawing",                   category: "ads",         time: "00:00:20:00", desc: "A devotional portrait sketch edited as a short vertical piece.", embed: "https://www.youtube.com/embed/Bcxg_G_HKl8" },
  { title: "Maa Laxmi — Drawing",                       category: "shortform",   time: "00:00:45:00", desc: "A festive portrait sketch cut for a vertical Shorts feed.", embed: "https://www.youtube.com/embed/3Dy-9gevjmU" },
  { title: "Bobby Deol — Drawing",                      category: "longform",    time: "00:18:40:00", desc: "A celebrity portrait drawing tutorial edited step by step for pacing.", embed: "https://www.youtube.com/embed/OsW82B0YDns" },
  { title: "Maa Durga and Ganapati — Drawing",          category: "football",    time: "00:00:30:00", desc: "A festive dual-portrait sketch, edited as a short vertical piece.", embed: "https://www.youtube.com/embed/yjNh7_RUw0g" },
];

const grid = document.getElementById("portfolioGrid");
const filterBar = document.getElementById("categories");
const marqueeTrack = document.getElementById("marqueeTrack");

 
function buildFilters(){
  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn active";
  allBtn.textContent = "All";
  allBtn.dataset.filter = "all";
  filterBar.appendChild(allBtn);

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = cat.label;
    btn.dataset.filter = cat.id;
    filterBar.appendChild(btn);
  });

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
}
 
function buildGrid(){
  grid.innerHTML = "";
  PROJECTS.forEach((p, i) => {
    const cat = CATEGORIES.find(c => c.id === p.category);
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.category = p.category;
    card.innerHTML = `
      <div class="card-thumb" style="background:${thumbGradient(i)}">
        <div class="play-icon">&#9658;</div>
      </div>
      <div class="card-body">
        <span class="card-tag">${cat ? cat.label : p.category}</span>
        <h3 class="card-title">${p.title}</h3>
        <span class="card-time">${p.time}</span>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(p, cat));
    grid.appendChild(card);
  });
}

 
function thumbGradient(i){
  const combos = [
    "linear-gradient(135deg, rgba(255,122,41,0.35), rgba(23,20,15,1))",
    "linear-gradient(135deg, rgba(0,194,204,0.3), rgba(23,20,15,1))",
    "linear-gradient(135deg, rgba(255,122,41,0.2), rgba(0,194,204,0.2))",
  ];
  return combos[i % combos.length];
}
 
function applyFilter(filter){
  document.querySelectorAll(".card").forEach(card => {
    const match = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hidden", !match);
  });
}

 
function buildMarquee(){
  const items = CATEGORIES.map(c => `<span><em>&#9679;</em> ${c.label}</span>`).join("");
  marqueeTrack.innerHTML = items + items; // duplicate for seamless loop
}

 
const lightbox = document.getElementById("lightbox");
const lightboxMedia = document.getElementById("lightboxMedia");
const lightboxCat = document.getElementById("lightboxCat");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(project, cat){
  lightboxCat.textContent = cat ? cat.label : project.category;
  lightboxTitle.textContent = project.title;
  lightboxDesc.textContent = project.desc;

  if(project.embed){
    lightboxMedia.innerHTML = `<iframe src="${project.embed}" title="${project.title}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } else {
    lightboxMedia.innerHTML = `<span>Preview coming soon — swap in a real embed link in script.js (${project.time})</span>`;
  }

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  lightbox.classList.remove("open");
  lightboxMedia.innerHTML = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeLightbox(); });
 
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

 
const playheadFill = document.getElementById("playheadFill");
function updatePlayhead(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  playheadFill.style.width = pct + "%";
}
window.addEventListener("scroll", updatePlayhead, { passive: true });

 
document.getElementById("year").textContent = new Date().getFullYear();

 
function buildTeam(){
  const grid = document.getElementById("teamGrid");
  if(!grid) return;
  const avatarColors = ["var(--amber)", "var(--cyan)", "#ffa15e", "#5fe0e6"];
  grid.innerHTML = TEAM.map((m, i) => `
    <div class="team-card">
      <div class="team-avatar" style="background:${avatarColors[i % avatarColors.length]}">
        ${m.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
    </div>
  `).join("");
}

 
function buildContactCategoryOptions(){
  const select = document.getElementById("cCategory");
  if(!select) return;
  CATEGORIES.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.label;
    select.appendChild(opt);
  });
}

 
// Sends form data to the Google Apps Script Web App, which appends a row
 
function submitToSheet(formType, data){
  return fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ formType, ...data, submittedAt: new Date().toISOString() }),
  });
}

 
const subscribeForm = document.getElementById("subscribeForm");
const subscribeStatus = document.getElementById("subscribeStatus");
if(subscribeForm){
  subscribeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("subscribeEmail").value.trim();
    if(!email){ return; }
    const btn = subscribeForm.querySelector("button");
    btn.disabled = true;
    subscribeStatus.textContent = "Sending…";
    subscribeStatus.className = "subscribe-status";
    try{
      await submitToSheet("subscribe", { email });
      subscribeStatus.textContent = "You're on the list. Watch your inbox.";
      subscribeStatus.className = "subscribe-status ok";
      subscribeForm.reset();
    }catch(err){
      subscribeStatus.textContent = "Something went wrong — try again in a bit.";
      subscribeStatus.className = "subscribe-status err";
    }finally{
      btn.disabled = false;
    }
  });
}

 
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
if(contactForm){
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("cName").value.trim(),
      email: document.getElementById("cEmail").value.trim(),
      phone: document.getElementById("cPhone").value.trim(),
      category: document.getElementById("cCategory").value,
      message: document.getElementById("cMessage").value.trim(),
    };
    if(!data.name || !data.email || !data.message){ return; }
    const btn = contactForm.querySelector("button[type=submit]");
    btn.disabled = true;
    contactStatus.textContent = "Sending…";
    contactStatus.className = "form-status";
    try{
      await submitToSheet("contact", data);
      contactStatus.textContent = "Got it — we'll reply within a day.";
      contactStatus.className = "form-status ok";
      contactForm.reset();
    }catch(err){
      contactStatus.textContent = "Something went wrong — email us directly instead.";
      contactStatus.className = "form-status err";
    }finally{
      btn.disabled = false;
    }
  });
}

 
buildFilters();
buildGrid();
buildMarquee();
buildTeam();
buildContactCategoryOptions();
updatePlayhead();