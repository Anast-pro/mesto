import { openImage } from './scripts.js'

export default class Card {
    constructor(data, templateSelector) {

        this._name = data.name;
        this._link = data.link;
        this._cardsTemplate = document.querySelector(templateSelector).content.querySelector('.element');
    };

    _deleteCardElement() {
        this._content.remove();
    }

    _toggleLike() {
        this._content.querySelector('.like').classList.toggle('like_active');
    }

    getCardElement() {
        this._content = this._cardsTemplate.cloneNode(true);
        const photoElement = this._content.querySelector('.element__photo');
        photoElement.src = this._link;
        this._content.querySelector('.element__title').textContent = this._name;

        this._content
            .querySelector('.element__trash')
            .addEventListener('click', () => this._deleteCardElement());


        this._content
            .querySelector('.element__info')
            .querySelector('.like')
            .addEventListener('click', () => this._toggleLike());

        photoElement.addEventListener('click', () => openImage(this._name, this._link));

        return this._content;
    }

}

//Спасибо большое за ревью) Особенно, за помощь с точками с запятой))