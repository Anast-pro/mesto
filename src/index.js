import './pages/index.css';

import { initialCards } from './js/cards.js';
import Card from './js/Card.js';
import FormValidator from './js/FormValidator.js';
import Section from './js/Section.js';
import Popup from './js/Popup.js';
import PopupWithImage from './js/PopupWithImage.js';
import PopupWithForm from './js/PopupWithForm.js';
import UserInfo from './js/UserInfo.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const userMainInfo = document.querySelector('.profile__aboutme');
const nameInput = document.querySelector('.popup__form-information_name');
const userMainInfoInput = document.querySelector('.popup__form-information_aboutme');
const placeNameInput = document.querySelector('.popup__form-information_placename');
const placeImageInput = document.querySelector('.popup__form-information_placeimage');
const elementsContainer = document.querySelector('.elements');
export const imageSelector = document.querySelector('.popup__image');
export const imageTitleSelector = document.querySelector('.popup__title_image');


const formEditSubmitHandler = (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    userMainInfo.textContent = userMainInfoInput.value;
    const info = {
        name: nameInput.value,
        userMainInfo: userMainInfoInput.value
    }

    userInfo.setUserInfo(info);

    popupEditProfile.close();
}


const addNewElement = (event) => {
    event.preventDefault();

    const data = { name: placeNameInput.value, link: placeImageInput.value }

    const card = new Card({
            data,
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link)
            }
        },
        '#cards-container').getCardElement();

    cardList.addItem(card)
    popupNewPlace.close();
}

editButton.addEventListener('click', () => {
    profilePopup.open();
    const currentInfo = userInfo.getUserInfo();

    nameInput.value = currentInfo.name;
    userMainInfoInput.value = currentInfo.info;
});

const cardList = new Section({
        items: initialCards,
        renderer: (data) => {
            const card = new Card({
                    data,
                    handleCardClick: (name, link) => {
                        popupWithImage.open(name, link)
                    }
                },
                '#cards-container').getCardElement();
            cardList.addItem(card);

        }
    },
    elementsContainer
);
cardList.renderItems();

const profilePopup = new Popup('.popup_profile');
const placePopup = new Popup('.popup_place');
const popupWithImage = new PopupWithImage('.popup_fullimage');
const popupNewPlace = new PopupWithForm('.popup_place', addNewElement);
popupNewPlace.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_profile', formEditSubmitHandler);
popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__aboutme');


editButton.addEventListener('click', () => profilePopup.open());
addButton.addEventListener('click', () => placePopup.open());