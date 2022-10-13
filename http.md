Написание правил взаимодействия клиент-сервера
Написание правил взаимодействия клиент-сервера включает в себя

•	определение типа взаимодействия
•	определение данных, которые передаются от клиента к серверу или наоборот
•	определение запросов(название) # https://gitlab.com/AlexsandraMK/ mobile_app/-/issues/new
•	и еще какие там понадобятся

Ты смотришь на Машины шаблоны. Определяешь запросы которые клиент посылает серверу. Они должны быть в формате:
путь (название запроса, пример /getPets),
тип запроса (Get/Post и т.д.)
входные/выходные данные (тип данных (примерно: число(целое/вещественное), строка, логические данные(true/false)) и 
    названия (например хочешь имя пользователя пишешь nameUser))


Название - /login
Метод - POST
Входные данные:
Название - login, Тип - string, Описание - логин/телефон
Название - password, Тип - string, Описание - пароль
Выходные данные:
Название - isLogin, Тип - число, Описание - получилось ли авторизоваться (0 - да, 1 - неправильный логин, 2 - неправильный пароль)

Вот для каждой главных страниц напиши правила. Авторизация, Регистрация, Профиль, Список, Создание питомца, Профиль питомца

Для разграничения действий с ресурсами на уровне HTTP-методов и были придуманы следующие варианты:
GET — получение ресурса (html-запрос) 
    - запрос содержимого указанного ресурса
POST — создание ресурса (html-запрос) 
    - передача пользовательских данных заданому ресурсу
PUT — обновление ресурса (к серверу напрямую)
DELETE — удаление ресурса (к серверу напрямую)

------------------------------
Авторизация/post
-email/телефон*
-пароль*

Название - /authorization /autho
Метод - POST
Входные данные:
    *Название - login, Тип - string, Описание - e-mail/телефон
    *Название - password, Тип - string, Описание - пароль

Выходные данные:
    Название - user_id, Тип - число, Описание - id пользователя
    
    >=0 - да
    {
            + запись данных в локальный файл:
    Название - user_first_name, тип - строка, описание - имя
    Название - user_last_name, тип - строка, описание - фамилия
    Название - nickname, тип - строка, описание - никнейм пользователя
    Название - password, тип - строка, описание - пароль
    Название - e_mail, тип - строка, описание - e-mail пользователя
    Название - phone, тип - строка, описание - телефон пользователя
    Название - adress, тип - строка, описание - данные из адрес_id
    }

    -1 - нет, ошибка логина
    -2 - нет, ошибка пароля

------------------------------

------------------------------
Регистрация:/post
-ФИО*
-никнейм*
-email*
-телефон
-пароль*
-адрес проживания
-switch on на я согласен с пользовательским соглашением*

Название - /registration /registr
Метод - POST
Входные данные:  
    *Название - user_first_name, тип - строка, описание - имя
    *Название - user_last_name, тип - строка, описание - фамилия
    *Название - nickname, тип - строка, описание - никнейм пользователя
    *Название - e_mail, тип - строка, описание - e-mail пользователя
    *Название - phone, тип - строка, описание - телефон пользователя
    *Название - password, тип - строка, описание - пароль (+зашифровка)
    *Название - adress, тип - массив, описание - адрес_id
    
    /** Вопрос от Саши **/
    
    Зачем нам отправлять согласие на сервер. Это обрабатывается у клиента.

    *Название - soglasie, тип - bool, описание - согласие на обработку персональных данных 
        (отправка только true, при false кнопка отправки неактивна)

    /** Закрытие вопроса **/ 

Выходные данные:
    *Название - if_user_reg_success, Тип - число, Описание - получилась ли регистрация:
    1 - 0, если получилась -> переход на страницу авторизации
    2 - 1, если что-то не заполнено или такой логин/телефон уже используется в системе
    {
        Саша отправит текст ошибки
    }
------------------------------

------------------------------
Профиль пользователя:/get
-никнейм*
-ФИО*
-совет дня (текст) (если включен)
-список питомцев (имя, порода, пол, возраст) - если питомцы есть

Название - /user
Метод - GET
Входные данные:
    *Название - user_id, тип - число, описание - id пользователя (данный параметр ты получила с окна авторизации)

Выходные данные:  
    *Название - nickname, тип - строка, описание - никнейм пользователя
    *Название - user_first_name, тип - строка, описание - имя
    *Название - user_last_name, тип - строка, описание - фамилия

/** Исправляла Саша **/

    *Название - if_pet_exist, Тип - число, Описание - есть ли питомцы:
    1 - 0, если есть -> загрузка "список питомцев" 
    
    {
        *Название - pet_name, тип - строка, описание - имя питомца
        *Название - pet_gender, тип - bool, описание - пол питомца
        *Название - pet_breed, тип - строка, описание - порода
        *Название - pet_age, тип - число, описание - возраст
    }
    2 - 1, если нет

    Описание совета:
    {
        *Название - advice_name, тип строка, описание - название совета,
        *Название - advice_text, тип строка, описание - текст совета
    }



/**Конец Исправляла Саша **/    

------------------------------

------------------------------
    Настройки-личные данные у нас хранятся, если чел авторизован и не 
    берутся из бд при каждом заходе в настройки (хранятся в локальном файле)
    При выходе из системы файл стирается, если его нет - просят авторизацию

    Смена пароля:/post
    отправка нового пароля и его замена в локальном файле
------------------------------

------------------------------
Регистрация питомца:/post
-фото
-имя*
-дата рождения
-порода (/get запрос в реальном времени)
-масса
-пол (выбор из списка)*
-прикрепленные документы (паспорт)

Название - /add_pet
Метод - POST
Входные данные:  
    *Название - pet_name, тип - строка, описание - имя/кличка
    *Название - pet_gender, тип - bool, описание - пол питомца
    Название - breed, тип - строка, описание - порода питомца
    Название - pet_date_of_birth, тип - date, описание - день рождения питомца
    Название - pet_weight, тип - число, описание - масса питомца в кг
    Название - photo, тип - картинка, описание - фото питомца
    Название - documents, тип - файл, описание - паспорт и другие документы по питомцу

Выходные данные:
Название - if_pet_reg_success, Тип - число, Описание - получилась ли регистрация:
    1 - 0, если получилось -> переход на экран "список питомце"
    2 - 1, если что-то не заполнено или такой питомец у пользователя уже используется в системе
    {
        Саша отправит текст ошибки
    }
------------------------------

------------------------------
Главный экран питомца:/get
-имя
-порода
-вес
-дата рождения
-пол
-возраст
-документы
-фото

Название - /pet_lk
Метод - GET
Входные данные:
    Название - pet_id, тип - число, описание - id питомца

Выходные данные:  
    Название - pet_name, тип - строка, описание - имя/кличка
    Название - pet_gender, тип - bool, описание - пол питомца
    Название - breed, тип - строка, описание - порода питомца 
    Название - pet_date_of_birth, тип - date, описание - день рождения питомца
    Название - pet_weight, тип - число, описание - масса питомца в кг
    Название - photo, тип - картинка, описание - фото питомца
    Название - documents, тип - файл, описание - паспорт и другие документы по питомцу
    Название - pet_age, тип - число, описание - возраст питомца
------------------------------

------------------------------
Список питомцев:/get
-имя
-возраст
-порода
-фото

Название - /pets_list
Метод - GET
Входные данные:
    Название - user_id, тип - число, описание - id пользователя

Выходные данные:  
    Название - pet_name, тип - строка, описание - имя/кличка
    Название - breed, тип - строка, описание - по порода_id питомца поиск породы
    Название - photo, тип - картинка, описание - фото питомца
    Название - pet_age, тип - число, описание - возраст питомца
------------------------------

/** Комментарий от Саши **/ Остальное не делай


------------------------------
Ветклиники (карта):/get
-название
-открыто/закрыто
-адрес

Название - /clinics
Метод - GET
Входные данные:
    Название - адрес клиники, тип - строка, описание - адрес клиники

Выходные данные:  
    Название - Название, тип - строка, описание - название клиники
    Название - Работа, тип - bool, описание - открыто или закрыто по времени работы
    Название - Адрес, тип - строка, описание - адрес клиники
------------------------------

------------------------------
Медицинская информация:/get
медкарта питомца, сертификаты о вакцинации и рекомендации к обследованиям
------------------------------

------------------------------
Выбор корма:/get
три категории: все/сухой/влажный - get-запрос группы
    -фото корма
    -название корма
    -марка корма (нет на макете)
    -кбжу корма
    -рейтинг корма (нет на макете)

Название - /feeds
Метод - GET
Входные данные:
    Подача запроса по категории/поиску
    Название - категория, тип - строка, описание - сухой/влажный или все вместе
    или
    Название - "Название корма" или "Марка корма", тип - строка, описание - вбитое в поиск слово или словосочетание
Выходные данные:
    Название - Фото корма (нет в бд), тип - картинка, описание - фото корма
    Название - Название корма, тип - строка, описание - название корма
    Название - Марка корма, тип - строка, описание - марка корма
    Название - КБЖУ (нет в бд), тип - строка, описание - калории, белки, жиры и углеводы продукта на 100 гр
    Название - Рейтинг корма, тип - число, описание - рейтинг корма от 1 до 5 звезд
------------------------------

------------------------------
Определенный корм: /get
-название корма
-марка корма
-влажный/сухой
-описание: для котят/взрослых котов/пожилых котов, кастрированных/не кастрированных
-состав
-рейтинг
-порода
-ценовая категория
-кбжу на 100 гр
-фото
кнопка добавить - /post-запрос (добавление в избранное?)

Название - /feed
Метод - GET
Входные данные:
    Название - Название корма, тип - строка, описание - название корма

Выходные данные:
    Название - Категория (нет в бд), тип - строка, описание - сухой/влажный корм
    Название - Фото корма (нет в бд), тип - картинка, описание - фото корма
    Название - Описание корма, тип - строка, описание - описание корма
    Название - Марка корма (бренд), тип - строка, описание - марка корма
    Название - Состав, тип - строка, описание - состав корма
    Название - КБЖУ (нет в бд), тип - строка, описание - калории, белки, жиры и углеводы продукта на 100 гр
    Название - Рейтинг, тип - число, описание - рейтинг корма от 1 до 5 звезд
    Название - Порода, тип - число, описание - перечень пород из порода_id
    Название - Ценовая категория, тип - строка, описание - ценовая категория корма

Название - /feed_in_fav
Метод - POST
Входные данные:
    Название - Название корма, тип - строка, описание - название корма

Выходные данные:
    Добавление корма в избранные корма пользователя по user_id
------------------------------

------------------------------
Расчет рациона:/post-отправить данные 
(данные вводятся автоматически из профиля питомца)
-вес
-возраст
-пол
Рассчитать - отправка данных

Название - /diet
Метод - POST
(я не врубилась, как и что тут)

Выбор рациона из созданных/добавленных
Название - /diets_list
Метод - GET
Входные данные:
    Название - user_id корма, тип - строка, описание - пользователь

Выходные данные:
    Название - Тип рациона, тип - строка, описание - тип рациона
    Название - Временной промежуток, тип - строка, описание - промежуток времени действия рациона
------------------------------

------------------------------
Советы по уходу:/get
-фото
-название совета
(сам совет, автор?, дата?)
+ поиск по совету

Название - /care_tips
Метод - GET
Входные данные:
    Название - Совет_id, тип - число, описание - id нужного совета

Выходные данные:
    Название - Заголовок совета (нет в бд), тип - строка, описание - заголовок нужного совета
    Название - Фото совета (нет в бд), тип - картинка, описание - фото совета
    Название - Описание совета, тип - строка, описание - описание совета