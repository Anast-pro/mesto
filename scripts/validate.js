function showError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add('popup__input-invalid');
}

function hideError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove('popup__input-invalid');
}

function checkInputValidity(form, input) {
    if (input.checkValidity()) {
        hideError(form, input);
    } else {
        showError(form, input);
    }
};

function toggleButtonState(form, buttonElement) {
    if (form.checkValidity()) {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add('popup__button_disabled');
        buttonElement.disabled = true;
    }
}

function setEventListeners(form) {
    const inputElements = Array.from(form.querySelectorAll('.popup__input'));

    const buttonElement = form.querySelector('.popup__button');

    inputElements.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, evt.target);
            toggleButtonState(form, buttonElement);
        });
    });
    toggleButtonState(form, buttonElement);
}


function enableValidation() {
    const formElements = Array.from(document.querySelectorAll('.popup__form'));

    formElements.forEach((form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form);
    }));
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});