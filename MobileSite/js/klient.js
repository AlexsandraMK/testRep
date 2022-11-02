// xhr.open(method, URL, [async, user, password]);

// Этот метод обычно вызывается сразу после new XMLHttpRequest. В него передаются основные параметры запроса:

// method – HTTP-метод. Обычно это "GET" или "POST".
// URL – URL, куда отправляется запрос: строка, может быть и объект URL.
// async – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
// user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

//var XMLHttpRequest = require('xhr2');

// функция, расшифровывающая ответ на запрос поданного url
function Request(url, answer) {
  //console.log(answer);
  answer = JSON.parse(answer);

  switch(url) {
    case '/user':
      //console.log(answer);
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("фамилия = " + answer.object.user.last_name);
      console.log("имя = " + answer.object.user.first_name);
      console.log("отчество = " + answer.object.user.patronymic);
      console.log("никнейм = " + answer.object.user.nickname);
      console.log("пароль = " + answer.object.user.password);
      console.log("почта = " + answer.object.user.e_mail);
      console.log("телефон = " + answer.object.user.phone);
      console.log("адрес = " + answer.object.user.address_id);
      
      /*if (answer.if_pet_exist == "true"){
        url = "/pets_list";
        console.log("IN IF");
        let xhr1 = new XMLHttpRequest();
        prepareRequest(url);
        chooseRequest(xhr1, method, url, json, get_param);
      }*/

      break;

    case '/pet':
      //console.log(answer);
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("user_id = " + answer.object.user_id);
      console.log("pet_id = " + pet_id);
      console.log("имя питомца = " + answer.object.pet_name);
      if (answer.object.pet_gender === 1)
          console.log("пол питомца = мужской");
        else
          console.log("пол питомца = женский");
      console.log("порода питомца = " + answer.object.breed_id);
      console.log("дата рождения питомца = " + answer.object.pet_date_of_birth);
      console.log("возраст питомца = " + answer.object.pet_age);
      console.log("вес питомца = " + answer.object.pet_weight);
      console.log("фото питомца = " + answer.object.photos);
      console.log("документы питомца = " + answer.object.documents);
      break;

    case '/pets_list':
      //console.log(answer);
      //console.log("статус = " + answer.status);
      //console.log("сообщение = " + answer.message);
      //console.log("время запроса = " + answer.time);
      // цикл по всем питомцам хозяина




      //console.log("Хозяин питомца : " + user_id);
      //console.log("Количество питомцев : " + answer.object.length);
      for(let i = 0; i < answer.object.length; i++){
        //console.log("Питомец №" + (i + 1));
        //writeOnHtmlPagePetsList(user_id, answer.object[i].pet_name, answer.object[i].pet_age, answer.object[i].breed_id, answer.object[i].photo, i);
        //console.log("имя питомца = " + answer.object[i].pet_name);
        if (answer.object[i].pet_gender === 1)
          console.log("пол питомца = мужской");
        else
          console.log("пол питомца = женский");
        console.log("порода = " + answer.object[i].breed_id);
        console.log("возраст питомца = " + answer.object[i].pet_age);
        console.log("фото = " + answer.object[i].photo);
      }

      break;

    case '/autho':
      //console.log(answer);
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("user_id = " + answer.object.user_id);
      break;

    case '/registr':
      break;

    default:
      console.log("Def");
      console.log("url = " + url);
      console.log(answer);
      break;
  }
}

// функция, отправляющая запрос на поданный url
function chooseRequest(xhr, method, url, json_body, get_param) {
  xhr.open(method, 'http://26.109.231.110:8080' + url + get_param, false); //Белый сервак:194.87.95.63 Сашин:26.109.231.110
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
   xhr.send(json_body); //отправка тела запроса
  console.log("3")

  console.log("2")
  xhr.onload = function() {
    if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
      //console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    } else { // если всё прошло гладко, выводим результат
      //console.log(`Готово, получили ${xhr.response}`);
      Request(url, xhr.response);
    console.log("1")
    }
  };
  
   xhr.onerror = function() {
    console.log("Запрос не удался");
  };



  return xhr.response;
}

let json = null;
let user_id = 1; // Саша = , Ира = 1
let pet_id = 2; // Попугай = 1, собака = 2 
let us_log = "ikutuzova@gmail.com"; //"Dribla.com" //"ikutuzova@gmail.com"
let us_pass = "Ira"; //"1234" //"Ira" 

//let url = "/breeds_list";
let get_param = "";
let pet_exist = false;

function prepareRequest(url, object){

    let preparingRequest =
    {
        method: "",
        get_param: "",
        json: ""
    }

    // свитч, подготавливающий данные на запрос определенного url
  switch(url) {
    case '/breed/help':
      // запрос-хелпер какие параметры мы подаем на вход
      //url = url + '/help';
      preparingRequest.method = "GET";
      break;

    case '/user':
      preparingRequest.get_param = "?user_id=" + user_id;
      preparingRequest.method = "GET";
      break;

    case '/pets_list':
      preparingRequest.get_param = "?user_id=" + object.user_id;
      preparingRequest.method = "GET";
      break;

    case '/autho':
      preparingRequest.json = JSON.stringify({
        login: us_log,
        password: us_pass
      });
      preparingRequest.method = "POST";
      break;

    case '/registr':
      preparingRequest.json = JSON.stringify({
        first_name : "Ирина",
        last_name : "Кутузова",
        patronymic : "Александровна",
        nickname : "SunriseDagger",
        e_mail : "ikutuzova@gmail.com",
        phone : "888888888",
        password : "Ira",
        address_id : "" // адрес_id из другой таблицы
      });
      preparingRequst.method = "POST";
    /*
    согласие обрабатывается у нас
          (отправка только true, при false кнопка отправки неактивна)*/
      break;

    case '/pet':
      preparingRequest.get_param = "?pet_id=" + pet_id;
      preparingRequest.method = "GET";
      break;

    case '/add_pet':
      preparingRequest.json = JSON.stringify({
        user_id : object.user_id,
        pet_name : object.name, //строка
        pet_gender : object.gender, //число - 1 (м), 2 (ж)
        breed_id : object.breed_id, //число - id породы breed_id
        pet_date_of_birth : object.date_of_birth, //date
        pet_weight : object.weight, //число
        photos : object.photo, //фото
        documents : object.documents //документы
        });
      preparingRequest.method = "POST";
      break;

    case '/breeds_list':
      preparingRequest.method = "GET";
      break;

    default:


      break;
  }

  return preparingRequest

}

export function createRequest(url, object)
{
    let xhr = new XMLHttpRequest(); // у конструктора нет аргументов
    let request = prepareRequest(url, object);
    let answer = chooseRequest(xhr, request.method, url, request.json, request.get_param);
    return answer;
}



/*for(let ii = 0; ii < 1; ii++){
  prepareRequest(url1[ii]);
  chooseRequest(method, url1[ii], json, get_param);
}*/

//chooseRequest(method, url, json, get_param);

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
