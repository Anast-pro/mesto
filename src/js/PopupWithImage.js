import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = document.querySelector('.popup__image');
        this._imageTitle = document.querySelector('.popup__title_image');

    }


    open(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._imageTitle.textContent = name;

        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', evt => this._handleEscClose(evt));

        this._popup.addEventListener('click', evt => this._handleOverlayClose(evt))

        this.setEventListeners(this._popup);
    }
}