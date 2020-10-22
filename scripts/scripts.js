const initialCards = [{
        name: 'Алтай',

        link: './images/evgenia-beletskaya-altai-unsplash.jpg'
    },
    {
        name: 'Санкт-Петербург',
        link: './images/azimbek-assarov-piter-unsplash.jpg'
    },
    {
        name: 'Карачаевск',
        link: './images/kirill-pershin-1088404-unsplash.jpg'
    },
    {
        name: 'Эльбрус',
        link: './images/kirill-pershin-1404681-unsplash.png'
    },
    {
        name: 'Калининград',
        link: './images/aleksey-malinovski-kU9eYVI3h5M-unsplash.jpg'
    },
    {
        name: 'Сочи',
        link: './images/Sochi-unsplash.jpg'
    }
];


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_profile');
const placePopup = document.querySelector('.popup_place');

const popupCloseButtonProfile = document.querySelector('.popup__close_profile');
const popupCloseButtonPlace = document.querySelector('.popup__close_place');
const popupSubmitButton = document.querySelector('.popup__submit');
const name = document.querySelector('.profile__name');
const aboutme = document.querySelector('.profile__aboutme');
const nameInput = document.querySelector('.popup__form-information_name');
const aboutmeInput = document.querySelector('.popup__form-information_aboutme');
const formProfile = document.querySelector('.popup__form');
const formPLace = document.querySelector('.popup__form_place');
const placename = document.querySelector('.placename');
const placeimage = document.querySelector('.placeimage');
const placenameInput = document.querySelector('.popup__form-information_placename');
const placeimageInput = document.querySelector('.popup__form-information_placeimage');


function openProfileForm(event) {
    nameInput.value = name.textContent;
    aboutmeInput.value = aboutme.textContent;
    profilePopup.classList.add('popup_opened');
}

function openPlaceForm(event) {
    placePopup.classList.add('popup_opened');
}


const closePopupProfile = function(event) {
    if (event.target !== event.currentTarget) return
    profilePopup.classList.remove('popup_opened');
}

const closePopupPlace = function(event) {
    if (event.target !== event.currentTarget) return
    placePopup.classList.remove('popup_opened');
}


function formSubmitHandler(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    aboutme.textContent = aboutmeInput.value;
    closePopupProfile(event);

}

editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', openPlaceForm);
profilePopup.addEventListener('click', closePopupProfile);
placePopup.addEventListener('click', closePopupPlace);
popupCloseButtonProfile.addEventListener('click', closePopupProfile);
popupCloseButtonPlace.addEventListener('click', closePopupPlace);
formProfile.addEventListener('submit', formSubmitHandler);


const cardsTemplate = document.querySelector('#cards-container');

const elementsContainer = document.querySelector('.elements');


function addElement(element) {
    const cardElement = cardsTemplate.content.cloneNode(true);

    const photoElement = cardElement.querySelector('.element__photo');
    const titleElement = cardElement.querySelector('.element__title');

    photoElement.src = element.link;
    titleElement.textContent = element.name;

    const likeButton = cardElement.querySelector('.like');

    function likeBtn(evt) {
        evt.target.classList.toggle('like_active');
    }
    likeButton.addEventListener('click', likeBtn);

    elementsContainer.prepend(cardElement);
}

initialCards.forEach(addElement);

const trashElements = document.querySelectorAll('.element__trash');

trashElements.forEach((trashElement) => trashElement.addEventListener('click', (event) => {
    event.target.closest('.element').remove();
    return cardsTemplate;
}));


function addNewElement(evt) {
    evt.preventDefault();
    const newCard = { name: placenameInput.value, link: placeimageInput.value };
    cardsTemplate.prepend(addElement(newCard));
    closePopupPlace(event);
}

formPLace.addEventListener('submit', addNewElement);

const card = document.querySelectorAll('.element');
const fullImagePopup = document.querySelector('.popup_fullimage');
let photoElement = document.querySelector('.element__photo');
let popupImage = document.querySelector('.popup__image');
let popupText = document.querySelector('.popup__title_image');
let elementText = document.querySelector('.element__title');
const popupCloseButtonImage = document.querySelector('.popup__close_fullscreen');
let imageContainer = document.querySelector('.popup__container-image');

function openImage(event) {
    popupImage.src = this.src;
    popupText.textContent = card.textContent;
    fullImagePopup.classList.add('popup_opened');
}

function closePopupImage(event) {
    if (event.target !== event.currentTarget) return
    fullImagePopup.classList.remove('popup_opened');
}

photoElement.addEventListener('click', openImage);
fullImagePopup.addEventListener('click', closePopupImage);
popupCloseButtonImage.addEventListener('click', closePopupImage);