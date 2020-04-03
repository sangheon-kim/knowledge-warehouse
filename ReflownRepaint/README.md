# Reflow & Repaint

<b>브라우저의 동작 과정</b>

- Reflow & Repaint의 개념을 이해하기전에 브라우저의 동작 과정에 대해 먼저 이해해보자.
- <a href="https://github.com/sangheon-kim/knowledge-warehouse/tree/master/Browser">브라우저의 동작 과정</a>

<b>Repaint</b>

- 레이아웃에는 영향을 주지 않지만, 가시성에는 영향을 주는 영향을 주는 엘리먼트 변경시 발생
  ex) <code>opacity</code>, <code>background-color</code>, <code>visibility</code>, <code>outline</code>

<b>Reflow</b>

- 모든 엘리먼트의 위치와 길이 등 다시 계산하는 것 문서의 일부 혹은 전체를 다시 렌더링 하는 것.

### Case of Reflow Trigger

- DOM Element 추가, 제거 또는 변경
- CSS 스타일 추가, 제거 또는 변경
  <br />--> CSS 스타일 직접 변경하거나, 클래스 추가함으로 레이아웃 변경 가능. 엘리먼트 길이 변경시, DOM 트리에 있는 다른 노드에 영향
- CSS 애니메이션과 트랜지션
  <br /> --> 애니메이션의 모든 프레임에서 리플로우 발생
- offsetWidth와 offsetHeight의 사용
  <br /> --> offsetWidth와 offsetHeight 속성 읽을 경우, 초기 리플로우 트리거 되어 수치 계산
- 유저 행동
  <br /> --> 유저 인터랙션으로 발생하는 hover 효과, 필드에 텍스트 입력, 창 크기 조절, 글꼴 크기 변경, 스타일 시트 또는 글꼴 전환등 활성화하여 리플로우 트리거 가능
  <br />

### 성능 저하 최소화 하기

- 1. 클래스 변경을 통해 스타일 변경시, 최대한 말단의 노드의 클래스 변경
- 최대한 말단에 있는 노드를 변경함으로써, 리플로우의 영향을 최소화한다.
- 2. 인라인 스타일 사용 금지
     <br />--> 스타일 속성을 통해 스타일을 설정시, 리플로우 발생
     <br />-->엘리먼트 클래스 변경시 엘리먼트는 하나의 리플로우만 발생시킴
     <br />--> 인라인 스타일은 HTML이 다운로드시, 레이아웃에 영향을 미치면서 추가 리플로우 발생시킨다.<br />
- 3. 애니메이션이 들어간 엘리먼트는 <code>position: fixed</code> 또는 <code></code>position: absolute</code>로 지정한디 <br />--> 다른 엘리먼트의 영향을 주지 않기위해<br />
- 4. 부드러운 에니메이션이 성능을 저하시킨다.
     <br />--> 1px씩 이동시, 성능이 10이들어간다고 가정하면 4px씩 이동시 2.5px의 리플로우 처리가 필요
- 5. 레이아웃을 위한 table은 피한다.
     <br />--> 테이블은 작은 변경에도 테이블의 다른 노드에 대한 리플로우 발생
     <br />--> 데이터 표시용도의 <code>"table"</code> 사용시에도 <code>table-layout:fixed</code> 속성을 주는 것이 좋다. --> 열의 너비가 머리글 행 내용 기반 계산
- 6. CSS에서 Java script 표현식을 사용 x
     <br />--> 문서 리플로우 때마다 javascript 표현식이 다시 계산됨.
- 7. CSS 하위 셀렉터를 최소화한다.
     <br />--> 사용하는 규칙이 적을수록 리플로우 빠름

- 8. 숨겨진 엘리먼트 변경
     <br />--><code>display: none</code>으로 숨겨진 엘리먼트 변경될시, 리페인트 리플로우 x
- 9. Javascript 통해 스타일 변경시, .cssText 사용하거나, 클래스를 변경하라

```javascript
var el = document.getElementById("reflow-test");
// 3번의 리플로우 발생
el.style.padding = "8px";
el.style.width = "320px";
el.style.height = "240px";

// 1번만 리플로우 발생
var el = document.getElementById("reflow-test");

el.style.cssText = "padding: 8px; width: 320px; height: 240px;";
/* or */
el.className = "changed';

```

- 10. Javascript를 통해 리스트 추가시, DOM Fragment를 통해 추가
      <br/>--> 3개의 리스트 추가시, 한번에 하나씩 추가하면 최대 7개 리플로우 발생
      `<ul>`이 추가될 때 `<li>`3번 `텍스트 노드 3번`

```javascript
const flag = document.createDocumentFragment();
const ul = frag.appendChild(document.createElement("ul"));

for (let i = 1; i <= 3; i++) {
  li = ul.appendChild(document.createElement("li"));
  li.textContent = `item ${i}`;
}

document.body.appendChild(frag);
```

- 11. 캐쉬를 활용한 Reflow 최소화.
      <br/>--> 브라우

#### status : processing - 80%

출처 : https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md
