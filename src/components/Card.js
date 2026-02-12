"use strict";
import { cardConfig } from "../utils/constants.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDelete, api) {
    this.name = data.name;
    this.link = data.link;
    this._id = data._id ?? data.id;
    this._template = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._api = api;

    this.isLiked = Boolean(data.isLiked);
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
    if (this.isLiked) {
      this._likeButton.classList.add(cardConfig.likedClass);
    }
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
    const likeStatus = !this.isLiked;
    this._api
      .changeLikeStatus(this._id, likeStatus)
      .then(() => {
        this.isLiked = likeStatus;
        this._likeButton.classList.toggle(cardConfig.likedClass);
      })
      .catch(() => {});
  }

  deleteCard(api) {
    return api.deleteCard(this._id).then(() => this.getElement().remove());
  }

  _onDeleteClick() {
    if (this._handleDelete) {
      this._handleDelete(this);
    } else {
      this._element.remove();
    }
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
      this._onDeleteClick();
    });
  }
}
