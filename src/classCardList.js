import Card from './classCard.js';

export default class CardList {
    constructor(container, cardArray, popup) {
        this.popup = popup;
        this.container = container;
        this.cardArray = cardArray;
        this.cardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');
    }

    addCard(cardData) {
        const card = new Card(this.cardTemplate, cardData.name, cardData.link);
        const cardElement = card.create();
        this.container.prepend(cardElement);
        this.popup.close();
    }

    render() {
        this.cardArray.forEach((cardData) => {
            const card = new Card(this.cardTemplate, cardData.name, cardData.link);
            const cardElement = card.create();
            this.container.appendChild(cardElement);
        });
    }
}


