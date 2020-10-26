'use strict';

(function () {
  const HOUSING_TYPES_VOCABULARY = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  let createCard = function (data) {
    const cardBox = cardTemplate.cloneNode(true);

    cardBox.querySelector(`.popup__title`).textContent = data.offer.title;
    cardBox.querySelector(`.popup__text--address`).textContent = data.offer.address;
    cardBox.querySelector(`.popup__text--price`).textContent = `${data.offer.price} ₽/ночь`;
    cardBox.querySelector(`.popup__type`).textContent = HOUSING_TYPES_VOCABULARY[data.offer.type];
    cardBox.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    cardBox.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
    cardBox.querySelector(`.popup__description`).textContent = data.offer.description;
    cardBox.querySelector(`.popup__avatar`).src = data.author.avatar;

    let cardFeatures = cardBox.querySelector(`.popup__features`).children;
    for (let i = cardFeatures.length - 1; i >= 0; i--) {
      let check = [];
      for (let j = data.offer.features.length - 1; j >= 0; j--) {
        check[j] = cardFeatures[i].classList.contains(`popup__feature--${data.offer.features[j]}`);
      }
      if (!check.includes(true)) {
        cardFeatures[i].remove();
      }
    }


    const cardPhotos = cardBox.querySelector(`.popup__photos`);
    const cardPhotoImage = cardPhotos.querySelector(`.popup__photo`);
    for (let i = 1; i < data.offer.photos.length; i++) {
      cardPhotos.appendChild(cardPhotoImage.cloneNode());
    }

    let cardPhotosChildren = cardPhotos.children;
    for (let i = 0; i < cardPhotosChildren.length; i++) {
      cardPhotosChildren[i].src = data.offer.photos[i];
    }

    return cardBox;
  };

  let cardPopup;
  let popupCloseButton;

  let renderCard = function (data) {
    const fragmentCard = document.createDocumentFragment();
    cardPopup = createCard(data);
    fragmentCard.appendChild(cardPopup);
    popupCloseButton = cardPopup.querySelector(`.popup__close`);
    map.insertBefore(fragmentCard, mapFiltersContainer);
  };

  window.card = {
    cardPopup,
    popupCloseButton,
    renderCard
  };
})();
