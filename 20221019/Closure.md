# Closure

- 기본적으로 자바스크립트에서는 참조되고 있는 변수는 메모리 상에 남는다.
- 외부 함수보다 내부함수의 생명주기가 길고 외부함수의 함수레벨 스코프의 선언한 변수를 내부함수에서 참조하고 있을 수 있다.
- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.
- 클로저가 생성된 시점의 유효범위 내에 있는 모든 지역변수로 구성된다.

```js
function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
//myFunc변수에 displayName을 리턴함
//유효범위의 어휘적 환경을 유지
myFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)
```

> myFunc는 makeFunc가 실행될때 생성된 displayName 함수의 인스턴스에 대한 참조다.
>
> > displayName의 인스턴스는 변수 name이 있는 렉시컬 스코프에 대한 참조를 유지한다.

```js
function makeAdder(x) {
  var y = 1;
  return function (z) {
    y = 100;
    return x + y + z;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨

console.log(add5(2)); // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산
```

## Example 1

```js
function makeSizer(size) {
  return function () {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

## Example 2

```js
// Private 메서드
var makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};

var counter1 = makeCounter();
var counter2 = makeCounter();
alert(counter1.value()); /* 0 */
counter1.increment();
counter1.increment();
alert(counter1.value()); /* 2 */
counter1.decrement();
alert(counter1.value()); /* 1 */
alert(counter2.value()); /* 0 */
```

> 외부에서 접근할 수 없는 private 한 메서드와 프로퍼티를 정의하기 위하.

### 출처

- https://poiemaweb.com/js-closure
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
