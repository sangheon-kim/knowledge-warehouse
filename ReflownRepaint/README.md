# Reflow & Repaint

출처 : https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md

<b>브라우저의 동작 과정</b>

- Reflow & Repaint의 개념을 이해하기전에 브라우저의 동작 과정에 대해 먼저 이해해보자.
- <a href="https://github.com/sangheon-kim/knowledge-warehouse/tree/master/Browser">브라우저의 동작 과정</a>

<b>Repaint</b>

- 레이아웃에는 영향을 주지 않지만, 가시성에는 영향을 주는 영향을 주는 엘리먼트 변경시 발생
  ex) <code>opacity</code>, <code>background-color</code>, <code>visibility</code>, <code>outline</code>

<b>Reflow</b>

- 모든 엘리먼트의 위치와 길이 등 다시 계산하는 것 문서의 일부 혹은 전체를 다시 렌더링 하는 것.
