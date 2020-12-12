import './index.css';

import { initialCards } from '../js/cards.js';
import Card from '../js/Card.js';
import FormValidator from '../js/FormValidator.js';
import Section from '../js/Section.js';
import PopupWithImage from '../js/PopupWithImage.js';
import PopupWithForm from '../js/PopupWithForm.js';
import UserInfo from '../js/UserInfo.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__form-information_name');
const userMainInfoInput = document.querySelector('.popup__form-information_aboutme');
const elementsContainer = document.querySelector('.elements');


function cardCreation(data) {
    const card = new Card({
            data,
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link)
            }
        },
        '#cards-container').getCardElement();
    return card
}


function addNewElement(name, link) {

    const data = { name: name, link: link }
    cardList.addItem(cardCreation(data));
    placePopup.close();
}



const cardList = new Section(

    (data) => {
        cardList.addItem(cardCreation(data));
    },

    elementsContainer
);
cardList.renderItems(initialCards);



const profilePopup = new PopupWithForm('.popup_profile', formEditSubmitHandler);
profilePopup.setEventListeners();
const placePopup = new PopupWithForm('.popup_place', addNewElement);
placePopup.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_fullimage');
popupWithImage.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__aboutme');



function formEditSubmitHandler(name, userMainInfo) {

    const info = {
        name: name,
        userMainInfo: userMainInfo
    }
    userInfo.setUserInfo(info);
    profilePopup.close();
}

editButton.addEventListener('click', () => profilePopup.open());
addButton.addEventListener('click', () => placePopup.open());

editButton.addEventListener('click', () => {
    profilePopup.open();
    const currentInfo = userInfo.getUserInfo();
    nameInput.value = currentInfo.name;
    userMainInfoInput.value = currentInfo.info;
});



const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
    const buttonClass = form.querySelector('.popup__button').classList[1];
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        new FormValidator({
            submitButtonSelector: "." + buttonClass,
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input-invalid',
        }, inputElement).enableValidation();
    });

});