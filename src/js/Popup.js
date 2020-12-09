const esc = "Escape";

import FormValidator from './FormValidator.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_opened');

        const formList = Array.from(this._popup.querySelectorAll('.popup__form'));
        formList.forEach((form) => {
            const buttonClass = form.querySelector('.popup__button').classList[1];
            const inputList = Array.from(form.querySelectorAll('.popup__input'));
            inputList.forEach((inputElement) => {
                new FormValidator({
                    submitButtonSelector: "." + buttonClass,
                    inactiveButtonClass: 'popup__button_disabled',
                    inputErrorClass: 'popup__input-invalid',
                }, inputElement).enableValidation();
            });

        });


        document.addEventListener('keydown', evt => this._handleEscClose(evt));

        this._popup.addEventListener('click', evt => this._handleOverlayClose(evt));

        this.setEventListeners(this._popup);

    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === esc) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {

        this._closeButton.addEventListener('click', evt => this.close(evt));

    }
}