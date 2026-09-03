(() => {
  "use strict";

  const body = document.body;
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("siteProgress");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  const updateScrollState = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${amount}%`;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  const heroVideo = document.getElementById("heroVideo");
  const videoToggle = document.getElementById("videoToggle");
  const videoToggleText = document.getElementById("videoToggleText");
  const videoToggleIcon = document.getElementById("videoToggleIcon");

  const updateVideoButton = () => {
    const paused = heroVideo.paused;
    videoToggleText.textContent = paused ? "Play the film" : "Pause the film";
    videoToggleIcon.textContent = paused ? "▶" : "Ⅱ";
    videoToggle.setAttribute("aria-label", paused ? "Play the studio film" : "Pause the studio film");
  };

  videoToggle.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    } else {
      heroVideo.pause();
    }
    updateVideoButton();
  });
  heroVideo.addEventListener("play", updateVideoButton);
  heroVideo.addEventListener("pause", updateVideoButton);

  const serviceData = {
    hair: {
      number: "01",
      kicker: "Hair / shape & finish",
      title: "The signature cut",
      description: "A considered cut designed around your movement, your texture and the way you actually live.",
      list: ["One-to-one consultation", "Precision cut and finish", "Personalised styling notes"],
      price: "From ₹1,800"
    },
    colour: {
      number: "02",
      kicker: "Colour / dimension & tone",
      title: "The colour atelier",
      description: "Colour that grows out beautifully, catches the light and feels completely at home on you.",
      list: ["Tone and texture mapping", "Custom colour formula", "Gloss and finish ritual"],
      price: "From ₹3,500"
    },
    glow: {
      number: "03",
      kicker: "Skin / reset & glow",
      title: "The glow reset",
      description: "A quiet, restorative skin ritual for fresh texture, softened edges and a little more light.",
      list: ["Skin consultation", "60-minute facial ritual", "Finishing glow touch-up"],
      price: "From ₹2,200"
    },
    occasion: {
      number: "04",
      kicker: "Occasion / ready & radiant",
      title: "The occasion edit",
      description: "Hair and beauty styling for the moments you want to remember — refined, personal and camera-ready.",
      list: ["Look planning session", "Hair or makeup edit", "Finishing details"],
      price: "From ₹2,800"
    }
  };

  const serviceNumber = document.getElementById("serviceNumber");
  const serviceKicker = document.getElementById("serviceKicker");
  const serviceTitle = document.getElementById("serviceTitle");
  const serviceDescription = document.getElementById("serviceDescription");
  const serviceList = document.getElementById("serviceList");
  const servicePrice = document.getElementById("servicePrice");
  const serviceLink = document.getElementById("serviceLink");
  const bookingService = document.getElementById("bookingService");

  const renderService = (key) => {
    const service = serviceData[key];
    if (!service) return;
    serviceNumber.textContent = service.number;
    serviceKicker.textContent = service.kicker;
    serviceTitle.textContent = service.title;
    serviceDescription.textContent = service.description;
    servicePrice.textContent = service.price;
    serviceList.innerHTML = service.list.map((item) => `<li>${item}</li>`).join("");
    serviceLink.dataset.service = key;
    document.querySelectorAll(".service-tab").forEach((tab) => {
      const active = tab.dataset.service === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  };

  document.querySelectorAll(".service-tab").forEach((tab) => {
    tab.addEventListener("click", () => renderService(tab.dataset.service));
  });

  serviceLink.addEventListener("click", () => {
    if (serviceLink.dataset.service && bookingService) {
      bookingService.value = serviceLink.dataset.service;
    }
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll(".look-card").forEach((card) => {
        const shouldHide = filter !== "all" && card.dataset.category !== filter;
        card.classList.toggle("is-hidden", shouldHide);
      });
    });
  });

  const slides = Array.from(document.querySelectorAll(".review-slide"));
  const prevReview = document.getElementById("prevReview");
  const nextReview = document.getElementById("nextReview");
  const reviewCount = document.getElementById("reviewCount");
  let activeReview = 0;

  const showReview = (index) => {
    activeReview = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === activeReview));
    reviewCount.textContent = `${String(activeReview + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  prevReview.addEventListener("click", () => showReview(activeReview - 1));
  nextReview.addEventListener("click", () => showReview(activeReview + 1));

  const dateInput = document.getElementById("appointmentDate");
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = localDate;
  }

  const bookingForm = document.getElementById("bookingForm");
  const formMessage = document.getElementById("formMessage");
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(bookingForm).get("name");
    formMessage.textContent = `Thank you, ${name}. Your request is noted — our studio will be in touch shortly.`;
    bookingForm.reset();
    if (dateInput) {
      const today = new Date();
      dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    }
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("visible"));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
