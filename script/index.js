const cardsContainer = document.querySelector(".cards__cat");
const btnOpenPopupForm = document.querySelector("#addbtn");
const formCatAdd = document.querySelector("#popup-form-cat");

function serializeForm(elements) {
  const formData = {};

  elements.forEach((input) => {
    if (input.type === "submit") return;

    if (input.type !== "checkbox") {
      formData[input.name] = input.value;
    }

    if (input.type === "checkbox") {
      formData[input.name] = input.checked;
    }
  });

  return formData;
}

function handleFormAddCat(e) {
  e.preventDefault();
  const elementsFormCat = [...formCatAdd.elements];
  const dataFromForm = serializeForm(elementsFormCat);

  const cardInstance = new Card(dataFromForm, "#card-template");
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
}

allCat.forEach((catData) => {
  const cardInstance = new Card(catData, "#card-template");
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);

  popupAddCat.close();
});

const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();

btnOpenPopupForm.addEventListener("click", () => popupAddCat.open());
formCatAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
});
