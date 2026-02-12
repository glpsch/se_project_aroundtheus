"use strict";

export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = avatarSelector
      ? document.querySelector(avatarSelector)
      : null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    if (this._avatarElement) {
      this._avatarElement.style.backgroundImage = `url(${avatar})`;
    }
  }
}
