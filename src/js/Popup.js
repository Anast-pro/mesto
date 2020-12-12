const ESC_KEY = "Escape";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);

    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === ESC_KEY) {

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
        this._popup.addEventListener('click', evt => this._handleOverlayClose(evt));


    }
}