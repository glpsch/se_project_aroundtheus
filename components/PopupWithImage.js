"use strict";

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image img");
    this._imageDescription = this._popup.querySelector(".popup__image-description");
  }

  open(name, link) {
    if (this._imageElement) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
    } else {
      // If no img element, set as background image
      const imgDiv = this._popup.querySelector(".popup__image");
      if (imgDiv) {
        imgDiv.style.backgroundImage = `url(${link})`;
      }
    }
    this._imageDescription.textContent = name;
    super.open();
  }
}

