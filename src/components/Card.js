"use strict";
import { cardConfig } from "../utils/constants.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this._template = cardSelector;
    this._handleImageClick = handleImageClick;
    this.isLiked = false;
    this._element = null;
  }

  _getTemplate() {
    return this._template.content
      .querySelector(cardConfig.card)
      .cloneNode(true);
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector(cardConfig.cardImage);
    this._cardNameElement = this._element.querySelector(cardConfig.cardName);
    this._likeButton = this._element.querySelector(cardConfig.likeButton);
    this._deleteButton = this._element.querySelector(cardConfig.deleteButton);

    this._cardImageElement.style.backgroundImage = `url(${this.link})`;
    this._cardNameElement.textContent = this.name;
    this._setEventListeners();
    return this._element;
  }

  getElement() {
    if (!this._element) {
      this._generateCard();
    }
    return this._element;
  }

  _handleLike() {
    this.isLiked = !this.isLiked;
    this._likeButton.classList.toggle(cardConfig.likedClass);
  }

  _handleDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._handleLike();
    });

    this._deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this._handleDelete();
    });
  }
}
