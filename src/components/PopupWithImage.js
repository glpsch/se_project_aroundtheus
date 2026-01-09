"use strict";

import Popup from "./Popup.js";
import { popupConfig } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(popupConfig.imageImg);
    this._imageDescription = this._popup.querySelector(
      popupConfig.imageDescription
    );
  }

  open(name, link) {
    if (this._imageElement) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
    } else {
      // If no img element, set as background image
      const imgDiv = this._popup.querySelector(popupConfig.image);
      if (imgDiv) {
        imgDiv.style.backgroundImage = `url(${link})`;
      }
    }
    this._imageDescription.textContent = name;
    super.open();
  }
}
