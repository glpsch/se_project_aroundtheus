"use strict";

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._formData = {};
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this._form.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this);
    });
  }

  open() {
    // Restore form data if it exists from previous close without submit
    if (Object.keys(this._formData).length > 0) {
      const inputs = this._form.querySelectorAll(".popup__input");
      inputs.forEach((input) => {
        if (this._formData[input.name] !== undefined) {
          input.value = this._formData[input.name];
        }
      });
    }
    super.open();
  }

  close() {
    // Save form data before closing
    this._formData = this._getInputValues();
    super.close();

    // Reset validation errors
    if (this._form._formValidator) {
      this._form._formValidator.resetValidation();
    }
  }

  resetForm() {
    this._form.reset();
    this._formData = {};
    if (this._form._formValidator) {
      this._form._formValidator.resetValidation();
    }
  }
}
