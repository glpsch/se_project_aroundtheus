"use strict";

export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputs = this._formElement.querySelectorAll(this._settings.inputSelector);
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  // Private method to check field validity
  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!errorElement) return;

    if (input.validity.valid) {
      this._hideInputError(input, errorElement);
    } else {
      this._showInputError(input, errorElement);
    }
  }

  // Private method to show error for an input
  _showInputError(input, errorElement) {
    input.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = input.validationMessage;
  }

  // Private method to hide error for an input
  _hideInputError(input, errorElement) {
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  // Private method to check if entire form is valid
  _isFormValid() {
    return Array.from(this._inputs).every((input) => input.validity.valid);
  }

  // Private method to toggle button state based on form validity
  _toggleButtonState() {
    if (!this._submitButton) return;

    if (this._isFormValid()) {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  // Private method to validate form state
  _validateFormState() {
    this._inputs.forEach((input) => {
      this._checkInputValidity(input);
    });
    this._toggleButtonState();
  }

  // Private method to add event listeners
  _addEventListeners() {
    // Add input event listeners
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => this._validateFormState());
    });

    // Add form submit listener
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      return this._isFormValid();
    });
  }

  // Public method to enable form validation
  enableValidation() {
    this._addEventListeners();
    this._validateFormState(); // Initial validation
  }

  // Public method to disable button state or reset form validation
  resetValidation() {
    // Clear all errors
    this._inputs.forEach((input) => {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        this._hideInputError(input, errorElement);
      }
    });

    // Reset button state
    this._toggleButtonState();
  }
}
