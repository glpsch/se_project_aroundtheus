"use strict";
import { popupConfig } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(popupConfig.closeButton);
  }

  open() {
    this._popup.classList.add(popupConfig.openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(popupConfig.openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (e.target === this._popup || e.target === this._closeButton) {
        this.close();
      }
    });
  }
}
