export default class FormValidator {
    constructor(settings, element) {
        this._settings = settings;
        this._element = element;
        this._buttonElement = document.querySelector(this._settings.submitButtonSelector);
    }

    _showError() {
        const errorElement = document.querySelector(`#${this._element.id}-error`);
        errorElement.textContent = this._element.validationMessage;
        this._element.classList.add(this._settings.inputErrorClass);
    }

    _hideError() {
        const errorElement = document.querySelector(`#${this._element.id}-error`);
        errorElement.textContent = "";
        this._element.classList.remove(this._settings.inputErrorClass);
    }

    _checkInputValidity() {
        if (this._element.checkValidity()) {
            this._hideError();
        } else {
            this._showError();
        }
    }

    _toggleButtonState() {
        if (this._element.checkValidity()) {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        } else {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
    }
    _setEventListeners() {
        this._element.addEventListener('input', () => {
            this._checkInputValidity();
            this._toggleButtonState();
        });

        this._toggleButtonState();
    }


    enableValidation() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}