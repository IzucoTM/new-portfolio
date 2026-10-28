// Mobile navigation
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = [...document.querySelectorAll(".nav-links a")];

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu",
  );
  navLinks.classList.toggle("open", !isOpen);
});

navItems.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav")) closeMenu();
});

// Reveal elements as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Keep the current section reflected in the navigation
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// Update copyright year
document.querySelector("#year").textContent = new Date().getFullYear();

// Avoid accidental placeholder navigation until real social URLs are added.
document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
      alert(
        "Add your real " +
          link.textContent.replace(" ↗", "") +
          " profile URL in index.html first.",
      );
    }
  });
});

// form
const form = document.getElementById("contact-form");
const fields = form.querySelectorAll(
  "input[type='text'], input[type='email'], select, textarea",
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allFilled = true;

  fields.forEach((field) => {
    const error = field.nextElementSibling;

    if (field.value.trim() === "") {
      error.style.display = "block";
      allFilled = false;
    } else {
      error.style.display = "none";
    }
  });

  if (allFilled) {
    console.log("Form sent!");
    const whatsapp = "2349123645519";
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const messsage = document.getElementById("message").value.trim();

    const text =
      `Hello my name is ${name}, ` +
      `email: ${email}` +
      `subject: ${subject}` +
      `message: ${messsage}`;

    window.location.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    form.reset();
  }
});

fields.forEach((field) => {
  const hideError = () => {
    field.nextElementSibling.style.display = "none";
  };

  field.addEventListener("input", hideError);
  field.addEventListener("change", hideError);
});

// submit form to my whatsappp
