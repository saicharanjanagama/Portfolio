// ===============================
// 🌙 DARK THEME TOGGLE
// ===============================
const themeBtn = document.getElementById('themeBtn');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeBtn.style.border = '1px solid var(--border)';
}

const saved = localStorage.getItem('theme');
let initTheme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(initTheme);

themeBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});


// ===============================
// 📌 ABOUT SECTION — TAB SWITCH
// ===============================
const tabBtns = document.querySelectorAll(".tab-link");
const tabs = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        tabs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});


// ===============================
// 📌 PROJECT MODAL LOGIC
// ===============================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const modalLive = document.getElementById("modal-live");
const modalCode = document.getElementById("modal-code");
const modalClose = document.getElementById("modal-close");

function openModal(card) {
    modalTitle.textContent = card.dataset.title;
    modalMeta.textContent = card.dataset.meta;
    modalDesc.textContent = card.dataset.description;
    modalImg.src = card.dataset.image;

    modalTags.innerHTML = "";
    if (card.dataset.tags) {
        card.dataset.tags.split(",").forEach(tag => {
            modalTags.innerHTML += `<span class="tag">${tag.trim()}</span>`;
        });
    }

    modalLive.href = card.dataset.live || "#";
    modalCode.href = card.dataset.code || "#";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModalFn() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModalFn);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModalFn(); });


// ===============================
// 📌 REUSABLE FUNCTION — ATTACH MODAL EVENTS TO CARDS
// ===============================
function attachProjectListeners() {
    document.querySelectorAll(".project").forEach(card => {

        card.onclick = () => openModal(card);

        card.onkeydown = e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(card);
            }
        };
    });
}

// Attach on initial load
attachProjectListeners();


// ===============================
// 📌 PROJECTS — SEE MORE / SHOW LESS
// ===============================
const seeMoreBtn = document.getElementById("seeMoreBtn");
const projectGrid = document.getElementById("projectGrid");

let expanded = false;

const moreProjectsHTML = `
    <article class="project card"
        role="listitem"
        tabindex="0"
        data-title="🍽️ Restaurant Website"
        data-meta="Responsive Multi-Page Website"
        data-description="A modern and fully responsive restaurant website with menu, about, services, and contact sections. Built using HTML, CSS, and JavaScript with smooth animations and clean UI."
        data-tags="HTML, CSS, JavaScript, Responsive Design"
        data-live="https://saicharanjanagama.github.io/Restaurant/"
        data-code="https://github.com/saicharanjanagama/Restaurant.git"
        data-image="images/Restaurant2.png">

        <img src="images/Restaurant1.avif" alt="Restaurant Website Preview">
        <div class="p-body">
            <h3>🍽️ Restaurant Website</h3>
            <p class="meta">Menu • Booking • Responsive</p>
        </div>
    </article>
`;

seeMoreBtn.addEventListener("click", () => {
    if (!expanded) {

        projectGrid.insertAdjacentHTML("beforeend", moreProjectsHTML);

        attachProjectListeners(); // 🔥 IMPORTANT: enables modal for new cards

        seeMoreBtn.textContent = "Show Less Projects";
        expanded = true;

    } else {
        const extraCards = [...projectGrid.children].slice(3);
        extraCards.forEach(card => card.remove());


        attachProjectListeners();

        seeMoreBtn.textContent = "See More Projects";
        expanded = false;
    }
});

// ===============================
// 📌 ACTIVE NAVIGATION ON SCROLL
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = window.scrollY;
    if (top >= sec.offsetTop - 150) current = sec.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});