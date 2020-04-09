# js-20200324

## To start project:

Для старта проекта необходимо выполнить следующие команды:

* `npm install` - установит необходимые зависимости  
* `npm start [путь к компоненте]` - зупустит локальный сервер

Для того чтобы запустить, к примеру, компонент "ColumnChart" из "module-3", необходимо
выполнить команду:

* `npm start module-3/column-chart` - запустит локальный сервер к-й по умолчанию в 
 указанной директории найдет и запустит в браузере файл "index.html".
 
Подробнее про static-server можно почитать [тут](https://www.npmjs.com/package/static-server)

## To run tests:

Чтобы запустить все тесты воспользуйтесь командой:  

`npm run test:all`

Чтобы запустить тесты из определленой директории воспользуйтесь командой:

`npm run test:specific --findRelatedTests module-3/**/*.spec.js`

где "module-3/**/*.spec.js" представляет собой паттерн к-й будет использован для поиска тестов  
[Подробнее в документации Jest](https://jestjs.io/docs/en/cli#--findrelatedtests-spaceseparatedlistofsourcefiles) 
