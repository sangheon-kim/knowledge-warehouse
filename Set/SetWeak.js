{
  const map = new Map();

  let obj = {};

  map.set(obj, "hello");

  obj = null;

  console.log(map.has(obj));
}

{
  let obj2 = {};

  const weakmap = new WeakMap();

  weakmap.set(obj2, "test");

  obj2 = null;

  console.log(weakmap.has(obj2));
}

{
  const obj = {
    title: "제목",
    [Symbol.for("123")]: 456,
  };

  Object.defineProperty(obj, "value", {
    value: "값",
  });

  const keys = Object.getOwnPropertyNames(obj);
  const symbols = Object.getOwnPropertySymbols(obj);

  console.log(keys);
  console.log(symbols);
  console.log(obj);

  // 심볼을 프로퍼티키로 선언한건 객체를 순회하는 반복문에서는 보여지지 않는다.
  // enumerable이 false로 지정된 프로퍼티는 console.log에서 조차안보임
  // 확인을 원한다면 Object.getOwnPropertyNames(obj)를 사용해볼 것.
}
