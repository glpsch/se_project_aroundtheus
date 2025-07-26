"use strict";

export function enableValidation(config) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = config;

  // Find all forms that match the selector
  const forms = document.querySelectorAll(formSelector);

  // Add validation to each form
  forms.forEach(form => {
    setEventListeners(form, {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    });
  });
}

// Helper function to set event listeners for a form
function setEventListeners(form, config) {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = config;

  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);

  // Add input event listeners
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(form, submitButtonSelector, inactiveButtonClass);
    });

    input.addEventListener('blur', () => {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(form, submitButtonSelector, inactiveButtonClass);
    });
  });

  // Add form submit listener
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isFormValid(form, inputSelector)) {
      // Form is valid, allow submission
      return true;
    } else {
      // Form is invalid, prevent submission
      return false;
    }
  });
}

// Check if a single input is valid and show/hide error
function checkInputValidity(form, input, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  
  if (!errorElement) return;

  if (input.validity.valid) {
    // Input is valid
    hideInputError(input, errorElement, inputErrorClass, errorClass);
  } else {
    // Input is invalid
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
  errorElement.textContent = '';
}

// Check if entire form is valid
function isFormValid(form, inputSelector) {
  const inputs = form.querySelectorAll(inputSelector);
  return Array.from(inputs).every(input => input.validity.valid);
}

// Toggle button state based on form validity
function toggleButtonState(form, submitButtonSelector, inactiveButtonClass) {
  const submitButton = form.querySelector(submitButtonSelector);
  const inputs = form.querySelectorAll('input');
  
  if (isFormValid(form, 'input')) {
    // Form is valid, enable button
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    // Form is invalid, disable button
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
}

// Clear all errors and reset form state
export function clearFormErrors(form, config) {
  const {
    inputSelector,
    //submitButtonSelector,
    //inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = config;

  const inputs = form.querySelectorAll(inputSelector);  

  // Clear input errors
  inputs.forEach(input => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (errorElement) {
      hideInputError(input, errorElement, inputErrorClass, errorClass);
    }
  });

} 