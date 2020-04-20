import onError from './onError.js';

export default class Card {
    constructor(template, cardname, cardimage, cardId, cardOwnerId, userId, api, likes = 0) {

        this.template = template;

        this.cardname = cardname;
        this.cardimage = cardimage;
        this.cardOwnerId = cardOwnerId;
        this.userId = userId;
        this.cardId = cardId;
        this.api = api;
        this.likes = likes;
    }


    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');


        if (event.target.classList.contains('place-card__like-icon_liked')) {
            this.api.addLike(this.cardId)
                .then((res) => {
                    event.target.parentElement.querySelector('.place-card__like-count').textContent = res.likes.length;
                })
                .catch(onError);
        }
        else {
            this.api.removeLike(this.cardId)
                .then((res) => {
                    event.target.parentElement.querySelector('.place-card__like-count').textContent = res.likes.length;
                })
                .catch(onError);
        }
    }


    remove(event) {

        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {

            let a = event.composedPath();
            let toDelete = a[2];
            event.target.parentElement.parentElement.parentElement.removeChild(toDelete);
            ///         
            this.api.removeCard(this.cardId)
                .catch(onError);
        }
    }


    create() {
        let newCard = this.template.cloneNode(true);

        newCard.querySelector('.place-card__image').style.backgroundImage = 'url(' + this.cardimage + ')';
        newCard.querySelector('.place-card__name').textContent = this.cardname;
        newCard.querySelector('.place-card__like-count').textContent = this.likes.length || 0;

        if (this.cardOwnerId !== this.userId) {
            newCard.querySelector('.place-card__delete-icon').style.display = 'none';
        }
        /////
        if ((this.likes || []).find(e => e._id == this.userId)) {
            newCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        }

        newCard
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like.bind(this));

        if (this.cardOwnerId == this.userId) {
            newCard
                .querySelector('.place-card__delete-icon')
                .addEventListener('click', this.remove.bind(this));
        }

        return newCard;
    }
}


