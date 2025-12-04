"use strict";

import { initialCards } from "../components/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// DOM Elements
const cardTemplate = document.querySelector("#place-card-template");
const editForm = document.querySelector(".popup_edit-user .popup__form");
const addCardForm = document.querySelector(".popup_add-card .popup__form");
const userEditButton = document.querySelector(".user-info__edit-icon");
const userAddPlaceButton = document.querySelector(".user-info__place-button");
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
  // Class instances for UserInfo, PopupWithImage, and Section
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

  const userInfo = new UserInfo({
    nameSelector: ".user-info__name",
    jobSelector: ".user-info__job",
  });

  const popupWithImage = new PopupWithImage(".popup_image");

  const handleImageClick = (card) => {
    popupWithImage.open(card._name, card._link);
  };

  function addCard(cardData) {
    const card = new Card(cardData, cardTemplate, handleImageClick);
    cardSection.prependItem(card.getElement());
  }

  // Render initial cards
  cardSection.renderItems();

  // Form handling functions
  const handleProfileEdit = (inputValues, popup) => {
    userInfo.setUserInfo({
      name: inputValues.name,
      job: inputValues.info,
    });
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
    const currentUserInfo = userInfo.getUserInfo();
    const nameInput = editForm.querySelector("#name");
    const aboutInput = editForm.querySelector("#info");
    nameInput.value = currentUserInfo.name;
    aboutInput.value = currentUserInfo.job;
    popupWithEditForm.open();
    editFormValidator.resetValidation();
  });
})();
