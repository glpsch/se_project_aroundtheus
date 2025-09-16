"use strict";

import { initialCards } from "../components/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

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


// Handling image click
const handleImageClick = (card) => {
  const imgElement = imgDiv.querySelector("img");
  if (imgElement) {
    imgElement.src = card._link;
    imgElement.alt = card._name;
  } else {
    // If no img element, set as background image
    imgDiv.style.backgroundImage = `url(${card._link})`;
  }

  popImageDescription.textContent = card._name;
  openPopup(popupImage);
};

// Card functions
function renderInitialCards() {
  initialCards.forEach(cardData => {
    const card = new Card(cardData, cardTemplate, handleImageClick);
    placesList.appendChild(card.generateCard());
  });
}

function addCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  placesList.prepend(card.generateCard());
}

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
  if (form && form._formValidator) {
    form._formValidator.resetValidation();
  }
}

function setupPopupListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");

  // Combined click handler for both close button and overlay
  const handleClick = (e) => {
    if (e.target.classList.contains("popup") || e.target === closeButton) {
      closePopup(popup);
    }
  };

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
  // Create FormValidator instances for each form
  const editFormValidator = new FormValidator(validationConfig, editForm);
  const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

  // Store validator instances on form elements for easy access
  editForm._formValidator = editFormValidator;
  addCardForm._formValidator = addCardFormValidator;

  // Enable form validation
  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  // Render initial cards
  renderInitialCards();

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
    addCardFormValidator.resetValidation();
  });

  userEditButton.addEventListener("click", () => {
    const nameInput = editForm.querySelector("#name");
    const aboutInput = editForm.querySelector("#info");
    nameInput.value = userNameElement.textContent;
    aboutInput.value = userJobElement.textContent;
    openPopup(popupEditUser);
    // Clear any validation errors when popup opens
    editFormValidator.resetValidation();
  });


})();
