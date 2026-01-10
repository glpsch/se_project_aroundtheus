export const selectors = {
  // Templates
  cardTemplate: "#place-card-template",

  // Forms
  editForm: ".popup_edit-user .popup__form",
  addCardForm: ".popup_add-card .popup__form",

  // Popups
  popupImage: ".popup_image",
  popupEditUser: ".popup_edit-user",
  popupAddCard: ".popup_add-card",

  // User Info
  userName: ".user-info__name",
  userJob: ".user-info__job",
  userEditButton: ".user-info__edit-icon",
  userAddPlaceButton: ".user-info__place-button",

  // Lists
  placesList: ".places-list",

  // Input fields
  nameInput: "#name",
  infoInput: "#info",
};

// Validation configuration
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Card-related constants
export const cardConfig = {
  card: ".place-card",
  cardImage: ".place-card__image",
  cardName: ".place-card__name",
  likeButton: ".place-card__like-icon",
  deleteButton: ".place-card__delete-icon",
  likedClass: "place-card__like-icon_liked",
};

// Popup-related constants
export const popupConfig = {
  closeButton: ".popup__close",
  form: ".popup__form",
  input: ".popup__input",

  image: ".popup__image",
  imageImg: ".popup__image img",
  imageDescription: ".popup__image-description",

  openedClass: "popup_is-opened",
};
