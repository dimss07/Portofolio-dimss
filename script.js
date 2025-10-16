// ----------------------
// Safe DOM refs (cek dulu ada)
const sections = Array.from(document.querySelectorAll(".slide"));
const images = Array.from(document.querySelectorAll(".gallery img"));
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");
const contactForm = document.getElementById("contactForm");
const canvas = document.getElementById("bgCanvas");

// ----------------------
// Scroll reveal: tambahkan class .visible saat section muncul
function handleScrollReveal() {
  const trigger = window.innerHeight * 0.8;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add("visible");
  });
}
window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

// ----------------------
// Simple theme toggle (dark/light)
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
    // optional: when light, change gradient
    if (document.body.classList.contains("light")) {
      document.body.style.background = "linear-gradient(135deg,#f8fafc,#c7eafd)";
      document.body.style.color = "#071026";
    } else {
      document.body.style.background = "linear-gradient(135deg,#1e1b4b,#0ea5e9)";
      document.body.style.color = "#fff";
    }
  });
}

// ----------------------
// Mobile menu toggle
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("mobile-active");
    menuToggle.classList.toggle("open");
  });

  // close menu when clicking a nav link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("mobile-active");
      menuToggle.classList.remove("open");
    });
  });
}

// ----------------------
// Contact form (simulasi)
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Bisa diperluas untuk mengirim ke backend/Email API
    alert("Pesan kamu sudah terkirim (simulasi). Terima kasih!");
    contactForm.reset();
  });
}

// ----------------------
// Canvas particles (bintang lembut) - responsive & lightweight
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let stars = [];

  function initStars(count = Math.floor((w*h)/80000)) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vy: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initStars();
  }
  window.addEventListener("resize", resizeCanvas);
  initStars();

  function draw() {
    ctx.clearRect(0,0,w,h);
    // Slight tint overlay for depth
    ctx.fillStyle = "rgba(6,8,20,0.08)";
    ctx.fillRect(0,0,w,h);

    for (const s of stars) {
      ctx.beginPath();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = "rgb(180,230,255)";
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.vy;
      if (s.y > h + 10) s.y = -10;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ----------------------
// Ensure images lazy-ish reveal (optional)
function revealGalleryOnView() {
  const trigger = window.innerHeight * 0.9;
  images.forEach(img => {
    const t = img.getBoundingClientRect().top;
    if (t < trigger) img.style.opacity = "1";
  });
}
window.addEventListener("scroll", revealGalleryOnView);
window.addEventListener("load", revealGalleryOnView);


// --- Highlight menu aktif saat di klik ---
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Hapus kelas aktif dari semua link
    navLinks.forEach(l => l.classList.remove("active"));
    // Tambahkan ke yang diklik
    link.classList.add("active");
  });
});

// Efek muncul saat scroll (fade + slide)
