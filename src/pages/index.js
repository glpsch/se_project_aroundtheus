"use strict";

import { initialCards } from "../utils/initialCards.js";
import { validationConfig, selectors } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// DOM Elements
const cardTemplate = document.querySelector(selectors.cardTemplate);
const editForm = document.querySelector(selectors.editForm);
const addCardForm = document.querySelector(selectors.addCardForm);
const userEditButton = document.querySelector(selectors.userEditButton);
const userAddPlaceButton = document.querySelector(selectors.userAddPlaceButton);
const placesList = document.querySelector(selectors.placesList);

// Initialize everything
(function () {
 
  const popupWithImage = new PopupWithImage(selectors.popupImage);

  const handleImageClick = (card) => {
    popupWithImage.open(card.name, card.link);
  };

  function createCard(cardData) {
    const card = new Card(cardData, cardTemplate, handleImageClick);
    return card.getElement();
  }

  // Create Section with cards
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const card = createCard(cardData);  
        cardSection.addItem(card); 
      },
    },
    placesList
  );

  const userInfo = new UserInfo({
    nameSelector: selectors.userName,
    jobSelector: selectors.userJob,
  });

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
    selectors.popupEditUser,
    handleProfileEdit
  );
  const popupWithAddCardForm = new PopupWithForm(
    selectors.popupAddCard,
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
    popupWithEditForm.setInputValues({
      name: currentUserInfo.name,
      info: currentUserInfo.job,
    });
    popupWithEditForm.open();
    editFormValidator.resetValidation();
  });
})();
