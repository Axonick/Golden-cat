import { api } from './api.js';
import { Card } from './card.js';
import { Popup } from './popup.js';

const cardsContainer = document.querySelector('.cards__cat');
const btnOpenPopupForm = document.querySelector('#addbtn');
const btnPopupLogin = document.querySelector('#loginbtn');
const formAddCat = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

function serializeForm(elements) {
  const formData = {};
  elements.forEach((input) => {
    if (input.type === 'submit') return;
    if (input.type !== 'checkbox') {
      formData[input.name] = input.value;
    }
    if (input.type === 'checkbox') {
      formData[input.name] = input.checked;
    }
  });
  return formData;
}

const elementsFormCat = [...formAddCat.elements];

function createdCat(dataCat) {
  const cardInstance = new Card(dataCat, '#card-template');
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
}

function handleFormAddCat(e) {
  e.preventDefault();
  const elementsFormCat = [...formAddCat.elements];
  const dataFromForm = serializeForm(elementsFormCat);

  api.addNewCat(dataFromForm).then(() => {
    createdCat(dataFromForm);
    updateLocalStrg(dataFromForm, { type: 'ADD_CAT' });
    popupAddCat.close();
  });
}

function handleFormLogin(e) {
  e.preventDefault();
  const elementsFormCat = [...formLogin.elements];
  const dataFromForm = serializeForm(elementsFormCat);
  Cookies.set('email', `email=${dataFromForm.email}`);
  btnOpenPopupForm.classList.remove('visually-hidden');
  popupLogin.close();
}

function setDataRefreshing(minutes) {
  const setTimer = new Date(new Date().getTime() + minutes * 60000);
  localStorage.setItem('catsRefreshing', setTimer);
  return setTimer;
}

function checkLocalStorage() {
  const localData = JSON.parse(localStorage.getItem('allCat'));
  const getTimeExpires = localStorage.getItem('catsRefreshing');

  if (localData && localData.length && new Date() < new Date(getTimeExpires)) {
    localData.forEach(function (dataCat) {
      createdCat(dataCat);
    });
  } else {
    api.getAllCats().then(({ data }) => {
      data.forEach(function (dataCat) {
        createdCat(dataCat);
      });
      updateLocalStrg(data, { type: 'ALL_CAT' });
    });
  }
}

function updateLocalStrg(data, variant) {
  const oldStorages = JSON.parse(localStorage.getItem('allCat'));

  switch (variant.type) {
    case 'ADD_CAT':
      oldStorages.push(data);
      localStorage.setItem('allCat', JSON.stringify(oldStorages));
      return;
    case 'ALL_CAT':
      localStorage.setItem('allCat', JSON.stringify(data));
      setDataRefreshing(5);
      return;
    case 'DELETE_CAT':
      const newStorages = oldStorages.filter((cat) => cat.id !== data.id);
      localStorage.setItem('allCat', JSON.stringify(newStorages));
      return;
    default:
      break;
  }
}
checkLocalStorage();

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
btnPopupLogin.addEventListener('click', () => popupLogin.open());
formAddCat.addEventListener('submit', handleFormAddCat);
formLogin.addEventListener('submit', handleFormLogin);

const isAutorization = Cookies.get('email');

if (!isAutorization) {
  popupLogin.open();
  btnOpenPopupForm.classList.add('visually-hidden');
}

//document.cookie = 'email=123email@.ru;samesite=strict;max-age=360';
//document.cookie = 'name=Витя.ru;samesite=strict;max-age=360';

//Cookies.set('password', '22232');
//Cookies.remove('password');

//console.log(Cookies.get('password'));

//localStorage.setItem('name', JSON.stringify({ name: 'Витя' }));
//localStorage.setItem('lastname', JSON.stringify('nam'));

//localStorage.clear();

console.log('Roman');
