# Module #6 Работа с асинхронным кодом. Fetch API

## Материалы из учебника:

13. [Модули](https://learn.javascript.ru/modules)  
    13.3 [Динамические импорты](https://learn.javascript.ru/modules-dynamic-imports)  

11. [Промисы, async/await](https://learn.javascript.ru/async)  
    11.1 [Введение: колбэки](https://learn.javascript.ru/callbacks)  
    11.2 [Промисы](https://learn.javascript.ru/promise-basics)  
    11.3 [Цепочка промисов](https://learn.javascript.ru/promise-chaining)  
    11.4 [Промисы: обработка ошибок](https://learn.javascript.ru/promise-error-handling)  
    11.5 [Promise API](https://learn.javascript.ru/promise-api)  
    11.6 [Промисификация](https://learn.javascript.ru/promisify)  
    11.7 [Микрозадачи](https://learn.javascript.ru/microtask-queue)  
    11.8 [Async/await](https://learn.javascript.ru/async-await)  

3. [Сетевые запросы](https://learn.javascript.ru/network)  
    3.1 [Fetch](https://learn.javascript.ru/fetch)  
    3.2 [FormData](https://learn.javascript.ru/formdata)  
    3.3 [Fetch: ход загрузки](https://learn.javascript.ru/fetch-progress)  
    3.4 [Fetch: прерывание запроса](https://learn.javascript.ru/fetch-abort)  
    3.5 [Fetch: запросы на другие сайты](https://learn.javascript.ru/fetch-crossorigin)  

6. [Разное](https://learn.javascript.ru/ui-misc)  
    6.3 [Событийный цикл: микрозадачи и макрозадачи](https://learn.javascript.ru/event-loop)  
        
## Задачи: 

* [SortableTable компонент](https://glitch.com/edit/#!/sortable-dynamic-table) с динамической подгрузкой данных

**Пояснение к заданию:**  

Необходимо добавить функционал подгрузки данных в компонент "SortableTable" из предыдущего "module-5"
Сортировка таблицы должна происходить на сервере, или другими словами, при клике на хедер таблицы 
должен отправляться запрос на бекенд с параметрами сортировки. 
Данные с сервера вернутся в отсортированном порядке, после чего таблицу необходимо обновить новыми данными.

**Обратите внимание:**
Данная таблица используется на различных страницах проекта, поэтому необходимо предусмотреть
возможность подружать данные с различных ресурсов.

**Запросы на сервер:**
Все параметры и API для получения данных можно получить на демо версии проекта [http://course-js.javascript.ru/](http://course-js.javascript.ru/)
проинспектировав "сетевые запросы" (в "Google Chrome" это вкладка "Network" в консоле разработчика)
Или можете воспользоваться коллекцией запросов для Postman:

* Ссылка на на [Postman](https://www.postman.com/) 
* Сылка на [коллекцию](https://www.getpostman.com/collections/dab8883d8bcf22395942)

Также необходимо предусмотреть в таблице:
* индикатор загрузки
* при условии если сервер вернул пустой массив данных - показать пользователю сообщение о тома что 
по заданному критерю запроса данные отсутствуют

Добавить к компоненту тесты.

* [RangePicker компонент](https://glitch.com/edit/#!/rangepicker-component-lizard-plantain)

**Пояснение к заданию:**  

Необходимо создать компонент "RangePicker" к-й будет позволять выбрать диапазон дат в соответствии с 
которым будут отображаться данные в других компонентах проекта (связь с другими компонентами будет реализована позднее)

По клику на input "RangePicker" необходимо показывать календарь с возможностью выбрать диапазон дат
в рамках 2х месяцев (см. демо).

При выборе диапазона дат - соответствующие значения начала диапазона и конца должны быть подставлены в input 

**Обратите внимание:**

Для выделения дат используйте подход "events-delegation".
При клике за пределами календаря необходимо его закрыть.

## Дополнительные материалы:

[jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock) - позволяет подменить реальный реквест на "фейковые" данные
