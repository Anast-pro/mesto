export default class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userMainInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        const userData = {
            name: this._userName.textContent,
            info: this._userMainInfo.textContent
        }
        return userData;
    }

    setUserInfo(info) {
        this._userName.textContent = info.name;
        this._userMainInfo.textContent = info.userMainInfo;
    }
}