import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    open(element) {
        this._element = element;
        super.open();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitHandler(this._element);
        });

        super.setEventListeners();

    }


}