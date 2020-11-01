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
const placeName = document.querySelector('.placename');
const placeImage = document.querySelector('.placeimage');
const placeNameInput = document.querySelector('.popup__form-information_placename');
const placeImageInput = document.querySelector('.popup__form-information_placeimage');
const submitPlaceButton = document.querySelector('.popup__button_place');
const submitProfileButton = document.querySelector('.popup__button_profile');
const fullImagePopup = document.querySelector('.popup_fullimage');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__title_image');
const elementText = document.querySelector('.element__title');
const popupCloseButtonImage = document.querySelector('.popup__close_fullscreen');
const imageContainer = document.querySelector('.popup__container-image');
const cardsTemplate = document.querySelector('#cards-container');
const elementsContainer = document.querySelector('.elements');
const Escape = "Escape";


const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened')

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


function likeBtn(event) {
    event.target.classList.toggle('like_active');
}

const getCardElement = (element) => {
    const cardElement = cardsTemplate.content.cloneNode(true);
    const photoElement = cardElement.querySelector('.element__photo');
    const titleElement = cardElement.querySelector('.element__title');
    photoElement.src = element.link;
    titleElement.textContent = element.name;
    photoElement.alt = element.name;
    const likeButton = cardElement.querySelector('.like');
    const trashElement = cardElement.querySelector('.element__trash');

    likeButton.addEventListener('click', likeBtn);

    photoElement.addEventListener('click', () => openImage(element));
    trashElement.addEventListener('click', handleDeleteCard);
    return cardElement;
}

function addNewElement(event) {
    event.preventDefault();
    const newCard = { name: placeNameInput.value, link: placeImageInput.value };
    elementsContainer.prepend(getCardElement(newCard));
    closePopup(placePopup);
}

const renderCards = () => {
    const cards = initialCards.map(element => getCardElement(element));
    elementsContainer.prepend(...cards);
};

renderCards();


function handleDeleteCard(trashElement) {
    trashElement.target.closest('.element').remove();
}

const openImage = (element) => {
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupText.textContent = element.name;
    openPopup(fullImagePopup);
};


formPLace.addEventListener('submit', addNewElement);
editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', () => openPopup(placePopup));
popupCloseButtonProfile.addEventListener('click', () => closePopup(profilePopup));
popupCloseButtonPlace.addEventListener('click', () => closePopup(placePopup));
formProfile.addEventListener('submit', submitHandlerProfile);
popupCloseButtonImage.addEventListener('click', () => closePopup(fullImagePopup));

document.addEventListener('keydown', function(evt) {
    if (evt.key === Escape) {
        closePopup(placePopup);
    }
})

document.addEventListener('keydown', function(evt) {
    if (evt.key === "Escape") {
        closePopup(profilePopup);
    }
})

profilePopup.addEventListener('click', () => {
    if (event.target !== event.currentTarget) return
    closePopup(profilePopup);
});
placePopup.addEventListener('click', () => {
    if (event.target !== event.currentTarget) return
    closePopup(placePopup);
});
fullImagePopup.addEventListener('click', () => {
    if (event.target !== event.currentTarget) return
    closePopup(fullImagePopup);
});