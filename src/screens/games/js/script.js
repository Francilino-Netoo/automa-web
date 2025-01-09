document.addEventListener("DOMContentLoaded", () => {
  let menuIcon = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      navbar.classList.remove("active");
    } else {
      navbar.classList.remove("active");
    }
  };

  window.addEventListener("resize", handleResize);

  handleResize();

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
          if (document.querySelector("header nav a[href*=" + id + "]")) {
            document
              .querySelector("header nav a[href*=" + id + "]")
              .classList.add("active");
          }
        });
      }
    });

    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);
  };
});
