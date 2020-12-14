export default class UserInfo {
    constructor(userNameSelector, userInfoSelector, avatarSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userMainInfo = document.querySelector(userInfoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userData = {
            name: this._userName.textContent,
            info: this._userMainInfo.textContent,
            avatar: this._avatar.src
        }
        return userData;
    }

    setUserInfo(info) {
        this._userName.textContent = info.name;
        this._userMainInfo.textContent = info.userMainInfo;
        this._avatar.src = info.avatar;
    }
}