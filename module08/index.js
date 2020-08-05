import galaryItems from "./gallery-items.js";

const galaryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const modalImgRef = lightboxRef.querySelector(".lightbox__image");

let createdGalaryItems = "";
let currentIndex;
let lastIndex = galaryItems.length - 1;

const createGalaryItems = function (items) {
  let i = 0;
  return items.reduce((acc, item) => {
    acc += `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      data-index="${i}"
      alt="${item.description}"
    />
  </a>
</li>`;
    i += 1;
    return acc;
  }, "");
};
const addGalaryItems = function (str) {
  galaryRef.insertAdjacentHTML("beforeend", str);
};

const startCreateGal = () => {
  createdGalaryItems = createGalaryItems(galaryItems);
  addGalaryItems(createdGalaryItems);
};

window.addEventListener("load", startCreateGal);

const onOpenModal = (event) => {
  event.preventDefault();
  window.addEventListener("keydown", onEscPress);
  window.addEventListener("keydown", onArrowPress);

  if (event.target.nodeName === "IMG") {
    currentIndex = Number(event.target.dataset.index);

    modalImgRef.src = event.target.dataset.source;
    modalImgRef.alt = event.target.alt;

    lightboxRef.classList.add("is-open");
  }
};

const onCloseModal = () => {
  lightboxRef.classList.remove("is-open");
  modalImgRef.src = " ";
  window.removeEventListener("keydown", onEscPress);
  window.removeEventListener("keydown", onArrowPress);
};

const onEscPress = (event) => {
  if (event.code === "Escape") {
    onCloseModal();
  }
};

const onArrowPress = (event) => {
  if (event.code === "ArrowLeft" && currentIndex > 0) {
    modalImgRef.src = galaryItems[currentIndex - 1].original;
    modalImgRef.alt = galaryItems[currentIndex - 1].description;
    currentIndex = currentIndex - 1;
  } else if (event.code === "ArrowRight" && currentIndex < lastIndex) {
    modalImgRef.src = galaryItems[currentIndex + 1].original;
    modalImgRef.alt = galaryItems[currentIndex + 1].description;
    currentIndex = currentIndex + 1;
  }
};

const onModalClick = (event) => {
  let overlayRef = event.target.parentNode.querySelector(".lightbox__overlay");
  if (overlayRef) {
    onCloseModal();
  }
};

galaryRef.addEventListener("click", onOpenModal);

lightboxRef.addEventListener("click", onModalClick);
