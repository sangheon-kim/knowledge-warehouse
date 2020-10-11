# Object와 Map 차이

## Object

- 문자열을 값에 매핑하는데 사용되었다. 값을 검색하고, 키를 삭제하고, 키에 저장된 내용을 검색할 수 있게 만들어준다.

## Map

- Map객체에 저장되어 있는 각 요소들을 [키, 값] 형태의 배열로 반복적으로 반환해주는 for...of를 사용

```javascript
// 객체 리터럴과 비슷한 개념...
// 일반 객체는 키값으로 문자열 타입이나, Symbol 타입으로만 키 프로퍼티를 정의할 수 있다.
const obj = {
  title: "erin",
  [Symbol()]: "상헌", // Symbol은 enumerable(열거 가능 여부)가 false이다.
  // {}: {} // 객체를 키값으로 사용할 수 없다.
  // []: {} // 배열도 키값으로 사용할 수 없다.
};

// 일반 객체는 length값을 가지고 있지않아요...
console.log("obj 요소 개수", Object.keys(obj).length); // 열거가능한 요소에 대한 개수만 출력

// Map과 Set은 둘다 이터러블 객체를 가진다.
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  [obj, "value3"],
  [() => null, "value4"],
  [[1, 2, 3], "배열도 가짐"],
]);

console.log("map size", map.size); // map size 5

// Map {
//   'key1' => 'value1',
//   'key2' => 'value2',
//   { title: 'erin', [Symbol()]: '상헌' } => 'value3',
//   [Function] => 'value4',
//   [ 1, 2, 3 ] => '배열도 가짐' }
console.log(map);
```

## Object와 Map 비교

- Object의 키는 string타입 또는 symbol 타입만 가질 수 있고, Map의 키는 모든 값을 가질 수 있다.
- Object의 크기는 수동으로 추적(Object.keys(object).length), Map의 크기는 내부 프로퍼티인 size를 통해 얻을 수 있다.
- Map은 삽입된 순서대로 반복된다.

- 실행시 까지 키를 알 수 없고, 모든 키가 동일한 type이며, 모든 값들이 동일한 type일 경우에는 Objects를 대신해서 Map을 사용해라.
- 각 개별 요소에 대해 적용해야 하는 로직이 있을 경우에는 objects를 사용해라. Object.defineProperty
- Map의 경우에는 이터러블 객체가 반환되어 for...of함수를 사용할 수 있고, 배열 스프레드 오퍼레이터와, 배열 비구조화 할당 사용가능

# Set과 Array의 차이

- 중복 값을 허용해주지 않는다.
- 배열은 인덱스를 가지고 참조할 수 있지만, Set은 인덱스를 가지고 참조할 수 없다.
- length 프로퍼티에 대해 수정할 수 있다. Array.prototype.length는 Setter를 가지고 있다.
- 이것을 직접 수정 하게되면, 요소의 개수와 배열의 길이가 다른 희소배열이 생성된다.
- Set 생성자를 가지고 생성한 이터러블 객체는 getter만을 가지고 있어, 읽기전용이다.

```javascript
// Set 이란 뭘까? ES6 부터 나온 개념이에요
// Set == Array
const array = [1, 2, 3, 1, 2, 3];
console.log(array); // [ 1, 2, 3, 1, 2, 3 ] 중복이 허용이 된다.
console.log(array[1]); // 인덱스로 조회가 가능(배열)
console.log("length", array.length); // length 6
array.length = 100; // 일반 배열의 경우 length 프로퍼티가 setter도 내장하고 있어, 수정이 가능하다.
console.log(array); // [ 1, 2, 3, 1, 2, 3, <94 empty items> ] // Bad Method (희소 배열로 바뀌어버림)
// 희소 배열 - 요소 개수와 배열길이가 다른걸 희소 배열이라고 한다.
// 희소 배열은 개발자가 추측조차 하기 힘들어진다. 희소 배열로 만드는것은 지양하는것이 좋다.
console.log("length", array.length); // length 100

const set = new Set([1, 2, 3, 1, 2, 3]); // key, value가 동일해요.
console.log(set); // Set { 1, 2, 3 }
console.log(set[1]); // undefined (인덱스로 조회가 불가능하다)
console.log("set의 길이", set.size); // set의 길이 3 size 프로퍼티를 가지고 있다.
set.size = 1000; // Error 또한 뱉지 않는다. 하지만 읽기전용 속성이기에 영향도 없다.
console.log("set의 길이", set.size); // set의 길이 3 setter를 가지고 있지 않기 때문에 변경이 되지 않는다.

// Set에 추가하는 메소드
const erin = new Set(); // Set은 키와 value가 동일하다. 따라서 키값만 넣어주면된다.
erin.add("apple");
erin.add("banana");
erin.add("banana");
console.log(erin); // Set { 'apple', 'banana' }

// Set에 요소가 존재하는지 확인 has 메소드를 이용하면 불리언값으로 요소 존재 여부가 나온다.
console.log(erin.has("apple")); // true
console.log(erin.has("orange")); // false

// 요소 삭제 (delete)
erin.delete("apple");
erin.delete("orange"); // 요소가 없는걸 삭제 시도해도 에러를 뱉지 않는다.
console.log(erin); // Set { 'banana' }

// 요소 일괄 삭제
erin.add("1");
erin.add("2");
console.log(erin); // Set { 'banana', '1', '2' }
erin.clear(); //
console.log(erin); // Set {}

// Set이 반환해주는것은 이터러블이다. for...of, 배열 비구조화할당, 배열 스프레드 오퍼레이터가 가능
for (let key of set) {
  console.log(key); // 1 2 3
}

/**
 * 정리
 *
 * Set 을 new 연산자를 가지고 생성한 이터러블 객체는 중복된 요소들을 허용하지 않는다.
 * 이터러블이기 때문에 for...of, 배열 비구조화 할당, 배열 스프레드 오퍼레이터 사용가능
 * 중복 값도 허용하지 않고, 인덱스로 참조도 되지않고, 일반 배열과 다르게 length값을 수정할 수도 없고,
 * 읽기전용의 size를 이용해서 Set을 이용해 생성한 이터러블 객체의 요소 개수를 받을 수 있다.
 * add, has, delete, clear 메소드를 활용해서 Set타입의 이터러블 객체를 변경할 수 있다.
 *
 *
 */
```
