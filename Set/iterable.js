const array = [1, 2, 3, 4];

const iter = array[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (let erin of array) {
  console.log(erin);
}

console.log(typeof array[Symbol.iterator] === "function");

/**
 * Symbol.iterator 프로토타입 메소드를 가지고 있는 객체를 이터러블이라고 한다. Symbol.iterator 메소드를
 * 호출해서 반환되는 객체가 이터레이터 인스턴스가 반환이 된다.
 * 이터레이터 인스턴스는 next라는 메서드를 가지고 있는데 이터레이터의 next 메소드를 호출을 하면,
 * 이터레이터 리절트 오브젝트(value, done 을 키로 가지고 있다.)가 반환이 된다
 *
 * for...of문은 이터러블을 순회하면서, iter.next()를 내부에서 호출하면서, done이 true가 아닐때 까지,
 * value값을 of의 좌변에 변수명으로 받아서 출력해줄 수 있다.
 * for (let erin of array) (erin (순회하면서 받을 변수명 (좌변) of 의 우측에있는 array가 우변이자 이터러블))
 *
 * 이터러블 활용 예시
 * 1. for...of문을 사용해서 순회할 수 있다
 * 2. 배열 스프레드 오퍼레이터를 사용할 수 있다.(...iter)
 * 3. 배열 비구조화 할당을 사용할 수 있다.
 *
 * 위에가 왜 장점인지 모를 수 있지만, HTML Collection, NodeList처럼 Array-like Object로 되어있지만,
 * Symbol.iterator 프로토타입 메서드를 가지고 있는 객체의 경우에도 이터러블 활용 예시에 사용이 가능해진다.
 *
 * 일반 객체는(내가 정의한 객체 리터럴 or Symbol.iterator 프로토타입 메서드를 가지지 않은)
 * for...of도 돌릴 수 없고, 배열 스프레드 오퍼레이터로 사용도 불가하고, 배열 비구조화 할당도 불가능하다.
 *
 * 자 여기서 의문?? 그러면 내가 Symbol.iterator 메소드를 직접 할당하면 가능하지않을까?
 * 답은 가능하다.
 *
 */

/* 사용자 정의 이터러블 */
{
  const fibonacci = {
    [Symbol.iterator]() {
      let [pre, cur] = [0, 1];
      const max = 10;

      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
  const iter = fibonacci[Symbol.iterator]();
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());

  for (let num of fibonacci) {
    console.log(num);
  }
}
