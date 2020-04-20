import onError from './onError.js';

export default class Api {
    constructor(server, authorizationToken) {
        this.server = server;
        this.authorizationToken = authorizationToken;
    }

    /* REVIEW. Надо исправить. Общее замечание по всем методам Api. Методы Api должны только возвращать
    результат работы с сервером (в виде промиса, который  так же может обработься в методе then ), а обработка
    этих методов и вывод ошибок должен происходить с помощью имеющихся или откорректированных методов других классов
    в script.js, то есть структура методов Api должна быть такой:
    methodApi() {
    return fetch('url', {
        ...
      })
      .then(res => {
          if(res.ok) return res.json();
          return Promise.reject(res.status);
      })
    }  - на этом метод должен заканчиваться.
    */

    getDefaultUserInfo() {
        return fetch(this.server, {
            headers: {
                authorization: this.authorizationToken
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }


    uploadUserInfo(name, info) {
        this.name = name;
        this.info = info;

        return fetch(this.server, {
            method: 'PATCH',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                about: this.info
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            });
    }


    getInitialCards() {
        return fetch(this.server, {
            headers: {
                authorization: this.authorizationToken
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
            .then((cards) => {
                return cards;
            });
    }


    uploadNewCard(title, link) {
        this.title = title;
        this.link = link;

        return fetch(this.server, {
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ name: this.title, link: this.link })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }

    removeCard(cardId) {
        this.cardId = cardId;

        return fetch(this.server + this.cardId, {
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`error: ${res.status}`);
                }
            });
    }
    //////////////

    addLike(cardId) {
        this.cardId = cardId;

        return fetch(this.server + 'like/' + this.cardId, {
            method: 'PUT',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }
    
    removeLike(cardId) {
        this.cardId = cardId;

        return fetch(this.server + 'like/' + this.cardId, {
            method: 'DELETE',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }


    changeAvatar(link) {
        this.link = link;

        return fetch(this.server + '/avatar', {          
            method: 'PATCH',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: this.link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            });
    }


}