let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupSubmitButton = popup.querySelector('.popup__submit');
let name = document.querySelector('.profile__name'); //jnc.lf gkfu
let aboutme = document.querySelector('.profile__aboutme');
let nameInput = popup.querySelector('.popup__name');
let aboutmeInput = popup.querySelector('.popup__aboutme');

let popupToggle = function() {
    popup.classList.toggle('popup_opened');
}

let closePopup = function(event) {
    if (event.target !== event.currentTarget) return
    popupToggle();
}


let formElement = popup.querySelector('.popup__form');

function formSubmitHandler(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    aboutme.textContent = aboutmeInput.value;
    popupToggle();

}

editButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);