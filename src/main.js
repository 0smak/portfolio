import gsap from "gsap";
import { Draggable, ScrollTrigger, Flip } from "gsap/all";
import { initThreeCanvas } from "./three";

gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

window.onload = () => {
  initThreeCanvas();
  setupCursor();
  setupScrollButton();
  setupProjectsAnimation();
};

function setupCursor() {
  const cursor = document.querySelector(".cursor");

  const positionCursor = (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  window.addEventListener("mousemove", positionCursor);
}

function setupScrollButton() {
  const scrollBtn = document.querySelector("#scroll-btn");

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects-home");
    const projectsTop =
      projectsSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: projectsTop,
      behavior: "smooth",
    });
  };

  scrollBtn.addEventListener("click", scrollToProjects);
}

function setupProjectsAnimation() {
  const projectsArray = gsap.utils.toArray(".project-card");
  const sections = gsap.utils.toArray("#horizontal > section");

  const calcY = (index) => -index * (70 - 7.5 * index); // Simplificar cálculo de desplazamiento en Y

  const animateProjects = () => {
    projectsArray.forEach((project, index) => {
      const tl = gsap.timeline();

      tl.to(project, {
        y: calcY(index),
        z: projectsArray.length - index,
        duration: 1,
        ease: "elastic.in",
      })
        .to(project, {
          y: calcY(projectsArray.length),
          zIndex: projectsArray.length - index,
          duration: 1,
          ease: "elastic.in",
          delay: 0.1,
        })
        .to(".projects-container", {
          xPercent: 100,
          opacity: 0,
          duration: 0.25,
          ease: "power1.in",
          delay: 1,
        })
        .then(removeProjectsContainer);
    });
  };

  ScrollTrigger.create({
    trigger: "#horizontal",
    start: "top bottom",
    onEnter: animateProjects,
  });

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    scrollTrigger: {
      trigger: "#horizontal",
      pin: true,
      scrub: true,
    },
  });
}

function removeProjectsContainer() {
  const projectsContainer = document.querySelector(".projects-container");
  if (projectsContainer) {
    projectsContainer.remove();
  }

  gsap.to("#projects-home-title", {
    top: "50%",
    duration: 0.2,
    ease: "power1.in",
  });
}
