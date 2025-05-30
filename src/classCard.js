import onError from "./onError.js";

export default class Card {
  constructor(template, cardname, cardimage) {
    this.template = template;
    this.cardname = cardname;
    this.cardimage = cardimage;
  }

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
    // const likeCount = event.target.parentElement.querySelector('.place-card__like-count');
    // const currentCount = parseInt(likeCount.textContent);
    // likeCount.textContent = event.target.classList.contains('place-card__like-icon_liked') ? currentCount + 1 : currentCount - 1;
  }

  remove(event) {
    // if (window.confirm("Do you want to delete this card?")) {
    const card = event.target.closest(".place-card");
    card.remove();
    // }
  }

  create() {
    let newCard = this.template.cloneNode(true);

    newCard.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.cardimage})`;
    newCard.querySelector(".place-card__name").textContent = this.cardname;
    // newCard.querySelector('.place-card__like-count').textContent = '0';

    // Add event listeners
    newCard
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like.bind(this));

    newCard
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove.bind(this));

    return newCard;
  }
}
