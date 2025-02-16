let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.clientHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

ScrollReveal({
  distance: "80px",
  duratio: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-contente, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-contente h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-contente p, .about-content", { origin: "right" });
const typed = new Typed(".multiple-text", {
  strings: [
    "Desenvolvedor Full Stack",
    "Especialista em Scraping",
    "Desenvolvedor Mobile",
    "Desenvolvedor Mobile",
    "Especialista em Automação Web",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDalay: 1000,
  loop: true,
});

window.addEventListener("resize", function () {
  if (window.innerHeight < 500) {
    document.body.style.paddingBottom = "40vh";
  } else {
    document.body.style.paddingBottom = "0";
  }
});
