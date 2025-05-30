"use strict";

//import onError from './onError.js';
import SimplePopup from './classSimplePopup.js';
import PopupWithForm from './classPopupWithForm.js';
import Card from './classCard.js';
import CardList from './classCardList.js';
import { initialCards } from './initialCards.js';

(function () {

    const list = document.querySelector('.places-list');
    const newCardButton = document.querySelector('.user-info__place-button');    
    const popupAddCardElement = document.querySelector('.popup_add-card');    
    const popupEditUserElement = document.querySelector('.popup_edit-user');
    const popImageElement = document.querySelector('.popupImage');
    const imgDiv = document.querySelector('.popup__image');
    const editUserButton = document.querySelector('.user-info__edit-icon');
    const popImageDescription = document.querySelector('.popup__image-description');


    //template
    // const cardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');


    // Class instances

    const popupAddCard = new PopupWithForm(popupAddCardElement);
    newCardButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));


    const popupEditUser = new PopupWithForm(popupEditUserElement);
    editUserButton.addEventListener('click', popupEditUser.open.bind(popupEditUser));

    const popImage = new SimplePopup(popImageElement);

   

    const cardList = new CardList(list, initialCards, popupAddCard);
    list.__cardList = cardList; // Store reference for PopupWithForm
    cardList.render();



    // Other Listeners:

    // Open image popup
    list.addEventListener('click', function (event) {
        if (event.target.classList.contains('place-card__image')) {
            
            let bgSrc = event.target.getAttribute('style');
            let src = bgSrc.slice(23, -3);
            imgDiv.querySelector('img').src = src;            

            const card = event.target.closest('.place-card');
            const cardName = card.querySelector('.place-card__name').textContent;
            popImageDescription.textContent = cardName;

            popImage.open();
        }
    });



})();







