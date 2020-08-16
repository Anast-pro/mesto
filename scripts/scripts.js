let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupSubmitButton = popup.querySelector('.popup__submit');
let name = document.querySelector('.profile__name');
let aboutme = document.querySelector('.profile__aboutme');
let nameInput = popup.querySelector('.popup__form-information_name');
let aboutmeInput = popup.querySelector('.popup__form-information_aboutme');
let formElement = popup.querySelector('.popup__form');

let openPopup = function() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    aboutmeInput.value = aboutme.textContent;
}

let closePopup = function(event) {
    if (event.target !== event.currentTarget) return
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    aboutme.textContent = aboutmeInput.value;
    closePopup(event);

}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);