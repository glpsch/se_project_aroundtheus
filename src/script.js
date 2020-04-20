"use strict";

import onError from './onError.js';
import SimplePopup from './classSimplePopup.js';
import PopupWithForm from './classPopupWithForm.js';
import Card from './classCard.js';
import CardList from './classCardList.js';
import UserInfo from './classUser.js';
import FormValidator from './classFormValidator.js';
import Api from './API.js';


(function () {

    const list = document.querySelector('.places-list');
    const newCardButton = document.querySelector('.user-info__button');
    const popupAddCardElement = document.querySelector('.popup_add-card');
    const userEditButton = document.querySelector('.user-info__button-edit');
    const popupProfileElement = document.querySelector('.popup_profile');
    const popImageElement = document.querySelector('.popupImage');
    const imgDiv = document.querySelector('.popup__image');

    //userform
    const userInfoForm = document.querySelector('form[name="user"]');

    const userNameInput = userInfoForm.querySelector('#name');
    const userInfoInput = userInfoForm.querySelector('#info');
    let defaultName = document.querySelector('.user-info__name');
    let defaultInfo = document.querySelector('.user-info__job');

    //newform
    const newForm = document.querySelector('form[name="new"]');

    //template
    const cardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');

    //avatar
    const popupAvatarElement = document.querySelector('.popup_avatar');
    const avatarForm = document.querySelector('form[name="avatar"]');
    const avatarPicture = document.querySelector('.user-info__photo');




    // default user info  
    const userInfoApi = new Api('https://praktikum.tk/cohort9/users/me', '6d533b35-4b93-4063-8918-2ae34c6610b3');

    userInfoApi.getDefaultUserInfo()
        .then((user) => {
            defaultName.textContent = user.name;
            defaultInfo.textContent = user.about;
            userNameInput.value = user.name;
            userInfoInput.value = user.about;
            ///
            avatarPicture.style.backgroundImage = 'url(' + user.avatar + ')';
        })
        .catch(onError);


    // initial cards
    const cardsApi = new Api('https://praktikum.tk/cohort9/cards/', '6d533b35-4b93-4063-8918-2ae34c6610b3');

    cardsApi.getInitialCards()
        .then((cards) => {
            // let shortlist = cards.slice(Math.max(cards.length - 8, 0));         
            const downloadedCards = cards.map(function (cardData) {
                return (new Card(cardTemplate, cardData.name, cardData.link, cardData._id, cardData.owner._id, 'd635114492a656d23a0d726c', cardsApi, cardData.likes)).create();
            });
            const newCardList = new CardList(list, downloadedCards, popupAddCard, Card);
            newCardList.render();
        })
        .catch(onError);



    // Class instances

    const popupAddCard = new PopupWithForm(popupAddCardElement);
    newCardButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));

    const popupProfile = new PopupWithForm(popupProfileElement);
    userEditButton.addEventListener('click', popupProfile.open.bind(popupProfile));

    const userRecord = new UserInfo('initial name', 'initial info', popupProfile, userNameInput, userInfoInput, defaultName, defaultInfo);

    const popImage = new SimplePopup(popImageElement);

    const userInfoValidator = new FormValidator(userInfoForm);
    userInfoValidator.setEventListeners(userInfoForm);

    const newFormValidator = new FormValidator(newForm);
    newFormValidator.setEventListeners(newForm);

    const localCardList = new CardList(list, [], popupAddCard);
    localCardList.render();

    const userPopup = new PopupWithForm(popupProfileElement);

    //avatar
    const popupAvatar = new PopupWithForm(popupAvatarElement);
    avatarPicture.addEventListener('click', popupAvatar.open.bind(popupAvatar));

    const avatarFormValidator = new FormValidator(avatarForm);
    avatarFormValidator.setEventListeners(avatarForm);


    // Other Listeners

    // set new avatar
    avatarForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //onUpload       
        popupAvatar.onUpload('Загрузка..');

        const link = avatarForm.elements.avatar_url;
        const linkValue = link.value;
        userInfoApi.changeAvatar(linkValue)
            .then((data) => {
                avatarPicture.style.backgroundImage = 'url(' + data.avatar + ')';
                popupAvatar.close();
            })
            .catch(onError)
            //onUpload       
            .finally(function () {
                popupAvatar.onUpload('Сохранить')
            });
    });
    

    newForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //onUpload &middot
        popupAddCard.onUpload('···');
        const title = newForm.elements.title;
        const link = newForm.elements.link;
        const titleValue = title.value;
        const linkValue = link.value;
        // upload new card
        cardsApi.uploadNewCard(titleValue, linkValue)
            .then((data) => {
                const newCard = new Card(cardTemplate, title.value, link.value, data._id, data.owner._id, 'd635114492a656d23a0d726c', cardsApi, data.likes);
                localCardList.addCard(newCard.create());
            })
            .catch(onError)
            //onUpload   
            .finally(function () {
                popupAddCard.onUpload('+')
            });
    });


    userInfoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //onUpload       
        userPopup.onUpload('Загрузка..');
        userInfoApi.uploadUserInfo(userNameInput.value, userInfoInput.value)
            .then((res) => {
                userRecord.setUserInfo(res.name, res.about);
                userRecord.updateUserInfo();
                userPopup.close();
            })
            .catch(onError)
            //onUpload       
            .finally(function () {
                userPopup.onUpload('Сохранить')
            });
    });


    //open image
    list.addEventListener('click', function (event) {
        if (event.target.classList.contains('place-card__image')) {
            popImage.open();
            let bgSrc = event.target.getAttribute('style');
            let src = bgSrc.slice(23, -3);
            imgDiv.querySelector('img').src = src;
        }
    });



})();







