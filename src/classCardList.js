
export default class CardList {
    constructor(container, cardArray, popup) {
        this.popup = popup;
        this.container = container;
        this.cardArray = cardArray;
    }

    addCard(newCard) {
        this.container.appendChild(newCard);
        this.popup.close();
    }

    render() {
        this.cardArray.forEach((card) => {
            this.container.appendChild(card);
        });
    }
}


