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

Задачи:

* "createGetter" 

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

* "invertObject" 

Example:
```javascript
const obj = {
  foo: 'bar'
};

invertObject(obj); // {bar: 'foo'}
```
  
* "trimSymbols"

Example:
```javascript
trimSymbols('xxxaaaaab', 1); // 'xab'
```
  
* "uniq"
Example:
```javascript
uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
```
