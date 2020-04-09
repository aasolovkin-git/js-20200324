# Module #4

## Материалы из учебника:

1. [Документ](https://learn.javascript.ru/document)  
    1.1 [Браузерное окружение, спецификации](https://learn.javascript.ru/browser-environment)   
    1.2 [DOM-дерево](https://learn.javascript.ru/dom-nodes)  
    1.3 [Навигация по DOM-элементам](https://learn.javascript.ru/dom-navigation)   
    Задача: [Выделите ячейки по диагонали](https://learn.javascript.ru/task/select-diagonal-cells)  
    
    1.4 [Поиск: getElement*, querySelector*](https://learn.javascript.ru/searching-elements-dom)  
    1.5 [Свойства узлов: тип, тег и содержимое](https://learn.javascript.ru/basic-dom-node-properties)   
    1.6 [Атрибуты и свойства](https://learn.javascript.ru/dom-attributes-and-properties)  
    Задача: [Получите атрибут](https://learn.javascript.ru/task/get-user-attribute)  
    
    1.7 [Изменение документа](https://learn.javascript.ru/modifying-document)  
    Задача: [createTextNode vs innerHTML vs textContent](https://learn.javascript.ru/task/createtextnode-vs-innerhtml)  
    Задача: [Очистите элемент](https://learn.javascript.ru/task/clear-elem)  
    
    1.8 [Стили и классы](https://learn.javascript.ru/styles-and-classes)

9. [Классы](https://learn.javascript.ru/classes)  
    9.3 [Статические свойства и методы](https://learn.javascript.ru/static-properties-methods)
    
13. [Модули](https://learn.javascript.ru/modules)  
    13.1 [Модули, введение](https://learn.javascript.ru/modules-intro)   
    13.2 [Экспорт и импорт](https://learn.javascript.ru/import-export)   

5 [Загрузка документа и ресурсов](https://learn.javascript.ru/loading)  
    5.1 [Страница: DOMContentLoaded, load, beforeunload, unload](https://learn.javascript.ru/onload-ondomcontentloaded)  
    5.2 [Скрипты: async, defer](https://learn.javascript.ru/script-async-defer)   
    5.3 [Загрузка ресурсов: onload и onerror](https://learn.javascript.ru/onload-onerror)  
    
## Задачи: 

* [SortableTable компонент](https://glitch.com/edit/#!/sortable-table-js-202003254) без динамической подгрузки 

Пояснение к заданию:  

Необходимо реализовать компонент к-й будет представлять данные в табличном виде, в дальнейшем компонент будет использован на
разных страницах проекта к примеру: 

* на главной странице для отображения [лидеров продаж](http://course-js.javascript.ru/)
* на странице [продаж](http://course-js.javascript.ru/sales)
* на странице [товаров](http://course-js.javascript.ru/products)

Коомпонент на данном этапе должен уметь отображать столбцы с различными данными, к примеру для страницы [лидеров продаж](http://course-js.javascript.ru/)
это будут:

| Фото | Название | Категория | Количество | Цена | Продажи |
| ---  | ---      | ---       | ---        | ---  | ---     |

а для страницы обычных [продаж](http://course-js.javascript.ru/sales) это будут:

| ID | Клиент | Дата | Стоимость | Статус | 
| ---  | ---  | ---  | ---       | ---    |

Обратите внимание что таблица должна обладать сортировкой, причем по данным в некоторых столбцах сортировать нельзя, например по столбцу "Фото",
а вот столбец "Дата" будет иметь специальную сортировку к-я будет позволять сравниь даты.
Столбцы с текстовыми или цифровыми данными сортируются таким же подходом как в задании "sortStrings"
из "module-2"

В дальнейших модулях мы расширим функционал таблицы:

* добавим события клика на заголовки таблицы
* добавим функционал подгрузки данных с сервера
* реализуем динамическую подгрузку данных по событию скрола страницы

## Дополнительные материалы:

* [Jest документация](https://jestjs.io/) - фреймвор для тестирования 
* [jest-dom](https://github.com/testing-library/jest-dom) - набор дополнительных "matchers" - проверок результата переданного в "expect"
