const navLinks = Array.from(document.querySelectorAll(".dot-nav__item"));
const sections = Array.from(document.querySelectorAll("[data-nav-section]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));

const setActiveSection = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.section === id;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.dataset.section);
    if (!target) return;

    setActiveSection(link.dataset.section);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-38% 0px -55% 0px",
    threshold: 0.01,
  },
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.12,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll(".short-video").forEach((video) => {
  const trigger = video.querySelector(".video-poster");
  const videoId = video.dataset.videoId;

  trigger?.addEventListener("click", () => {
    if (!videoId) return;

    video.classList.add("is-playing");
    video.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0"
        title="نموذج لتجربة التراث من خلال المحتوى الرقمي الغامر"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  });
});
