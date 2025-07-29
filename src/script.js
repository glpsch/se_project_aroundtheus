"use strict";

import { initialCards } from "./initialCards.js";
import { enableValidation, clearFormErrors, initializeFormState } from "./validate.js";

// DOM Elements - Popups
const popupAddCard = document.querySelector(".popup_add-card");
const popupEditUser = document.querySelector(".popup_edit-user");
const popupImage = document.querySelector(".popup_image");
const imgDiv = popupImage.querySelector(".popup__image");
const popImageDescription = popupImage.querySelector(
  ".popup__image-description"
);

// DOM Elements - Forms and Templates
const editForm = popupEditUser.querySelector(".popup__form");
const addCardForm = popupAddCard.querySelector(".popup__form");
const cardTemplate = document.querySelector("#place-card-template");

// DOM Elements - User Info
const userNameElement = document.querySelector(".user-info__name");
const userJobElement = document.querySelector(".user-info__job");
const userEditButton = document.querySelector(".user-info__edit-icon");
const userAddPlaceButton = document.querySelector(".user-info__place-button");

// DOM Elements - Card Container
const placesList = document.querySelector(".places-list");

// Popup functions
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  
  // Add event listeners when popup opens
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  };
  
  // Store the handler on the popup element for later removal
  popup._escapeHandler = handleEscape;
  
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  // Remove event listeners when popup closes
  if (popup._escapeHandler) {
    document.removeEventListener("keydown", popup._escapeHandler);
    delete popup._escapeHandler;
  }

  // Clear form errors when popup is closed
  const form = popup.querySelector(".popup__form");
  if (form) {
    clearFormErrors(form, validationConfig);
  }
}

function setupPopupListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");
  
  // Combined click handler for both close button and overlay
  const handleClick = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target===closeButton
    ) {
      closePopup(popup);
    }
  };
  // Add click listener to the popup element (handles both cases)
  popup.addEventListener("click", handleClick);
}

// Form handling functions
function handleProfileEdit(form) {
  const nameInput = form.querySelector("#name");
  const aboutInput = form.querySelector("#info");

  // Update profile information
  userNameElement.textContent = nameInput.value;
  userJobElement.textContent = aboutInput.value;

  closePopup(popupEditUser);
}

function handleNewCard(form) {
  const titleInput = form.querySelector("#title");
  const linkInput = form.querySelector("#link");

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  addCard(cardData);
  closePopup(popupAddCard);
  form.reset();
}

// Card functions
function createCard(name, link) {
  const cardElement = cardTemplate.content
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
  placesList.prepend(cardElement);
}

function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    placesList.appendChild(cardElement);
  });
}

// Validation configuration
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Initialize everything

(function () {
  // Enable form validation
  enableValidation(validationConfig);

  // Setup popups
  setupPopupListeners(popupAddCard);
  setupPopupListeners(popupEditUser);
  setupPopupListeners(popupImage);

  // Setup form submissions
  editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleProfileEdit(editForm);
  });

  addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleNewCard(addCardForm);
  });

  // Setup button listeners
  userAddPlaceButton.addEventListener("click", () => {
    openPopup(popupAddCard);
    // Initialize button state when popup opens
    initializeFormState(addCardForm, validationConfig);
  });

  userEditButton.addEventListener("click", () => {
    const nameInput = editForm.querySelector("#name");
    const aboutInput = editForm.querySelector("#info");
    nameInput.value = userNameElement.textContent;
    aboutInput.value = userJobElement.textContent;
    openPopup(popupEditUser);
  });

  // Setup image popup
  placesList.addEventListener("click", (event) => {
    if (event.target.classList.contains("place-card__image")) {
      const bgSrc = event.target.getAttribute("style");
      const src = bgSrc.slice(23, -3);

      const card = event.target.closest(".place-card");
      const cardName = card.querySelector(".place-card__name").textContent;

      const imgElement = imgDiv.querySelector("img");
      if (imgElement) {
        imgElement.src = src;
        imgElement.alt = cardName; 
      } else {
        // If no img element, set as background image
        imgDiv.style.backgroundImage = `url(${src})`;
      }

      popImageDescription.textContent = cardName;

      openPopup(popupImage);
    }
  });

  // Render initial cards
  renderCards(initialCards);
})();
