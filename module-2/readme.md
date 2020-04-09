# Module #2

## Материалы из учебника:

5. [Типы данных](https://learn.javascript.ru/data-types)  
    5.7 [Map и Set](https://learn.javascript.ru/map-set)  
    5.9 [Object.keys, values, entries](https://learn.javascript.ru/keys-values-entries)   
    Задача: [Сумма свойств объекта](https://learn.javascript.ru/task/sum-salaries)  
    Задача: [Подсчёт количества свойств объекта](https://learn.javascript.ru/task/count-properties)  
    
    5.10 [Деструктурирующее присваивание](https://learn.javascript.ru/destructuring-assignment)  
    Задача: [Деструктурирующее присваивание](https://learn.javascript.ru/task/destruct-user)  
    Задача: [Максимальная зарплата](https://learn.javascript.ru/task/max-salary)  
    
4. [Объекты: основы](https://learn.javascript.ru/object-basics)  
    4.2 [Сборка мусора](https://learn.javascript.ru/garbage-collection)  
    4.3 [Тип данных Symbol](https://learn.javascript.ru/symbol)   
    4.4 [Методы объекта, "this"](https://learn.javascript.ru/object-methods)   
    Задача: [Создайте калькулятор](https://learn.javascript.ru/task/calculator)  
        
    4.5 [Преобразование объектов в примитивы](https://learn.javascript.ru/object-toprimitive)   
    4.6 [Конструкторы, создание объектов через "new"](https://learn.javascript.ru/constructor-new)   
    
2. [Основы JavaScript](https://learn.javascript.ru/first-steps)  
    2.16 [Функции-стрелки, основы](https://learn.javascript.ru/arrow-functions-basics)   
 
3. [Качество кода](https://learn.javascript.ru/code-quality)  
    3.5 [Автоматическое тестирование c использованием фреймворка Mocha](https://learn.javascript.ru/testing-mocha)    

## Дополнительные материалы:

* [Jest документация](https://jestjs.io/) 

Задачи:

* Необходимо реализовать функцию "createGetter". Функция должна принимать строку вида "prop-1.prop-2.prop-n",
 где "prop-1, ..., prop-n" - это свойства объекта разделенные точкой.
 Возвращать "createGetter" должен функция к-я по заданному пути будет искать значение в переданном ей объекте.  
 См. пример ниже:

Example: 
```javascript
function createGetter(field) {
  /* ... */
}

const product = {
  category: {
    title: "Goods"
  }
}

const getter = createGetter('category.title');
console.error(getter(product)); // Goods
```

* Необходимо реализовать ф-цию "invertObject". Ф-ция принимает объект свойства к-го могут быть только примитивными значениями, 
а возвращает новый объект ключи и свойства к-го заменены между собой местами.  
См. пример ниже:

Example:
```javascript
const obj = {
  foo: 'bar'
};

invertObject(obj); // {bar: 'foo'}
```
  
* Необходимо реализовать ф-цию "trimSymbols". Ф-ция принимает 2 аргумента:
    1. строку произвольной длинны
    2. число разрешенных одинаковых символов к-е расположены в строке подряд

Функция должна вернуть строку символов, удалив из нее все последовательные одинаковые символы к-е превышают заданное число.
См. пример ниже:

Example:
```javascript
trimSymbols('xxx', 3); // 'xxx'
trimSymbols('xxx', 2); // 'xx'
trimSymbols('xxx', 1); // 'x'

trimSymbols('xxxaaaaa', 2); // 'xxaa'
trimSymbols('xxxaaaaab', 3); // 'xxxaaab'
```
  
* Необходимо реализовать ф-цию "uniq". Функция принимает один аргумент - массив примитивных значений и возвращает новый 
массив уникальных значений

См. пример ниже:
Example:
```javascript
uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
uniq(['a', 'a', 'b', 'c', 'c']); // ['a', 'b', 'c']
```
