# Cookie & WebStorage

- 키와 값은 무엇이 들어와도 문자열로 변환되어 저장된다.

#### 1.1 로컬스토리지 (localStorage)

- 일부로 지우지 않는다면 브라우저를 닫고 열어도 계속 남아있다.
- window.localStorage
- 지속적으로 필요한 데이터 (자동 로그인 등)

#### 1.2 세션스토리지(sessionStorage)

- sessionStorage는 페이지의 window가 바뀌거나 브라우저 탭을 닫을 때 사라진다.
- 접근: window.sessionStorage
- 사용예제 : 잠깐 동안 필요한 정보(일회성 로그인 정보)

#### 1.3 공통 메소드

- setItem(키, 값): 저장 (이미 있으면 update)
- getItem(키): 조회
- removeItem(키): 삭제
- clear(): 전체 삭제

#### 1.4 공통 사용예제

- 글 작성 중간 중간에 잃어버리지 않기 위한 임시 저장용도
- 장바구니나 좋아하는 콘텐츠 등 수시로 변경되는 경우
- history를 저장하였다가 이동
- 그 외 서버에 반드시 저장할 필요가 있는 정보

### 2. 쿠키(cookie)를 다시보자

- 쿠키는 Web Storage가 나오기 이전에 브라우저에서 저장소 역할을 해왔다.
- 쿠키는 만료기한이 있는 key-value-Storage 이다.
- 쿠키는 하나의 도메인 페이지에서 최대 20개, 4KB의 용량제한이 있다.
- 매 요청마다 서버로 쿠기가 같이 전송(쿠키는 처음부터 서버와 클라이언트 간의 지속적인 데이터 교환을 위해 만들어짐)
  <br />--> 서버로 전송안해도되는 불필요한 데이터는 localStorage, sessionStorage에 저장하면된다.
- 접근 : document.cookie

### 3. DIFFERENCE

#### 2.1 쿠키 vs Web Storage

- 쿠키 데이터는 서버로 전송되지만, Web Storage의 데이터는 전송되지 않는다.
- 쿠키 데이터와 달리 Web Storage의 데이터는 반영구 저장이 가능하다.

#### 2.2 로컬 스토리지 vs 세션 스토리지

- 데이터유지 : 로컬스토치지는 clear, remove 하지 않는다면 영구 저장, 세션스토리지는 해당 페이지의 window 객체가 사라질때 사라진다.

```javascript
// A 페이지에서 저장
localStorage.setItem("name", "sangheon");
sessionStorage.setItem("name", "sangheon");
localStorage.getItem("name"); // "sangheon"
localStorage.getItem("name");
// "sangheon"

// 위와 같은 A 페이지이지만 다른 창 (NEW TAB)
localStorage.getItem("name");
// "sangheon"
sessionStorage.getItem("name");
// Null
```

출처:

- https://sjh836.tistory.com/162
- https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048
- https://velog.io/@ejchaid/localstorage-sessionstorage-cookie%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
