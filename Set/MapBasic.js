// Map은 Object 비슷하다고 생각하면된다.

const objSamble = {
  title: "상헌", // 객체 리터럴 안에 직접 키와 value를 넣어주면, descriptor(writable, enumerable, configuable값이 true가 기본값)
};
Object.defineProperty(objSamble, "sangheon", {
  // descriptor들의 기본값이 false다 Object.defineProperty로 추가하거나 수정시
  value: 123,
});

Object.defineProperty(objSamble, "erin", {
  value: "Lee",
  enumerable: true, // 열거 가능 여부 (쉽게 말해서 콘솔로그로 찍을 수 있어? 또는 Object.keys나 Object.values로 보여질수있어?)
  writable: false, // 수정 가능해? false면 수정을 못한다.
  configurable: false, // 정의가능해? 재정의를 막아놓는다.
});

console.log(Object.getOwnPropertyDescriptor(objSamble, "title"));
console.log(Object.getOwnPropertyDescriptor(objSamble, "sangheon"));
console.log(Object.getOwnPropertyDescriptor(objSamble, "erin"));

// Object.defineProperty(objSamble, "erin", {
//   value: "Kim",
//   enumerable: false,
// }); // Cannot redefine property: erin

console.log(objSamble);
objSamble.title = "상헌짱";
objSamble.erin = "Kim";
console.log(objSamble);

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
