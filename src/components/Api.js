export default class Api {
  constructor({ baseUrl, headers, onError }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._onError = onError ?? ((err) => console.error(err));
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(path, options = {}) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: { ...this._headers, ...(options.headers || {}) },
      ...options,
    })
      .then(this._handleResponse)
      .catch((err) => {
        this._onError(err);
        return Promise.reject(err);
      });
  }

  // User

  getUserInfo() {
    return this._request("/users/me");
  }

  updateUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  // Cards

  getInitialCards() {
    return this._request("/cards");
  }

  createCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  changeLikeStatus(cardId, shouldLike) {
    return this._request(`/cards/${cardId}/likes`, {
      method: shouldLike ? "PUT" : "DELETE",
    });
  }
}
