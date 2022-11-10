export class Card {
  constructor(dataCat, selectorTemplate) {
    this._dataCat = dataCat;
    this._selectorTemplate = selectorTemplate;
  }

  _getTempate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card");
  }

  getElement() {
    this.element = this._getTempate().cloneNode(true);
    const cardTitle = this.element.querySelector(".card-name");
    const cardImage = this.element.querySelector(".card-image");
    const cardLike = this.element.querySelector(".card-like")

    if(!this._dataCat.favourite) {
      cardLike.remove()
    }

    cardTitle.textContent = this._dataCat.name;
    cardImage.src = this._dataCat.img_link;

    return this.element;
  }
}




