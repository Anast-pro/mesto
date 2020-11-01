function showError(form, input, inputErrorClass) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
}

function hideError(form, input, inputErrorClass) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(inputErrorClass);
}

function checkInputValidity(form, input) {
    if (input.checkValidity()) {
        hideError(form, input);
    } else {
        showError(form, input);
    }
};

function toggleButtonState(form, buttonElement, inactiveButtonClass) {
    if (form.checkValidity()) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function setEventListeners(form, rest) {

    const inputElements = form.querySelectorAll(rest['inputSelector']);
    const buttonElement = form.querySelector(rest['submitButtonSelector']);

    inputElements.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, evt.target);
            toggleButtonState(form, buttonElement, rest['inactiveButtonClass']);
        });
    });
    toggleButtonState(form, buttonElement, rest['inactiveButtonClass']);
}



function enableValidation({ formSelector, ...rest }) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);

    })
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-invalid',
});