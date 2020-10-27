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

const popup = document.querySelector('.popup');
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
const placename = document.querySelector('.placename');
const placeImage = document.querySelector('.placeimage');
const placenameInput = document.querySelector('.popup__form-information_placename');
const placeImageInput = document.querySelector('.popup__form-information_placeimage');
const submitPlaceButton = document.querySelector('.popup__submit_place');
const submitProfileButton = document.querySelector('.popup__submit_profile');
const fullImagePopup = document.querySelector('.popup_fullimage');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__title_image');
const elementText = document.querySelector('.element__title');
const popupCloseButtonImage = document.querySelector('.popup__close_fullscreen');
const imageContainer = document.querySelector('.popup__container-image');

const cardsTemplate = document.querySelector('#cards-container');
const elementsContainer = document.querySelector('.elements');


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

function openPlaceForm() {
    openPopup(placePopup);
}

function closePopupProfile() {
    closePopup(popupCloseButtonProfile);
}

function closePopupPlace() {
    closePopup(popupCloseButtonPlace);
}

function submitHandlerProfile(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    closePopup(popupCloseButtonProfile);

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

    photoElement.addEventListener('click', openImage);
    trashElement.addEventListener('click', handleDeleteCard);
    return cardElement;
}

function addNewElement(event) {
    event.preventDefault();
    const newCard = { name: placenameInput.value, link: placeImageInput.value };
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

function openImage(event) {
    const card = document.querySelector('.element');

    popupImage.src = this.src;
    popupImage.alt = card.textContent;
    popupText.textContent = card.textContent;
    openPopup(fullImagePopup);
}

function closeImage() {
    closePopup(popupCloseButtonImage);
}


formPLace.addEventListener('submit', addNewElement);
editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', openPlaceForm);
popupCloseButtonProfile.addEventListener('click', () => closePopup(profilePopup));
popupCloseButtonPlace.addEventListener('click', () => closePopup(placePopup));
formProfile.addEventListener('submit', submitHandlerProfile);
popupCloseButtonImage.addEventListener('click', () => closePopup(fullImagePopup));
submitPlaceButton.addEventListener('click', () => closePopup(placePopup));
submitProfileButton.addEventListener('click', () => closePopup(profilePopup));
profilePopup.addEventListener('click', () => {
    if (event.target !== event.currentTarget) return
    profilePopup.classList.remove('popup_opened')
});
placePopup.addEventListener('click', () => {
    if (event.target !== event.currentTarget) return
    placePopup.classList.remove('popup_opened')
});
fullImagePopup.addEventListener('click', () => {
    if (event.target !== event.currentTarget) return
    fullImagePopup.classList.remove('popup_opened')
});

//Спасибо большое за советы и ревью!) С "можно лучше" еще не всем разобралась, но спасибо за полезную информацию