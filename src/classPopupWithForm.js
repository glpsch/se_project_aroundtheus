import SimplePopup from "./classSimplePopup.js";

export default class PopupWithForm extends SimplePopup {
  constructor(popup) {
    super(popup);
    this.form = this.popup.querySelector(".popup__form");
    this.setEventListeners();
  }

  setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.onSubmit();
    });
  }

  open() {
    if (this.popup.classList.contains("popup_edit-user")) {     
      const nameInput = this.form.querySelector("#name");
      const aboutInput = this.form.querySelector("#info");
      nameInput.value = document.querySelector(".user-info__name").textContent;
      aboutInput.value = document.querySelector(".user-info__job").textContent;
    }
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
    this.form.reset();
  }

  onSubmit() {
    if (this.popup.classList.contains("popup_edit-user")) {
      // Handle profile edit form submission
      const nameInput = this.form.querySelector("#name");
      const aboutInput = this.form.querySelector("#info");

      // Update profile information
      document.querySelector(".user-info__name").textContent = nameInput.value;
      document.querySelector(".user-info__job").textContent = aboutInput.value;

      this.close();
    } else if (this.popup.classList.contains("popup_add-card")) {
      // Handle new card form submission
      const titleInput = this.form.querySelector("#title");
      const linkInput = this.form.querySelector("#link");

      // Create card data
      const cardData = {
        name: titleInput.value,
        link: linkInput.value,
      };

      // Add card through CardList
      const cardList = document.querySelector(".places-list").__cardList;
      if (cardList) {
        cardList.addCard(cardData);
      }
    }
  }
}
