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

c;
