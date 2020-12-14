import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__edit-avatar');
const confirmationDeleteButton = document.querySelector('.popup__button_confirmation');
const nameInput = document.querySelector('.popup__form-information_name');
const userMainInfoInput = document.querySelector('.popup__form-information_aboutme');
const elementsContainer = document.querySelector('.elements');
const avatarSubmitButton = document.querySelector('.popup__button_avatar');
const profileSubmitButton = document.querySelector('.popup__button_profile');
const placeSubmitButton = document.querySelector('.popup__button_place');


const profilePopup = new PopupWithForm('.popup_profile', formEditSubmitHandler);
profilePopup.setEventListeners();
const placePopup = new PopupWithForm('.popup_place', addNewElement);
placePopup.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_avatar', formEditAvatarSubmitHandler);
avatarPopup.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_fullimage');
popupWithImage.setEventListeners();
const confirmationPopup = new PopupWithConfirmation('.popup_confirmation', formDeleteSubmitHandler);
confirmationPopup.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__aboutme', '.profile__avatar');

const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: '9d674f7b-2a9e-4e8a-af7b-88d210976df9',
        'Content-Type': 'application/json'
    }
});

const setButtonText = (button, text) => {
    button.textContent = text;
}


function cardCreation(data) {
    const card = new Card({
            data,
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link)
            },
            handleLikeClick: (init, item) => {
                if (!init) {
                    api.likeCard(item)
                        .then((res) => {
                            card.updateLikeCount(res.likes.length);
                            card.likeCard()
                        })
                        .catch(error => console.log(error));
                } else {
                    api.unlikeCard(item)
                        .then((res) => {
                            card.updateLikeCount(res.likes.length);
                            card.unLikeCard();
                        })
                        .catch(error => console.log(error));
                }
            },
            handleDeleteIconClick: (item) => {
                confirmationPopup.open(item)
            }
        },
        '#cards-container')
    return card.getCardElement();
}


const cardList = new Section(
    cardCreation,
    elementsContainer
)


function addNewElement(name, link) {
    setButtonText(placeSubmitButton, 'Сохранение...');
    api.addCard(name, link)
        .then((res) => {
            cardList.addItem(cardCreation(res));
        })
        .catch((error) => console.log(error))
        .finally(() => setButtonText(placeSubmitButton, 'Сохранить'))
    placePopup.close();
}



api.getCards()
    .then((items) => {
        cardList.renderItems(items);
    })
    .catch(error => console.log(error));


api.getUserInfo()
    .then((res) => {
        const info = {
            name: res.name,
            userMainInfo: res.about,
            avatar: res.avatar
        }
        userInfo.setUserInfo(info)
    })
    .catch((error) => console.log(error));



function formEditSubmitHandler(name, userMainInfo, avatar) {
    setButtonText(profileSubmitButton, 'Сохранение...');
    const info = {
        name: name,
        userMainInfo: userMainInfo,
        avatar: avatar
    }
    api.editUserInfo(name, userMainInfo, avatar)
        .then((res) => {

            const info = {
                name: res.name,
                userMainInfo: res.about,
                avatar: res.avatar
            }
            userInfo.setUserInfo(info)
        })
        .catch((error) => console.log(error))
        .finally(() => setButtonText(profileSubmitButton, 'Сохранить'))

    userInfo.setUserInfo(info);
    profilePopup.close();
}

function formEditAvatarSubmitHandler(info) {
    setButtonText(avatarSubmitButton, 'Сохранение...');
    api.editUserAvatar(info)
        .then((res) => {
            const info = {
                name: res.name,
                userMainInfo: res.about,
                avatar: res.avatar
            }
            userInfo.setUserInfo(info)
        })
        .catch((error) => console.log(error))
        .finally(() => setButtonText(avatarSubmitButton, 'Сохранить'))
    userInfo.setUserInfo(info);
    avatarPopup.close()


}

function formDeleteSubmitHandler(item) {
    setButtonText(confirmationDeleteButton, 'Удаление...');
    api.deleteCard(item._cardId, item._ownerCardId)
        .then(() => {
            item.deleteCard()
        })

    .catch((error) => console.log(error))
        .finally(() => {
            setButtonText(confirmationDeleteButton, 'Да');
        })
    confirmationPopup.close();
}

editButton.addEventListener('click', () => profilePopup.open());
addButton.addEventListener('click', () => placePopup.open());
avatarButton.addEventListener('click', () => avatarPopup.open());

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