const cardsContainer = document.querySelector(".cards__cat");
const btnOpenPopupForm = document.querySelector("#add");

allCat.forEach((catData) => {
  const cardInstance = new Card(catData, "#card-template");
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
});

const popupAddCat = new Popup("popup-add-cats");

//popupAddCat.open()

console.log(popupAddCat);
