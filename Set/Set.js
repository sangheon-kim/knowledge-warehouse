// Set을 어디서 사용할까?? 바로 집합연산을 할때 사용하기 딱좋다.
const fruits = ["apple", "banana", "orange", "orange", "banana", "melon"]; // 서버에서 응답받은 값으로 가정
const res = fruits.reduce(function (acc, cur) {
  acc.indexOf(cur) !== -1 ? acc : acc.push(cur);
  return acc;
}, []);
console.log(res);

// 서버에서 받은 값을 가지고 어떤 과일 종류들이 있는지 나열하는 칼럼을 만들어보자
const unionFruits = new Set();
fruits.forEach((item) => unionFruits.add(item));
console.log(unionFruits); // Set { 'apple', 'banana', 'orange', 'melon' }
for (let key of unionFruits) {
  // apple
  // banana
  // orange
  // melon
  console.log(key);
}

{
  // 교집합 구하기
  Set.prototype[Symbol.for("interSection")] = function (set) {
    // const result = new Set();

    // for (const value of set) {
    //   if (this.has(value)) result.add(value);
    // } // 같은 값에 대해서 result라는 Set 타입 이터러블에 넣어준다.

    // return result;

    return new Set([...this].filter((v) => set.has(v)));
  };

  const setA = new Set([1, 2, 3, 4]);
  const setB = new Set([2, 4]);

  console.log(setA[Symbol.for("interSection")](setB)); // Set { 2, 4 }
  console.log(setB[Symbol.for("interSection")](setA)); // Set { 2, 4 }
}

{
  // 합집합 구하기
  Set.prototype[Symbol.for("union")] = function (set) {
    return new Set([...this, ...set]);
  };

  const setA = new Set([1, 2, 3, 4]);
  const setB = new Set([2, 4]);

  console.log(setA[Symbol.for("union")](setB)); // Set { 1, 2, 3, 4 }
  console.log(setB[Symbol.for("union")](setA)); // Set { 2, 4, 1, 3 }
}

{
  // 차집합 구하기
  Set.prototype[Symbol.for("difference")] = function (set) {
    const result = new Set(this);

    for (let value of set) {
      if (result.has(value)) {
        result.delete(value);
      }
    }

    return result;
  };

  const setA = new Set([1, 2, 3, 4]);
  const setB = new Set([2, 4]);

  console.log(setA[Symbol.for("difference")](setB));
  console.log(setB[Symbol.for("difference")](setA));
}

{
  // 부분 집합 상위집합 구하기
  Set.prototype[Symbol.for("isSuperset")] = function (subset) {
    for (const value of subset) {
      if (!this.has(value)) return false;
    }

    return true;
  };

  const setA = new Set([1, 2, 3, 4]);
  const setB = new Set([2, 4]);

  console.log(setA[Symbol.for("isSuperset")](setB));
  console.log(setB[Symbol.for("isSuperset")](setA));
}
