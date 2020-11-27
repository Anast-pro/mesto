import { initialCards } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_profile');
const placePopup = document.querySelector('.popup_place');
const popupCloseButtonProfile = document.querySelector('.popup__close_profile');
const popupCloseButtonPlace = document.querySelector('.popup__close_place');
const name = document.querySelector('.profile__name');
const aboutMe = document.querySelector('.profile__aboutme');
const nameInput = document.querySelector('.popup__form-information_name');
const aboutMeInput = document.querySelector('.popup__form-information_aboutme');
const formProfile = document.querySelector('.popup__form');
const formPLace = document.querySelector('.popup__form_place');
const placeNameInput = document.querySelector('.popup__form-information_placename');
const placeImageInput = document.querySelector('.popup__form-information_placeimage');
const fullImagePopup = document.querySelector('.popup_fullimage');
const popupCloseButtonImage = document.querySelector('.popup__close_fullscreen');
const elementsContainer = document.querySelector('.elements');
const escape = "Escape";
const error = document.querySelector('.error');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__title_image');


const openPopup = (popup) => {
    popup.classList.add('popup_opened');

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
    document.addEventListener('keydown', closeByEscape);
};

export function openImage(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    openPopup(fullImagePopup);
};


const closeByEscape = (evt) => {
    if (evt.key === escape) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

const closePopup = (popup) => {
    error.textContent = "";
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);

};

function openProfileForm() {
    nameInput.value = name.textContent;
    aboutMeInput.value = aboutMe.textContent;
    openPopup(profilePopup);
}


function submitHandlerProfile(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    closePopup(profilePopup);
}

const renderCards = () => {
    const cards = initialCards.map(cardElement =>
        new Card(cardElement, '#cards-container').getCardElement()
    );
    elementsContainer.prepend(...cards);
};

renderCards();

function addNewElement(event) {
    event.preventDefault();
    const newCard = { name: placeNameInput.value, link: placeImageInput.value };
    elementsContainer.prepend(
        new Card(newCard, '#cards-container').getCardElement()
    );
    closePopup(placePopup);
}

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target !== event.currentTarget) return
        closePopup(popup);
    });
});

formPLace.addEventListener('submit', addNewElement);
editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', () => openPopup(placePopup));
popupCloseButtonProfile.addEventListener('click', () => closePopup(profilePopup));
popupCloseButtonPlace.addEventListener('click', () => closePopup(placePopup));
formProfile.addEventListener('submit', submitHandlerProfile);
popupCloseButtonImage.addEventListener('click', () => closePopup(fullImagePopup));