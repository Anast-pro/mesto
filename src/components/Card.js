export default class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, templateSelector) {
        this._cardInfo = data;
        this._name = this._cardInfo.name;
        this._link = this._cardInfo.link;
        this._cardsTemplate = templateSelector;
        this._cardId = this._cardInfo._id;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this.handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._ownerCardId = this._cardInfo.owner._id;
        this._userId = '3211a95e6aa00f2dd8d64029';
    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardsTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    deleteCard() {
        this._element.remove();
    }

    checkLike() {
        return this._likeButton.classList.contains('element__like_active')
    }

    likeCard() {
        this._likeButton.classList.add('element__like_active');
    }

    unLikeCard() {
        this._likeButton.classList.remove('element__like_active');
    }

    updateLikeCount(item) {
        this._likeCount.textContent = item;
    }

    getCardElement() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__trash');
        this._photoElement = this._element.querySelector('.element__photo');
        this._likeCount = this._element.querySelector('.element__like-counter');
        this._likesList = this._cardInfo.likes;

        this._element.querySelector('.element__title').textContent = this._name;
        this._photoElement.src = this._link;
        this._photoElement.alt = this._name;


        if (this._ownerCardId !== this._userId) {
            this._deleteButton.remove();
        }

        this.updateLikeCount(this._cardInfo.likes.length);

        if (this._likesList.some((item) => item._id === this._userId)) {
            this.likeCard();
        };
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this.checkLike(), this._cardId));
        this._deleteButton.addEventListener('click', () => this._handleDeleteIconClick(this));
        this._photoElement.addEventListener('click', () => this.handleCardClick(this._name, this._link));
    }

}
