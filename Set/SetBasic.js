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

/* 우리가 알고있던, map, forEach에서 두번째 매개변수로 받았던 Index는 결국, index가 아닌 key였다.. */
// forEach 메소드를 가지고 있다. for...of도 가능하지만, forEach를 한번 보자
// 결국 일반배열은 인덱스를 자바스크립트엔진이 0부터 자동으로 key값으로 넣어주고 있던것이었음...
// map은 내장이 안되어있음..
const setObj = new Set([1, 2, 3, 4, 5, 1, 2, 3]);
setObj.forEach((value, key, array) => {
  // value 1 index 1 array Set { 1, 2, 3, 4, 5 }
  // value 2 index 2 array Set { 1, 2, 3, 4, 5 }
  // value 3 index 3 array Set { 1, 2, 3, 4, 5 }
  // value 4 index 4 array Set { 1, 2, 3, 4, 5 }
  // value 5 index 5 array Set { 1, 2, 3, 4, 5 }
  console.log("value", value, "index", key, "array", array);
});

for (let key of setObj) {
  // 1
  // 2
  // 3
  // 4
  // 5
  console.log(key);
}

const iter = set[Symbol.iterator](); // 반환해준게 이터러블이니, Symbol.iterator 메서드를 가지고 이터레이터 반환가능
console.log(iter.next()); // { value: 1, done: false }

const map = new Map(); // key, value가 다르다. 그래서 key와 value를 둘다 입력해줘야한다.

// getter와 setter와 Set연산자는 다르다.
const obj = {
  name: "",
  get() {
    return this.name;
  },
  set(name) {
    this.name = name;
  },
};

obj.name = "erin";
console.log(obj.name);
obj.name = "sangheon";
console.log(obj.name);
