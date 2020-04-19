# Module #7 Работа с формами + fetch POST

## Материалы из учебника:

4. [Формы, элементы управления](https://learn.javascript.ru/forms-controls)  
    4.1 [Свойства и методы формы](https://learn.javascript.ru/form-elements)  
    4.2 [Фокусировка: focus/blur](https://learn.javascript.ru/focus-blur)  
    4.3 [События: change, input, cut, copy, paste](https://learn.javascript.ru/events-change-input)  
    4.4 [Отправка формы: событие и метод submit](https://learn.javascript.ru/forms-submit)  

3. [Сетевые запросы](https://learn.javascript.ru/network)  
    3.6 [Fetch API](https://learn.javascript.ru/fetch-api)  
    3.7 [Объекты URL](https://learn.javascript.ru/url)  
    3.8 Опционально: [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest)  
    3.9 [Возобновляемая загрузка файлов](https://learn.javascript.ru/resume-upload)   
    3.10 [Длинные опросы](https://learn.javascript.ru/long-polling)  

5. [Типы данных](https://learn.javascript.ru/data-types)  
    5.12 [Формат JSON, метод toJSON](http://learn.javascript.ru/json)  

6. [Продвинутая работа с функциями](https://learn.javascript.ru/advanced-functions)    
    6.8 Полностью: [Планирование: setTimeout и setInterval](https://learn.javascript.ru/settimeout-setinterval) (ранее рассмотрели в module-3)  
    
3. [Интерфейсные события](https://learn.javascript.ru/event-details)  
    3.5 Повторение: [Прокрутка](https://learn.javascript.ru/onscroll)  
    
## Задачи: 

* ["SortableTable" компонент](https://glitch.com/edit/#!/infinity-table-iassorted-gaudy-area) с динамической загрузкой 
данных с сервера и [infinity scroll](https://en.wiktionary.org/wiki/infinite_scroll) 

**Пояснение к заданию:**

Используя решение из предыдущего module-6 необходимо реализовать infinity scroll для порционной подгрузки данных.
Сортировка, как и прежде, может происходить как на "сервере" так и на "клиенте" - в зависимости от переданных опций.
Обратите внимание, если при скроле произошла подгрузка данных и контент занимает несколько экранов, то при сортировке
на "сервере" необходимо сбросить кол-во подгруженных элементов к значениям к-е были установлены при первой загрузке.

* ["ProductForm" компонент](https://glitch.com/edit/#!/product-form) - без возможности "Drag'n'Drop" загруженных изображений и отправки данных на сервер

**Пояснение к заданию:**

Необходимо реализовать "ProductForm" клмпонент, к-й будет использоваться для создания и редактирования товаров на странице
[products](http://course-js.javascript.ru/products) 
Если в компонент передать данные товара, то компонент должен работать в режиме "редактирования".
Если данные не переданы, компонент работает в режиме "создания".  
По итогу редактирования или создания товара, после нажатия кнопки "сохранить/добавить" товар, компонент должен
произвести "dispatch" события "product-saved".
    
## Дополнительные материалы

* [Requestbin](https://requestbin.com) - A modern request bin to inspect HTTP events
* [Jsonplaceholder](https://jsonplaceholder.typicode.com/) - Fake Online REST API for Testing and Prototyping

 
