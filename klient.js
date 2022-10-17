// xhr.open(method, URL, [async, user, password]);

// Этот метод обычно вызывается сразу после new XMLHttpRequest. В него передаются основные параметры запроса:

// method – HTTP-метод. Обычно это "GET" или "POST".
// URL – URL, куда отправляется запрос: строка, может быть и объект URL.
// async – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
// user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

var XMLHttpRequest = require('xhr2');
let answer = "";

function chooseRequest(method, url, json_body) {
  let xhr = new XMLHttpRequest(); // у конструктора нет аргументов
  xhr.open(method, 'http://26.109.231.110:8080' + url);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  
  xhr.send(json_body); //отправка тела запроса

  xhr.onload = function() {
    if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
      console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    } else { // если всё прошло гладко, выводим результат
      console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
      console.log(`Готово, получили ${xhr.response}`);
      /*answer = xhr.response;
      answer = JSON.parse(answer);
      console.log(answer.user.nickname);*/
    }
  };
  
  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      console.log(`В прогрессе: Получено ${event.loaded} из ${event.total} байт`);
    } else {
      console.log(`В прогрессе: Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    }
  
  };
  
  xhr.onerror = function() {
    console.log("Запрос не удался");
  };
}

let json = null;
let id = 2;
let us_log = "ikutuzova@gmail.com"; //"Dribla.com" //"SunriseDagger"
let us_pass = "Ira"; //"1234" //"Ira" 

let m = "autho";

switch(m) {
  case 'user':
    json = JSON.stringify({
      userId : id
    });
    method = "POST";
    url = "/user";
    break;

  case 'pets_list':
    json = JSON.stringify({
      user_id : id
    });
    method = "GET";
    url = "/pets_list";
    break;

  case 'autho':
    json = JSON.stringify({
      login: us_log,
      password: us_pass
    });
    method = "POST";
    url = "/autho";
    break;

  case 'registr':
    json = JSON.stringify({
      user_first_name : "Ирина",
      user_last_name : "Кутузова",
      patronymic : "Александровна",
      nickname : "SunriseDagger",
      e_mail : "ikutuzova@gmail.com",
      phone : "888888888",
      password : "Ira",
      address : "" // адрес_id из другой таблицы
    });
    method = "POST";
    url = "/registr";
   /*
   согласие обрабатывается у нас
        (отправка только true, при false кнопка отправки неактивна)*/
    break;

  default:
    break;
}

chooseRequest(method, url, json);

/*
switch(m) {
  case 'add_pet':
    json = JSON.stringify({
      pet_name : "", //строка
      pet_gender : "", //bool - true (ж), false (м)
      Порода_id : "", //число - id породы
      pet_date_of_birth : "", //date
      pet_weight : "", //число
      photo : "", //фото
      documents : "" //документы
    });
    method = "POST";
    url = "/add_pet";
    break;

  case 'pet_lk':
    json = JSON.stringify({
      pet_id : id
    });
    method = "GET";
    url = "/pet_lk";
    break;

  case 'feed':
    json = JSON.stringify({
      название_корма : ""
    });
    method = "GET";
    url = "/feed";
    break;

  case 'care_tips':
    json = JSON.stringify({
      совет_id : ""
    });
    method = "GET";
    url = "/care_tips";
        break;

  default:
    break;
}
*/
