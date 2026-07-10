// Dados principais do casamento. Edite aqui para reutilizar o template iMarriage.
const weddingConfig = {
  coupleName: "Angélica & Paulo",
  weddingDate: "2027-12-25T19:00:00",
  storageKey: "imarriage-rsvp-angelica-paulo",
  whatsapp: "",
  // Formulário do Google que recebe as confirmações de presença (respostas caem na planilha do Form).
  googleForm: {
    action:
      "https://docs.google.com/forms/d/e/1FAIpQLSeD60rDaLEkL8BAcgNyyjSpyVSXEbq7zp1g1dpjFnpjLx6zJA/formResponse",
    fields: {
      name: "entry.913601345",
      guests: "entry.1637397982",
      phone: "entry.142333713",
      message: "entry.725774774",
    },
  },
  images: {
    // Coloque as fotos reais na pasta assets/ e ajuste os nomes abaixo.
    hero: "assets/AngelicaePH100.png",
    story: "assets/AngelicaePH_027.JPG",
    gallery: [
      "assets/AngelicaePH_040.JPG",
      "assets/AngelicaePH_034.JPG",
      "assets/AngelicaePH_008.JPG",
      "assets/AngelicaePH_021.JPG",
      "assets/AngelicaePH_033.JPG",
    ],
  },
};

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const header = document.querySelector("[data-header]");
const yearEl = document.querySelector("#current-year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState);

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function applyImage(image, src) {
  if (!image || !src) return;

  image.addEventListener(
    "error",
    () => {
      image.classList.add("is-missing");
    },
    { once: true }
  );
  image.src = src;
}

applyImage(document.querySelector('[data-photo="hero"]'), weddingConfig.images.hero);
applyImage(document.querySelector('[data-photo="story"]'), weddingConfig.images.story);

document.querySelectorAll("[data-gallery-index]").forEach((image) => {
  const index = Number(image.dataset.galleryIndex);
  const gallerySrc = weddingConfig.images.gallery[index % weddingConfig.images.gallery.length];
  applyImage(image, gallerySrc);
});

function padTime(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const targetDate = new Date(weddingConfig.weddingDate).getTime();
  const now = Date.now();
  const distance = targetDate - now;
  const message = document.querySelector("#countdown-message");

  if (distance <= 0) {
    const countdown = document.querySelector("#countdown");
    if (countdown) {
      countdown.hidden = true;
    }
    if (message) {
      message.textContent = "Chegou o grande dia!";
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.querySelector("#days").textContent = padTime(days);
  document.querySelector("#hours").textContent = padTime(hours);
  document.querySelector("#minutes").textContent = padTime(minutes);
  document.querySelector("#seconds").textContent = padTime(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const rsvpForm = document.querySelector("#rsvp-form");
const feedback = document.querySelector("#form-feedback");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(rsvpForm);
    const confirmation = {
      name: formData.get("name"),
      guests: formData.get("guests"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      createdAt: new Date().toISOString(),
    };

    const previousConfirmations = JSON.parse(localStorage.getItem(weddingConfig.storageKey) || "[]");
    previousConfirmations.push(confirmation);
    localStorage.setItem(weddingConfig.storageKey, JSON.stringify(previousConfirmations));

    const googleForm = weddingConfig.googleForm;
    if (googleForm?.action) {
      const googleFormData = new URLSearchParams();
      googleFormData.append(googleForm.fields.name, confirmation.name);
      googleFormData.append(googleForm.fields.guests, confirmation.guests);
      googleFormData.append(googleForm.fields.phone, confirmation.phone);
      googleFormData.append(googleForm.fields.message, confirmation.message);

      fetch(googleForm.action, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      }).catch(() => {});
    }

    rsvpForm.reset();
    rsvpForm.querySelector('[name="guests"]').value = 1;

    if (feedback) {
      feedback.textContent =
        "Obrigado! Sua confirmação foi registrada. Em breve entraremos em contato se necessário.";
    }
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
