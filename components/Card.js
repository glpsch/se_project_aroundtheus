export default class Card {
    constructor(data, cardSelector, handleImageClick) {
      this._name = data.name;
      this._link = data.link;
      this._template = cardSelector;
      this._handleImageClick = handleImageClick;
      this.isLiked = false;
    }
  
    _getTemplate() {
      return this._template.content.querySelector('.place-card').cloneNode(true);
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardImageElement = this._element.querySelector('.place-card__image');
      this._cardImageElement.style.backgroundImage = `url(${this._link})`;
      this._element.querySelector('.place-card__name').textContent = this._name;    
      this._setEventListeners();
      return this._element;
    }
    
    _handleLike() {
      this.isLiked = !this.isLiked;
      const likeButton = this._element.querySelector('.place-card__like-icon');
      likeButton.classList.toggle('place-card__like-icon_liked');
    }
    
    _handleDelete() {
      this._element.remove();
    }
    
    _setEventListeners() {    
        this._cardImageElement.addEventListener('click', () => {
        this._handleImageClick(this);
      });    
      
      const likeButton = this._element.querySelector('.place-card__like-icon');
      likeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        this._handleLike();
      });
      
      const deleteButton = this._element.querySelector('.place-card__delete-icon');
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        this._handleDelete();
      });
    }
  }