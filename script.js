// CONSTANTS
const navBar = document.getElementById("nav");
const openMenu = document.getElementById("openMenu");
const navList = document.getElementById("navList");
const navLinks = document.querySelectorAll(".navLink");
const slideItems = document.querySelectorAll(".slide-left, .slide-right");

window.addEventListener("scroll", () => {
  navBar.classList.toggle("scrolled", window.scrollY > 0);
});
openMenu.addEventListener("click", () => {
  openMenu.classList.toggle("active");
  navList.classList.toggle("open");
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    openMenu.classList.toggle("active");
    navList.classList.toggle("open");
  });
});

// Sections slide in from the sides when they scroll into view

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 },
);

slideItems.forEach((item) => observer.observe(item));

// shriking of the hero section

const heroStage = document.querySelector(".header");
const heroContent = document.querySelector(".heroContent");
const pageContent = document.querySelector(".main");
function updateHero() {
  if (!heroStage || !heroContent || !pageContent) return;
  const heroRect = heroStage.getBoundingClientRect();
  const nextRect = pageContent.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  // Measure how far the next section has moved over the hero
  const overlapDistance = viewportHeight - nextRect.top;
  // Animate across the full viewport overlap
  const progress = Math.min(Math.max(overlapDistance / viewportHeight, 0), 1);
  const scale = 1 - progress * 0.25;
  const opacity = 1 - progress;
  const translateY = -30 * progress;
  heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
  heroContent.style.opacity = opacity;
}
window.addEventListener("scroll", updateHero, { passive: true });
window.addEventListener("resize", updateHero);
updateHero();

// tufky

const projectCards = document.querySelectorAll(".project-card");
function updateProjectCards() {
  const viewportHeight = window.innerHeight;
  projectCards.forEach((card, index) => {
    // The last card has nothing after it to cover it if (index === projectCards.length - 1) return;
    const nextCard = projectCards[index + 1];
    const nextRect = nextCard.getBoundingClientRect();

    // Start shrinking as the next card approaches its sticky position
    const start = viewportHeight;
    const end = 160;

    const progress = Math.min(
      Math.max((start - nextRect.top) / (start - end), 0),
      1,
    );

    // Shrink by a maximum of 5%
    const scale = 1 - progress * 0.05;

    card.style.transform = `scale(${scale})`;
  });
}
window.addEventListener("scroll", updateProjectCards, { passive: true });
window.addEventListener("resize", updateProjectCards);
updateProjectCards();
