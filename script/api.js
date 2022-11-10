/* ==========================================================
Ссылки для fetch-запросов

<name> - ваше уникальное имя (строчные латинские буквы).
<id кота> - порядковый номер кота в базе данных (число).

GET - получить информацию обо всех котах
https://sb-cats.herokuapp.com/api/2/<name>/show

GET - получить массив всех существующих id
https://sb-cats.herokuapp.com/api/2/<name>/ids

GET - получить информацию об одном котике по id
https://sb-cats.herokuapp.com/api/2/<name>/show/<id кота>


POST - добавить нового кота (id, name - обязательно!)    
https://sb-cats.herokuapp.com/api/2/<name>/add

PUT - изменить информацию о коте (запрещено менять id и name)
https://sb-cats.herokuapp.com/api/2/<name>/update/<id кота>

DELETE - удалить кота
https://sb-cats.herokuapp.com/api/2/<name>/delete/<id кота>
====================================================================
*/

const CONFIG_API = {
  url: 'https://sb-cats.herokuapp.com/api/2/Axonick',
  header: {
    'Content-type': 'application/json',
  },
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _onResponce(res) {
    return res.ok
      ? res.json()
      : Promise.reject({ ...res, message: 'Ошибка на стороне сервера' });
  }

  getAllCats() {
    return fetch(`${this._url}/show`, {
      method: 'GET',
    }).then(this._onResponce);
  }
  addNewCat(data) {
    return fetch(`${this._url}/add`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this._onResponce);
  }

  updateCatById(idCat, data) {
    fetch(`${this._url}/update/${idCat}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this._headers,
    });
  }

  getCatById(idCat) {
    fetch(`${this._url}/show/${idCat}`, {
      method: 'GET',
    });
  }

  deleteCatById(idCat) {
    fetch(`${this._url}/delete/${idCat}`, {
      method: 'DELETE',
    });
  }
}

export const api = new Api(CONFIG_API);
