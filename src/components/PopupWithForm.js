"use strict";

import Popup from "./Popup.js";
import { popupConfig } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(popupConfig.form);
    this._inputs = this._form.querySelectorAll(popupConfig.input);
    this._formData = {};
    this._submit = this._popup.querySelector(popupConfig.submit);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      // Insert the value by the name of the input
      input.value = data[input.name];
    });
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
      this.setInputValues(this._formData);
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

  // On-load submit button behavior

  renderLoading(isLoading) {
    if (isLoading) {
      this._submit.textContent = "Saving...";
    } else {
      this._submit.textContent = "Save";
    }
  }
}
