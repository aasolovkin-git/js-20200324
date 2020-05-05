# Module #10 Сборка проекта с помощью Webpack part 1

## Материалы из учебника:

3. [Качество кода](https://learn.javascript.ru/code-quality)  
    3.6 [Полифилы](https://learn.javascript.ru/polyfills)  
    
## Задачи:

* Используя за основу [проект](https://github.com/dosandk/project-structure) необходимо объединить все разработанные компоненты на странице "dashboard".

**Пояснение к заданию:**

В коде страницы "dashboard" [проекта](https://github.com/dosandk/project-structure) необходимо устранить следующие TODO:

* TODO: replace by API for Bestsellers products - заменить конфиг и API для загрузки данных bestseller продуктов.
Обратите внимание на странице ["dashboard"](http://course-js.javascript.ru/) сортировка данных таблицы происходит локально (без запроса на сервер)  

* TODO: replace "mocked" data by real API calls - необходимо использовать реальные данные для каждого из ColumnChart компонентов.
Пример API вызовов можно посмотреть на [http://course-js.javascript.ru](http://course-js.javascript.ru). Добавить tooltip для ColumnChart компонент.

* TODO: add RangePicker component - добавит на страницу "dashboard" RangePicker component.

* TODO: add addEventListener for RangePicker event - организовать взаимодействие RangePicker c другими компонентами на страницы "dashboard" с помощью события

**Дополнительно**: Реализовать механизм предварительного показа (рендера) компонент (без данных). После загрузки данных с сервера компонент
должен быть обновлен новыми данными. Смотри пример ["ColumnChart" компонента](https://column-chart-skeleton.glitch.me/) 


## Дополнительные материалы:

* [Webpack](https://webpack.js.org/)    
* [Babel](https://babeljs.io/)
* [Eslint](https://eslint.org/)

