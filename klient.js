// xhr.open(method, URL, [async, user, password]);

// Этот метод обычно вызывается сразу после new XMLHttpRequest. В него передаются основные параметры запроса:

// method – HTTP-метод. Обычно это "GET" или "POST".
// URL – URL, куда отправляется запрос: строка, может быть и объект URL.
// async – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
// user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

var XMLHttpRequest = require('xhr2');

function Request(url, answer) {
  //console.log(answer);
  answer = JSON.parse(answer);

  switch(url) {
    case '/user':
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("user_id = " + answer.user.userId);
      console.log("фамилия = " + answer.user.lastName);
      console.log("имя = " + answer.user.firstName);
      console.log("отчество = " + answer.user.patronymic);
      console.log("никнейм = " + answer.user.nickname);
      console.log("пароль = " + answer.user.password);
      console.log("почта = " + answer.user.eMail);
      console.log("телефон = " + answer.user.phone);
      console.log("адрес = " + answer.user.addressId);
      break;

    case '/pets_list':
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      // цикл
      let i = 0;
      console.log("pets_id = " + answer.pets[i].petId);
      console.log("имя питомца = " + answer.pets[i].pet_name);
      if (answer.pets[i].pet_gender === 'm')
        console.log("пол питомца = мужской");
      else
        console.log("пол питомца = женский");
      console.log("порода = " + answer.pets[i].breed_id);
      console.log("дата рождения питомца = " + answer.pets[i].pet_date_of_birth);
      console.log("вес питомца = " + answer.pets[i].pet_weight);
      console.log("фото = " + answer.pets[i].photos);
      console.log("документы = " + answer.pets[i].documents);
      break;

    case '/autho':
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("user_id = " + answer.user_id);
      break;

    case '/registr':
      break;

    default:
      console.log("Def");
      console.log("url = " + url);
      //console.log(answer);
      break;
  }
}

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
      Request(url, xhr.response);
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
let id = 2; // Саша = 2, Ира = 3
let us_log = "ikutuzova@gmail.com"; //"Dribla.com" //"ikutuzova@gmail.com"
let us_pass = "Ira"; //"1234" //"Ira" 

let url = "/pets_list";

switch(url) {
  case '/user':
    json = JSON.stringify({
      userId : id
    });
    method = "POST";
    break;

  case '/pets_list':
    json = JSON.stringify({
      user_id : id
    });
    method = "POST";
    break;

  case '/autho':
    json = JSON.stringify({
      login: us_log,
      password: us_pass
    });
    method = "POST";
    break;

  case '/registr':
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
   /*
   согласие обрабатывается у нас
        (отправка только true, при false кнопка отправки неактивна)*/
    break;

  case '/pet_lk':
    json = JSON.stringify({
      pet_id : id
    });
    method = "GET";
    url = "/pet_lk";
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
      pet_gender : "", //число - 0 (м), 1 (ж)
      Порода_id : "", //число - id породы breed_id
      pet_date_of_birth : "", //date
      pet_weight : "", //число
      photo : "", //фото
      documents : "" //документы
    });
    method = "POST";
    url = "/add_pet";
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
