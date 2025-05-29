import SimplePopup from './classSimplePopup.js';

export default class PopupWithForm extends SimplePopup {
    open() {
        // disableSubmit
        if (!this.popup.classList.contains('popup_profile')) {
            const inputBtn = this.popup.querySelector('.popup__button');
            inputBtn.setAttribute('disabled', true);
            inputBtn.classList.add('popup__button_inactive');
        }
        this.popup.classList.add('popup_is-opened');

        this.popup.querySelector('#name').value = document.querySelector('.user-info__name').textContent;
        this.popup.querySelector('#info').value = document.querySelector('.user-info__job').textContent;
    }

    close() {   
        const errorMessages = document.querySelectorAll('.popup__input_error');
        this.popup.classList.remove('popup_is-opened');
        this.popup.querySelector('.popup__form').reset();
        // userInfoForm
        // enableSubmit
        if (this.popup.classList.contains('popup_profile')) {
            const inputBtn = this.popup.querySelector('.popup__button');
            inputBtn.removeAttribute('disabled');
            inputBtn.classList.remove('popup__button_inactive');
            // reset input
            this.popup.querySelector('#name').value = document.querySelector('.user-info__name').textContent;
            this.popup.querySelector('#info').value = document.querySelector('.user-info__job').textContent;

        }
        // resetAllErrors
        for (const element of errorMessages) {
            element.parentNode.classList.remove('input-container_invalid');
            element.textContent = '';
        }
    }    
    
    onUpload(text) {
        this.text = text;     
        (this.popup.querySelector('.popup__button_save') || this.popup.querySelector('.popup__button_add')).textContent = this.text;
    }
}