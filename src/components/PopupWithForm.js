import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector)
        this._submitFormHandler = submitFormHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {

        return Array.from(this._popupForm.querySelectorAll('.popup__input')).map(item => {
            return item.value
        });

    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormHandler(...(this._getInputValues()));
        });
        super.setEventListeners();
    }

    _close() {
        super.close();
    }
}