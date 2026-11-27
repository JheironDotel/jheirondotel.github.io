const languageKey = "loudthread-language";
const root = document.documentElement;
const languageButtons = document.querySelectorAll("[data-lang]");
const localeFields = [
  ["text", "textContent"],
  ["content", "content"],
  ["label", "aria-label"],
  ["alt", "alt"]
];

const localized = localeFields.flatMap(([field, attribute]) =>
  Array.from(document.querySelectorAll(`[data-${field}]`), (element) => {
    const textNode = attribute === "textContent";
    return {
      element,
      attribute,
      textNode,
      key: element.dataset[field],
      english: textNode ? element.textContent : element.getAttribute(attribute)
    };
  })
);
const localizedImages = document.querySelectorAll("[data-image]");
const legalLinks = document.querySelectorAll("[data-legal]");

function initialLanguage() {
  try {
    const saved = localStorage.getItem(languageKey);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    // Storage may be unavailable in private or restricted contexts.
  }
  const preferences = navigator.languages.length ? navigator.languages : [navigator.language];
  return preferences.map((tag) => tag.toLowerCase().split("-")[0])
    .find((lang) => lang === "en" || lang === "es") ?? "en";
}

function setLanguage(language) {
  root.lang = language;
  const legalBase = "https://jheirondotel.github.io/loudthread-privacy/";
  const legalLocale = language === "en" ? "en/" : "";
  for (const link of legalLinks) {
    link.href = legalBase + legalLocale + link.dataset.legal;
  }
  for (const { element, attribute, textNode, key, english } of localized) {
    const value = language === "es" ? spanish[key] ?? english : english;
    if (textNode) element.textContent = value;
    else element.setAttribute(attribute, value);
  }
  for (const image of localizedImages) {
    const source = `assets/screenshots/${language}/${image.dataset.image}`;
    if (image.getAttribute("src") !== source) image.setAttribute("src", source);
  }
  for (const button of languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  }
}

setLanguage(initialLanguage());
document.querySelector(".language").hidden = false;
for (const button of languageButtons) {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
    try {
      localStorage.setItem(languageKey, button.dataset.lang);
    } catch {
      // Keep the current selection for this visit.
    }
  });
}

const gallery = document.querySelector(".gallery");
const controls = document.querySelector(".gallery-controls");
const [previous, next] = controls.querySelectorAll("[data-slide]");
const firstSlide = gallery.firstElementChild;
const secondSlide = firstSlide.nextElementSibling;

function updateGalleryControls() {
  const max = gallery.scrollWidth - gallery.clientWidth;
  previous.setAttribute("aria-disabled", String(gallery.scrollLeft <= 1));
  next.setAttribute("aria-disabled", String(gallery.scrollLeft >= max - 1));
}

controls.addEventListener("click", (event) => {
  const button = event.target.closest("[data-slide]");
  if (!button || button.getAttribute("aria-disabled") === "true") return;
  const width = secondSlide.getBoundingClientRect().left - firstSlide.getBoundingClientRect().left;
  const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
  gallery.scrollBy({ left: width * Number(button.dataset.slide), behavior });
});
gallery.addEventListener("scroll", updateGalleryControls, { passive: true });
window.addEventListener("resize", updateGalleryControls);
controls.hidden = false;
updateGalleryControls();
