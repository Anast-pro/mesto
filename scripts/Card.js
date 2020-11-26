const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

const closeByEscape = (evt) => {
    if (evt.key === Escape) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

export default class Card {
    constructor(data, templateSelector) {

        this._name = data.name;
        this._link = data.link;
        this._cardsTemplate = document.querySelector(templateSelector).content.querySelector('.element');
    };

    _deleteCardElement() {
        this._content.remove();
    };

    _toggleLike() {
        this._content.querySelector('.like').classList.toggle('like_active');
    };

    _openImage() {

        const fullImagePopup = document.querySelector('.popup_fullimage');
        const popupImage = document.querySelector('.popup__image');
        const popupText = document.querySelector('.popup__title_image');


        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupText.textContent = this._name;
        openPopup(fullImagePopup);
    };

    getCardElement() {
        this._content = this._cardsTemplate.cloneNode(true);
        this._content.querySelector('.element__photo').src = this._link;
        this._content.querySelector('.element__title').textContent = this._name;

        this._content
            .querySelector('.element__trash')
            .addEventListener('click', () => this._deleteCardElement());


        this._content
            .querySelector('.element__info')
            .querySelector('.like')
            .addEventListener('click', () => this._toggleLike());

        this._content
            .querySelector('.element__photo')
            .addEventListener('click', () => this._openImage());

        return this._content;
    };



}