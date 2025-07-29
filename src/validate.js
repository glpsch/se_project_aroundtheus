"use strict";

export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => setEventListeners(form, config));
}

// Helper function to set event listeners for a form
function setEventListeners(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);

  // Add input event listeners
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateFormState(form, config));
  });

  // Add form submit listener
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    return isFormValid(form.querySelectorAll(config.inputSelector));
  });
}

// Unified validation function
function validateFormState(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    checkInputValidity(form, input, config.inputErrorClass, config.errorClass);
  });

  toggleButtonState(submitButton, inputs, config.inactiveButtonClass);
}

// Check if a single input is valid and show/hide error
function checkInputValidity(form, input, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!errorElement) return;

  if (input.validity.valid) {
    hideInputError(input, errorElement, inputErrorClass, errorClass);
  } else {
    showInputError(input, errorElement, inputErrorClass, errorClass);
  }
}

// Show error for an input
function showInputError(input, errorElement, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
}

// Hide error for an input
function hideInputError(input, errorElement, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

// Check if entire form is valid
function isFormValid(inputs) {
  return Array.from(inputs).every((input) => input.validity.valid);
}

// Toggle button state based on form validity
function toggleButtonState(submitButton, inputs, inactiveButtonClass) {
  if (!submitButton) return;

  if (isFormValid(inputs)) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
}

// Clear all errors and reset form state
export function clearFormErrors(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (errorElement) {
      hideInputError(
        input,
        errorElement,
        config.inputErrorClass,
        config.errorClass
      );
    }
  });
}

// Initialize form state when popup opens
export function initializeFormState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);

  if (submitButton) {
    const inputs = form.querySelectorAll(config.inputSelector);
    toggleButtonState(submitButton, inputs, config.inactiveButtonClass);
  }

  clearFormErrors(form, config);
}
