# Module #1

## Материалы из учебника:

4. [Объекты: основы](https://learn.javascript.ru/object-basics)  
    4.1 [Объекты](https://learn.javascript.ru/object) 

5. [Типы данных](https://learn.javascript.ru/data-types)  
    5.1 [Методы у примитивов](https://learn.javascript.ru/primitives-methods)  
    5.2 [Числа](https://learn.javascript.ru/number)  
    5.3 [Строки](https://learn.javascript.ru/string)  
    5.4 [Массивы](https://learn.javascript.ru/array)  
    Задача: [Скопирован ли массив?](https://learn.javascript.ru/task/item-value)  
    
    5.5 [Методы массивов](https://learn.javascript.ru/array-methods)  
    Задача: [Выделить число](https://learn.javascript.ru/task/extract-currency)  
    Задача: [Переведите текст вида border-left-width в borderLeftWidth](https://learn.javascript.ru/task/camelcase)  
    
3. [Качество кода](https://learn.javascript.ru/code-quality)  
    3.1 [Отладка в браузере Chrome](https://learn.javascript.ru/debugging-chrome)  
    3.2 [Советы по стилю кода](https://learn.javascript.ru/coding-style)  
    3.3 [Комментарии](https://learn.javascript.ru/comments) 

Задачи:
* опционально: написать ф-ю `sum(1)(2)(3)(5)` - к-я будет возвращать сумму аргументов к-е будут переданы ей.
* опционально: написать ф-ю к-я принимает массив строк и возвращает новый отсортированный массив строк в 
зависимости от второго параметра: “asc” или “desc” 
`sortStrings(['b', 'a', 'c'], 'asc'); // ['a', 'b', 'c']`

## Дополнительный задачи на приведение типов данных в JS:

Необходимо передать параметр(ы) в ф-цию таким образом, чтобы результат выполнения вернул `true`

Пример:

```javascript
function returnTrue0(a) {
  return a;
}

console.assert(returnTrue0(true), 'should return true');
```

Задачи:

```javascript
function returnTrue1(a) {
  return typeof a !== 'object' && !Array.isArray(a) && a.length === 4;
}

function returnTrue2(a) {
  return a !== a;
}

function returnTrue3(a, b, c) {
  return a && a == b && b == c && a != c;
}

function returnTrue4(a) {
  return (a++ !== a) && (a++ === a);
}

function returnTrue5(a) {
  return a in a;
}

function returnTrue6(a) {
  return a[a] == a;
}

function returnTrue7(a, b) {
  return a === b && 1/a < 1/b; 
}
 ```
