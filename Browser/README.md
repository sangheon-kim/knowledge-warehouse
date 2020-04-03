# 브라우저의 동작 과정

### 브라우저의 주요 기능

- 사용자가 선택한 자원을 서버에 요청하고 브라우저에 표시하는 것. => 자원의 주소는 URI(Uniform Resource Identifier)에 의해 정해진다.

### 브라우저의 기본 구조

<ol>
  <li>사용자 인터페이스 - 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분이다</li>
  <li>브라우저 엔진 - 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어</li>
  <li>렌더링 엔진 - 요청한 콘텐츠를 표시. 예를 들어 HTML을 요청하면 HTML과 CSS를 파싱하여 화면에 표시함.</li>
  <li>HTTP 요청과 같은 네트워크 호출에 사용됨. 이것은 플랫폼 독립적인 인터페이스이고 각 플랫폼 하부에서 실행됨.</li>
  <li>UI 백엔드 - 콤보 박스와 창 같은 기본적인 장치를 그림. 플랫폼에서 명시하지 않은 일반적인 인터페이스로서, OS 사용자 인터페이스 체계를 사용.</li>
  <li>자바스크립트 해석기 - 자바스크립트 코드를 해석하고 실행.</li>
  <li>자료 저장소 - 이 부분은 자료를 저장하는 계층이다. 쿠키를 저장하는 것과 같이 모든 종류의 자원을 하드 디스크에 저장할 필요가 있다. HTML5 명세에는 브라우저가 지원하는 '웹 데이터 베이스'가 정의되어 있다.</li>
</ol>

### 렌더링 엔진

- 요청받은 내용을 브라우저 화면에 표시하는 일
- 크롬, 사파리 - Webkit Engine
- 파이어폭스 - Gecko Engine

### 동작 과정

-- 1. DOM 트리 구축을 위한 HTML 파싱<br />
-- 2. 렌더 트리 구축<br />
-- 3. 렌더 트리 배치<br />
-- 4. 렌더 트리 그리기<br />

- 렌더 트리(Gecko - 형상 트리) - 스타일 정보와 HTML 표시 규칙에 의해 생성, 색상 또는 면적과 같은 시각적 속성이 있는 사각형을 포함하고 있다. 정해진 순서에 의해 렌더링

- 렌더 트리 배치(Gecko - reflow) - 각 노드가 화면의 정확한 위치에 표시되는 것.

- 렌더 트리 그리기 - 나머지 내용의 전송을 기다리면서, 먼저 받은 내용들을 화면에 그려 넣어준다.

### 파싱과 DOM 트리 구축

<strong>파싱 일반</strong>

<p>브라우저가 코드를 이해하고 사용할 수 있는 구조로 변환 => res) <code>파싱 트리(parse tree)</code> or <code>문법 트리(Syntax tree)</code>라고 부른다. </p>

<strong>문법</strong>

<p>
  파싱은 문서에 작성된 언어 또는 형식의 규칙에 따르는데 파싱할 수 있는 모든 형식은 정해진 용어와 구문 규칙에 따라야 한다. => <strong>문맥 자유 문법</strong>
</p>

<strong>DOM</strong>

<p>파싱 트리는 DOM 요소와 속성 노드의 트리로, 출력 트리가 된다. HTML 문서의 객체 표현, 외부로 향하는 자바스크립트 같은 HTML 요소의 연결 지점 트리의 최상위 객체는 <code>문서</code></p>

```html
<html>
  <body>
    <p>Hello World</p>
    <div><img src="" /></div>
  </body>
</html>
```

<pre>
  * DOM 트리 구조 * 
 ├── <b>HTMLhtmlElement                  * HTML Element </b>
 │    ├── HTMLBodyElement             *  바디 태그
 │         ├── HTMLParagraphElement   *  p태그
 │              ├── text              *  text
 │         ├── HTMLDivElement         *  Div태그
 │              ├── Image             *  image 태그
 └── webpack.config.js                * webpack 설정
 </pre>

<strong>HTML 파싱 과정</strong>
<br />
<img src="./image/htmlparse.png">

#### 토큰화 알고리즘

```html
<html>
  <body>
    Hello World
  </body>
</html>
```

- 초기 상태 - 자료 상태
- 태그 열림 상태 - <code><</code> 문자를 만났을때
- 태그 이름 상태 - <code>[A~Z]</code> 문자를 만났을떄
- 자료 상태로 돌아감 - <code>></code> 문자를 만났을때

##### Status : Processing - 30%

출처 : https://d2.naver.com/helloworld/59361
