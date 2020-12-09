import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector)
        this._submitFormHandler = submitFormHandler;
        this._popupForm = this._popup.querySelector('.popup__form');

    }


    _getInputValues() {

        this._inputValuesList = {};
        this._popupForm.querySelectorAll('.popup__input').forEach(item => {
            this._inputValuesList[item.name] = item.value;
        })
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            this._submitFormHandler(event);
            this._closeButton.addEventListener('click', evt => this.close(evt));
        });

    }

    _close() {
        this._popup.classList.remove('popup_opened');
        this._popup.reset();
    }
}