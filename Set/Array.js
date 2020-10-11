const array = [1, 2, 3, 5, "123"];

const obj = {
  0: 1,
  1: 2,
  2: 3,
  3: 5,
  4: "123",
};

Array.prototype[Symbol.for("sum")] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

console.log([1, 2, 3, 4][Symbol.for("sum")]());

const symbol1 = Symbol("kim");
const symbol2 = Symbol("kim");
var hp = Symbol();
var mp = Symbol();
const obj = {
  kim: "erin",
  age: 23,
  [hp]: 100,
  [mp]: 200,
};

const forSymbol = Symbol.for("erin"); // 심볼 레지스트리에 없으니까 생성
const forSymbol2 = Symbol.for("erin"); // 심볼 레지스트리에서 있으니까 찾아서 참조

const forSymbolKey = Symbol.keyFor(Symbol.for("erin"));
console.log(forSymbolKey);

console.log(forSymbol === forSymbol2);

console.log(obj["kim"]);
// console.log(obj[symbol1], obj[symbol2]);
console.log(symbol1 === symbol2);

// console.log(typeof array);
// console.log(array.length);

// array.map((item, index) => console.log(index));

// 이터레이션 프로토콜
//  이터러블
