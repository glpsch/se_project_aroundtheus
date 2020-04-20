
export default class UserInfo {
  constructor(name, info, popupProfile, userNameInput, userInfoInput, defaultName, defaultInfo) {
    this.popup = popupProfile;
    this.name = name;
    this.info = info;

    this.userNameInput = userNameInput;
    this.userInfoInput = userInfoInput;
    this.defaultName = defaultName;
    this.defaultInfo = defaultInfo;
  }

  setUserInfo(name, info) {
    this.name = name;
    this.info = info;
  }
  
  updateUserInfo() {
    this.defaultName.textContent = this.name;
    this.defaultInfo.textContent = this.info;
    this.userNameInput.value = this.defaultName.textContent;
    this.userInfoInput.value = this.defaultInfo.textContent;
    }
}