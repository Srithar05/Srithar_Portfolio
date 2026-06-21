// ===== TYPING ANIMATION =====
const words = ["Java Full Stack Developer", "Software Engineer", "Back-End Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.getElementById("typing-text");

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingTextElement.textContent = currentWord.substring(0, charIndex);

  let typeSpeed = isDeleting ? 40 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1500; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Pause before typing next word
  }

  setTimeout(type, typeSpeed);
}

// ===== MOBILE NAV TOGGLE =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navLinksList = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinksList.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ===== SCROLL REVEAL & COMPONENT ANIMATIONS =====
const revealElements = document.querySelectorAll(".reveal");
const barFills = document.querySelectorAll(".bar-fill");
const stats = document.querySelectorAll(".stat-num");
let animatedStats = false;

function checkReveal() {
  const triggerBottom = window.innerHeight * 0.85;

  // Reveal elements on scroll
  revealElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add("visible");
    }
  });

  // Animate skill bars when section is in view
  barFills.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < triggerBottom) {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    }
  });

  // Animate stats counter
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const aboutTop = aboutSection.getBoundingClientRect().top;
    if (aboutTop < triggerBottom && !animatedStats) {
      stats.forEach(stat => {
        const target = +stat.getAttribute("data-target");
        let current = 0;
        const increment = target / 30; // speed of count up
        const updateCount = () => {
          if (current < target) {
            current = Math.min(target, current + Math.max(1, increment));
            stat.textContent = Math.floor(current);
            setTimeout(updateCount, 40);
          } else {
            stat.textContent = target;
          }
        };
        updateCount();
      });
      animatedStats = true;
    }
  }
}

window.addEventListener("scroll", checkReveal);
window.addEventListener("load", checkReveal);

// ===== NAV ACTIVE LINK STYLING ON SCROLL =====
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let currentActive = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 120)) {
      currentActive = section.getAttribute("id");
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentActive}`) {
      link.classList.add("active");
    }
  });
});

// ===== CONTACT FORM HANDLING =====
function handleFormSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById("contact-submit-btn");
  const successMsg = document.getElementById("form-success");
  const form = document.getElementById("contact-form");

  // Visual feedback during submission
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Sending...";

  setTimeout(() => {
    submitBtn.innerHTML = "Send Message";
    successMsg.style.display = "block";
    form.reset();
    submitBtn.disabled = false;

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 5000);
  }, 1200);
}

// Start Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  type();
});

// ===== CERTIFICATE MODAL =====
function openCertModal(imgSrc, title) {
  document.getElementById('cert-modal-img').src = imgSrc;
  document.getElementById('cert-modal-title').textContent = title;
  document.getElementById('cert-modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  document.getElementById('cert-modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
});
