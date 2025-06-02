"use strict";

import { initialCards } from "./initialCards.js";

// Popup functions
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function setupPopupListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });

  document.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
}

// Form handling functions
function handleProfileEdit(form) {
  const nameInput = form.querySelector("#name");
  const aboutInput = form.querySelector("#info");

  // Update profile information
  document.querySelector(".user-info__name").textContent = nameInput.value;
  document.querySelector(".user-info__job").textContent = aboutInput.value;

  closePopup(form.closest(".popup"));
}

function handleNewCard(form) {
  const titleInput = form.querySelector("#title");
  const linkInput = form.querySelector("#link");

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  addCard(cardData);
  closePopup(form.closest(".popup"));
}

// Card functions
function createCard(name, link) {
  const template = document.querySelector("#place-card-template");
  const cardElement = template.content
    .querySelector(".place-card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".place-card__image");
  cardImage.style.backgroundImage = `url(${link})`;

  cardElement.querySelector(".place-card__name").textContent = name;

  const deleteButton = cardElement.querySelector(".place-card__delete-icon");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".place-card__like-icon");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("place-card__like-icon_liked");
  });

  return cardElement;
}

function addCard(cardData) {
  const cardElement = createCard(cardData.name, cardData.link);
  document.querySelector(".places-list").prepend(cardElement);
}

function renderCards(cards) {
  const container = document.querySelector(".places-list");
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    container.appendChild(cardElement);
  });
}

// Initialize everything
(function () {
  // Setup popups
  const popupAddCard = document.querySelector(".popup_add-card");
  const popupEditUser = document.querySelector(".popup_edit-user");
  const popupImage = document.querySelector(".popup_image");

  setupPopupListeners(popupAddCard);
  setupPopupListeners(popupEditUser);
  setupPopupListeners(popupImage);

  // Setup form submissions
  const editForm = popupEditUser.querySelector(".popup__form");
  editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleProfileEdit(editForm);
  });

  const addCardForm = popupAddCard.querySelector(".popup__form");
  addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleNewCard(addCardForm);
  });

  // Setup button listeners
  document
    .querySelector(".user-info__place-button")
    .addEventListener("click", () => {
      openPopup(popupAddCard);
    });

  document
    .querySelector(".user-info__edit-icon")
    .addEventListener("click", () => {
      const nameInput = editForm.querySelector("#name");
      const aboutInput = editForm.querySelector("#info");
      nameInput.value = document.querySelector(".user-info__name").textContent;
      aboutInput.value = document.querySelector(".user-info__job").textContent;
      openPopup(popupEditUser);
    });

  // Setup image popup
  const imgDiv = document.querySelector(".popup__image");
  const popImageDescription = document.querySelector(
    ".popup__image-description"
  );

  document.querySelector(".places-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("place-card__image")) {
      const bgSrc = event.target.getAttribute("style");
      const src = bgSrc.slice(23, -3);
      imgDiv.querySelector("img").src = src;

      const card = event.target.closest(".place-card");
      const cardName = card.querySelector(".place-card__name").textContent;
      popImageDescription.textContent = cardName;

      openPopup(popupImage);
    }
  });

  // Render initial cards
  renderCards(initialCards);
})();
