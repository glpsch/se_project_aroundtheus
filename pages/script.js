"use strict";

import { initialCards } from "../components/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// DOM Elements - Forms and Templates
const cardTemplate = document.querySelector("#place-card-template");
const editForm = document.querySelector(".popup_edit-user .popup__form");
const addCardForm = document.querySelector(".popup_add-card .popup__form");

// DOM Elements - User Info
const userNameElement = document.querySelector(".user-info__name");
const userJobElement = document.querySelector(".user-info__job");
const userEditButton = document.querySelector(".user-info__edit-icon");
const userAddPlaceButton = document.querySelector(".user-info__place-button");

// DOM Elements - Card Container
const placesList = document.querySelector(".places-list");

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
  
  const popupWithImage = new PopupWithImage(".popup_image");

  
  const handleImageClick = (card) => {
    popupWithImage.open(card._name, card._link);
  };

  
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const card = new Card(cardData, cardTemplate, handleImageClick);
        cardSection.addItem(card.getElement());
      },
    },
    placesList
  );

  function addCard(cardData) {
    const card = new Card(cardData, cardTemplate, handleImageClick);
    cardSection.prependItem(card.getElement());
  }

  // Form handling functions
  const handleProfileEdit = (inputValues, popup) => {
    userNameElement.textContent = inputValues.name;
    userJobElement.textContent = inputValues.info;
    popup.close();
  };

  const handleNewCard = (inputValues, popup) => {
    const cardData = {
      name: inputValues.title,
      link: inputValues.link,
    };
    addCard(cardData);
    popup.resetForm();
    popup.close();
  };

  // Create form popup instances
  const popupWithEditForm = new PopupWithForm(
    ".popup_edit-user",
    handleProfileEdit
  );
  const popupWithAddCardForm = new PopupWithForm(
    ".popup_add-card",
    handleNewCard
  );

  // Handle validation
  const editFormValidator = new FormValidator(validationConfig, editForm);
  const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
  
  editForm._formValidator = editFormValidator;
  addCardForm._formValidator = addCardFormValidator;
 
  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  // Render initial cards
  cardSection.renderItems();

  // Setup popup event listeners
  popupWithImage.setEventListeners();
  popupWithEditForm.setEventListeners();
  popupWithAddCardForm.setEventListeners();

  // Setup button listeners
  userAddPlaceButton.addEventListener("click", () => {
    popupWithAddCardForm.open();    
    addCardFormValidator.resetValidationIfEmpty();
  });

  userEditButton.addEventListener("click", () => {
    const nameInput = editForm.querySelector("#name");
    const aboutInput = editForm.querySelector("#info");
    nameInput.value = userNameElement.textContent;
    aboutInput.value = userJobElement.textContent;
    popupWithEditForm.open();    
    editFormValidator.resetValidation();
  });
})();
