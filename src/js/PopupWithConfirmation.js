import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
    }

    setEventListeners() {
        this._trash.addEventListener('submit', (event) => {
            this._submitHandler(event);
            this._closeButton.addEventListener('click', evt => this.close(evt));
        });

    }


}