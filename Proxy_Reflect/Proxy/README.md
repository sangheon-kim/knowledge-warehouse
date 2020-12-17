# Proxy

- 대리, 대신, 전체 개념에서 볼때 어울린다.
- 기본 오퍼레이션을 중간에서 가로채어 오퍼레이션을 대리, 대신하여 실행한다.
- 가로채어 실행하더라도, 전체 괘도를 벗어날 수 없어, 오퍼레이션을 완전하게 바꿀 수는 없다.

```js
const counter = { order: "커피" };
const orderer = counter.order;
console.log(orderer); // 커피
```

> getter를 실행하면 값이 반환된다.
>
> - counter.order를 호출하면 getter가 실행된다.
> - 이때 엔진은 getter 기능을 가진 내부 메소드 [[GET]]을 호출 한다.

`기본 오퍼레이션`

- [[SetPrototypeOf]] - setPrototypeOf (prototype 지정)
- [[isExtensible]] - isExtensible (확장 가능 여부 Boolean 반환)
- [[PreventExtensions]] - preventExtensions (확장 금지)
- [[GetOwnProperty]] - getOwnPropertyDescription (해당 프로퍼티의 디스크립터 확인)
- [[DefineOwnProperty]] - defineProperty(오브젝트의 프로퍼티를 정의하거나 재정의)
- [[HasProperty]] - has (가지고 있는지 확인)
- [[Get]] - get (해당 프로퍼티의 값을 찾아서 반환)
- [[Set]] - set (매개변수로 전달받은 대입값을 가지고 프로퍼티의 값 세팅)
- [[Delete]] - deleteProperty (프로퍼티 삭제)
- [[OwnPropertyKeys]] - ownKeys (프로퍼티 키?) - 이건 아직 잘모름.
- [[Call]] - apply (이것도 아직은 잘모름)
- [[Contsruct]] - construct (생성자?)

`프록시 모습`

```
A     B     C
    프록시

- 왼쪽 사람이 가운데 사람에게 밥을 달라고 말하고, 가운데 사람이 오른쪽 사람에게 밥을 달라고 말하면, 오른쪽 가운데 왼쪽 순서로 밥을 받을 수 있다.
- Proxy는 결국 중간에서 대리 역할을 수행 해줍니다.
```

## Proxy 논리

- 가운데 사람을 거쳐서 받는 모습을 자바스크립트 코드로 표현하면

```js
const target = { food: "밥" };
const middle = new Proxy(target, {});
const left = middle.food;
console.log(left);
/*
 * middle.food가 실행되면, proxy의 getter가 호출되며,
 * Proxy에서 target의 getter를 호출하면서 food를 파라미터로 넘겨준다.
 * new Proxy() 파라미터에 target을 작성하였으므로, middle에서 target을 알 수 있다.
 * target의 [[Get]]이 food 값을 구해서 middle로 반환하고, middle로 반환된 값을 left에 할당한다.
 *
 */
```

## Handler, Trap

- target
  - proxy 대상 오브젝트이다. Array, Object 등을 사용할 수 있다.
- const obj = new Proxy(target, {}) 형태에서 첫 번째 파라미터에 target을 작성한다.
- 이렇게 Proxy 인스턴스를 생성하므로, Proxy 인스턴스와 target이 연결된다.

### trap

- OS(Operating System)에서 사용하는 용어로, 실행 중인 프로그램에 이상이 발생했을 때 실행을 중단하고, 사전에 정의된 제어로 전환하는 것을 의미한다.
- 자신의 앞에 있는 수저를 같이 건네 준다면, Proxy에 수저를 건네주는 코드가 필요하다.

```js
const target = { food: "밥", eat: "식사" };
const handler = {
  get(target, key) {
    console.log({ target, key });
    return target[key] + ".수저";
  },
  set(target, key) {},
};

const middle = new Proxy(target, handler);
const left = middle.food;
const eat = middle.eat;
console.log("left", left);
console.log("eat", eat);
```
