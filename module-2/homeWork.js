//Сумма свойств объекта
//let salaries = {
//  "John": 100,
//  "Pete": 300,
//  "Mary": 250
//};
//
//alert( sumSalaries(salaries) ); // 650

function sumSalaries(salaries) {
  return Object.values(salaries).reduce((result, salary) => result + salary, 0);
}

//Подсчёт количества свойств объекта
//let user = {
//  name: 'John',
//  age: 30
//};
//
//alert( count(user) ); // 2

function count(user) {
  return Object.keys(user).length;
}

//Деструктурирующее присваивание
//let user = { name: "John", years: 30 };
//
// ваш код должен быть с левой стороны:
// ... = user
//
//alert( name ); // John
//alert( age ); // 30
//alert( isAdmin ); // false

let { name, years: age, isAdmin = false} = user;

//Максимальная зарплата
//let salaries = {
//  "John": 100,
//  "Pete": 300,
//  "Mary": 250
//};

function topSalary(salaries) {
  let topSalaryItem = salaries
    ? Object.entries(salaries)
      .sort(([, salary1], [, salary2]) => salary2 - salary1)
      .find((item, index) => index === 0)
    : null;

  let [ topSalaryName ] = topSalaryItem || [];
  
  return topSalaryName || null;
}

//Создайте калькулятор
//let calculator = {
//  // ... ваш код ...
//};
//
//calculator.read();
//alert( calculator.sum() );
//alert( calculator.mul() );

let calculator = {
  read() {
    this.a = +prompt("Введите первое значение:", 0);
    this.b = +prompt("Введите второе значение:", 0);
  },

  sum() {
    return this.a + this.b; 
  },

  mul() {
    return this.a * this.b;
  }
};


//"createGetter"
//Example:
//
//function createGetter(field) {
//  /* ... */
//}
//
//const product = {
//  category: {
//    title: "Goods"
//  }
//}
//
//const getter = createGetter('category.title');
//console.error(getter(product)); // Goods
function createGetter(field) {
  
  function getter(product) {
    var result = product;

    if (!getter.fullFieldName) return result;
  
    getter.fullFieldName.split(".").forEach(fieldName => {
      result = result[fieldName];
      if (!result) return false;
    });

    return result; 
  }

  getter.fullFieldName = field;

  return getter; 
}

//"invertObject"
//Example:
//const obj = {
//  foo: 'bar'
//};
//invertObject(obj); // {bar: 'foo'}
function invertObject(obj) {
  var invertedObjectEntries = Object.entries(obj)
    .map(item => [item[1], item[0]]);
  
  return Object.fromEntries(invertedObjectEntries);  
}


//"trimSymbols"
//Example: trimSymbols('xxxaaaaab', 1); // 'xab
function trimSymbols(text, maxRepeatingCount) {
  let result = "";
  let lastCharRepeatingClount = 0;
  
  text.split("").forEach(char => {
    let resultLastChar = result[result.length - 1];

    if ((resultLastChar === char && lastCharRepeatingClount < maxRepeatingCount) || 
        resultLastChar !== char) {
      result += char;
      
      lastCharRepeatingClount = resultLastChar !== char
        ? 1 
        : lastCharRepeatingClount + 1
    }
  });
  
  return result;
}

//"uniq" Example:
//uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]

function uniq(array) {
  return Array.from((new Set(array)).keys());
}
