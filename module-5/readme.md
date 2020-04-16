# Module #5

## Материалы из учебника:

2. [Введение в события](https://learn.javascript.ru/events)  
    2.1 [Введение в браузерные события](https://learn.javascript.ru/introduction-browser-events)  
    2.2 [Всплытие и погружение](https://learn.javascript.ru/bubbling-and-capturing)  
    2.3 [Делегирование событий](https://learn.javascript.ru/event-delegation)  
    2.4 [Действия браузера по умолчанию](https://learn.javascript.ru/default-browser-action)  
    2.5 [Генерация пользовательских событий](https://learn.javascript.ru/dispatch-events)  
        
3. [Интерфейсные события](https://learn.javascript.ru/event-details)  
    3.1 [Основы событий мыши](https://learn.javascript.ru/mouse-events-basics)  
    3.2 [Движение мыши: mouseover/out, mouseenter/leave](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave)  
    3.3 [Drag'n'Drop с событиями мыши](https://learn.javascript.ru/mouse-drag-and-drop)  
    3.4 [Клавиатура: keydown и keyup](https://learn.javascript.ru/keyboard-events)  
    3.5 [Прокрутка](https://learn.javascript.ru/onscroll)  

5. [Типы данных](https://learn.javascript.ru/data-types)  
    5.11 [Дата и время](https://learn.javascript.ru/date)  

## Задачи: 

* [SortableTable компонент](https://glitch.com/edit/#!/aromatic-substantial-jump) без динамической подгрузки

Пояснение к заданию:  

Необходимо модифицировать компонент "SortableTable" из предыдущего "module-4" таким образом, чтобы сортировка таблицы
происходила по клику на заголовок таблицы.

Также необходимо добавить сортировку по умолчанию - т.е. таблица должна быть отрисована в документе в отсортированном
состоянии по одной из колонок. Колонка по к-й будет осуществлена сортировка данных должна быть заданы при создании
объекта таблицы. 

Также необходимо предусмотреть возможность задать "пользовательскую" сортировку, к примеру, 
по статусу заказа: "завершен", "новый". 

Добавить к компоненту тесты.

* ["Tooltip" (behavior) компонент](https://glitch.com/edit/#!/tooltip-learn-javascript)

Пояснение к заданию:

Необходимо создать компонент "Tooltip" к-й будет показывать всплывающую подсказку на элементах у к-х имеется data-атрибут
"data-tooltip" (необходимо использовать приём проектирования «поведение», 
подробнее в [учебнике](https://learn.javascript.ru/event-delegation#priyom-proektirovaniya-povedenie))

Добавить к компоненту тесты.

Обратите внимание: 
* Очень важно в данном компоненте своевременно добавлять и очищать обработчики событий.
* Данный компонент должен быть реализован через паттерн 
["Singleton"](https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%B8%D0%BD%D0%BE%D1%87%D0%BA%D0%B0_%28%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%29)   

Подсказка:
Используйте события: `pointerover` и  `pointerout` - они всплывают

Опционально:

* ["NotificationManager" компонент](https://shadow-childlike-record.glitch.me/notification-manager/)
[Source code](https://glitch.com/edit/#!/shadow-childlike-record)

Необходимо создать компонент "NotificationManager" к-й будет управлять процессом отображения сообщений реализованных через компонент 
"Notification", а имеенно количество сообщений к-е могут одновременно показаны на странице, а также позиционирование сообщений 

Обратите внимание:

* Данный компонент может отображать разные типы нотификейшенов: "SuccessNotification", "ErrorNotification", "WarningNotification" 
* Данный компонент должен быть реализован через паттерн 
["Singleton"](https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%B8%D0%BD%D0%BE%D1%87%D0%BA%D0%B0_%28%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%29)  

Дополнительное условие:

Типы нотификейшенов: "SuccessNotification", "ErrorNotification", "WarningNotification" необходимо реализовать с помощью
наследования. "ErrorNotification" компонент должен обладать "специальным поведением" - 
может быть "закрыт" (убране со страницы) только по клику. 
