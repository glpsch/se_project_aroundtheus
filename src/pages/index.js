"use strict";

import { validationConfig, selectors, apiConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

  const api = new Api(apiConfig);

  const handleImageClick = (card) => {
    popupWithImage.open(card.name, card.link);
  };
  
  // Remember which card to delete
  
  let cardToDelete = null;

  const handleDeleteRequest = (card) => {
    cardToDelete = card;
    popupWithConfirmDelete.open();
  };

  function createCard(cardData) {
    const card = new Card(
      cardData,
      cardTemplate,
      handleImageClick,
      handleDeleteRequest
    );
    return card.getElement();
  }

  // Create Section with cards
  const cardSection = new Section(
    {
      items: [],
      renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
      },
    },
    placesList
  );

  const userInfo = new UserInfo({
    nameSelector: selectors.userName,
    jobSelector: selectors.userJob,
  });

  function addCard(cardData) {
    const cardElement = createCard(cardData);
    cardSection.prependItem(cardElement);
  }

  // Load initial user info and cards from the server
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      //console.log(cards);
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });

      cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
      });
    })
    .catch(() => {});

  // Form handling functions
  const handleProfileEdit = (inputValues, popup) => {
    api
      .updateUserInfo({
        name: inputValues.name,
        about: inputValues.info,
      })
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          job: updatedUser.about,
        });
        popup.close();
      })
      .catch(() => {});
  };

  const handleNewCard = (inputValues, popup) => {
    const cardData = {
      name: inputValues.title,
      link: inputValues.link,
    };

    api
      .createCard(cardData)
      .then((newCard) => {
        addCard(newCard);
        popup.resetForm();
        popup.close();
      })
      .catch(() => {});
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
  const popupWithConfirmDelete = new PopupWithForm(
    selectors.popupConfirmDelete,
    (_inputValues, popup) => {
      if (!cardToDelete) {
        popup.close();
        return;
      }
      cardToDelete
        .deleteCard(api)
        .then(() => {
          popup.close();
          cardToDelete = null;
        })
        .catch(() => {});
    }
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
  popupWithConfirmDelete.setEventListeners();

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
