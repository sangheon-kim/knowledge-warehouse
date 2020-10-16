# 쿠키와 document.cookie

- 주로 웹서버에 의해 만들어진다. 응답 헤더의 Set-Cookie에 내용을 넣어 전달하면, 브라우저는 해당 내용을 브라우저에 저장한다. 브라우저는 쿠키를 생성하도록한 동일 서버에 접속할 때마다, 쿠키 내용을 Cookie 요청 헤더에 넣어 전달

## 쿠키는 클라이언트 식별과 같은 인증에 가장 많이 쓴다.

- 1. 사용자가 로그인하면 서버는 HTTP 응답 헤더의 Set-Cookie에 담긴 "세션 식별자(session identifier)" 정보를 사용해 쿠키를 설정
- 2. 사용자가 동일 도메인에 접속하려고 하면 브라우저는 HTTP Cookie 헤더에 인증 정보가 담긴 고유값(세션 식별자)을 함께 실어 서버에 요청을 보낸다.
- 3. 서버는 브라우저가 보낸 요청 헤더의 세션 식별자를 읽어 사용자를 식별한다.

## 쿠키 읽기

- 지금 보고 있는 사이트와 관련된 쿠키가 브라우저에 저장되어있는지 알아보자.

```javascript
// "_ga=GA1.2.576730167.1595822361; _ym_uid=159582236350292173; _ym_d=1595822363; pixelRatio=2; _gid=GA1.2.360239802.1602507957"
alert(document.cookie);
```

## 쿠키 쓰기

- document.cookie는 getter와 seeter를 가지고있지만, setter시에 기존에 쿠키값은 건드리지 않고, 새로 추가한다.

```javascript
document.cookie = "123";
// "_ga=GA1.2.576730167.1595822361; _ym_uid=159582236350292173; _ym_d=1595822363; pixelRatio=2; _gid=GA1.2.360239802.1602507957; 123"
```

- 쿠키는 형식이 정해져있다. name=value 형식이다.
  따라서 세팅을 해줄때에 encodeURIComponent를 사용하여 이름과 값을 이스케이프 처리해줘야한다.

```javascript
let name = "my name";
let value = "John Smith";

document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
// my%20name=John%20Smith"
```

- name=value 쌍은 4KB를 넘을 수 없다. 4KB가 넘는 것은 쿠키 저장 불가
- 평균적으로 도메인 하나당 저장할 수 있는 쿠키 개수는 20여개 정도로 한정되어 있다.

### 쿠키 옵션

#### path

\*\* path=/mypath

- 하위도메인에서는 볼 수 있지만. /에서는 볼 수 없어진다. (default = 현재 도메인이다.) 가급적 루트 도메인을 사용하여, 어디서든 사용할 수 있게 세팅해주는것이 좋다.

#### domain

- domain설정을 따로하지 않았다면 쿠키 설정한 도메인에서만 쿠키를 접근할 수 있다. (other.com에서 접근 불가), 서브 도메인에서도 쿠키정보 얻을 수 없다.

\*\* domain=site.com

- forum.site.com같은 서브도메인에서 접근이 가능해진다.

```javascript
// site.com에서
// 서브 도메인(*.site.com) 어디서든 쿠키에 접속하게 설정할 수 있습니다.
document.cookie = "user=John; domain=site.com";
// forum.site.com와 같은 서브도메인에서도 쿠키 정보를 얻을 수 있습니다.
alert(document.cookie); // user=John 쿠키를 확인할 수 있습니다.
```

#### expires와 max-age

- expires나 max-age옵션 지정이 안되어있으면, 브라우저가 닫힐 떄 쿠키도 함께 삭제된다 = (세션 쿠키)
- 쿠키 유효일자는 무조건 GMT 포맷

- expires(만료일 지정)

```javascript
// 지금으로부터 하루 후 expires는 날짜로 지정해준다.
let date = new Date(Date.now() + 86400000);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

- max-age (경과 시간 설정)

```javascript
// max-age는 초단위다.
document.cookie = "user=John; max-age=3600';
document.cookie = "user=john; max-age=0'; // 바로 삭제
```

#### secure

- HTTPS로 통신하는 경우에만 쿠키가 전송된다.

```javascript
document.cookie = "user=john; secure";
```

#### samesite

- XSRF(Cross-Site request forgery, XSRF) - 크로스 사이트 요청 위조 공격을 막기 위해 만들어짐.

### XSRF 공격(크로스 사이트 요청 위조 공격)

- 로그아웃 하지 않고, 다른 창을 띄워서 웹서핑을 하던 도중에, 다른 도메인에서, 이전에 로그아웃하지 않은 사이트의 송금 요청 폼을 자동 제출하도록 설정해놓으면 인증 쿠키가 함께 전송된다.
- 실제 은행에서는 XSRF 보호 토큰이라는 특수 필드를 넣어 막고 있다. 모든 폼마다 보호 토큰을 세팅해줘야하는 시간이 많이 든다.

#### samesite 옵션(구형 브라우저에서까지 대응할려면 XSRF 보호 토큰이라는 특수 필드를 꼭 넣어줘야한다.)

- default<br />
  \*\* samesite=strict(default)
- 사용자가 사이트 외부에서 요청 보낼 때, strict 옵션이 있는 쿠키는 절대 전송하지 않는다. 메모장 등에 bank.com에 요청을 보낼 수 있는 링크를 기록해 놓았다가, 해당 링크를 클릭해 접속시 bank.com이 사용자를 인식하지 못하는 상황이 발생한다.

\*\* samesite=lax

- 사용자 경험을 해치지 않으면서, XSRF 공격을 막을 수 있는 접근법

- strict와 동일하게, 외부에서 요청 보낼때 브라우저가 쿠키를 보내는 걸 막아준다. (예외사항 존재)
- "안전한" HTTP 메서드인 경우(예: GET 방식) - 읽기 작업만 수행가능
- 작업이 최상위 레벨 탐색에서 이루어질 때(브라우저 주소창에서 URL을 변경하는 경우)

```
<iframe>은 해당안된다
```

- 하지만, 외부 사이트에서 AJAX 요청을 보내거나, 폼을 전송하는 등의 복잡한 작업 시도시 쿠키 전송 X

#### httpOnly

- Set-Cookie 헤더를 이용해 쿠키를 설정할 때 지정할 수 있다.
- 이 옵션이 붙어있으면, document.cookie를 통해 쿠키를 볼 수도 없고, 조작도불가능

#### 서드 파티 쿠키

- 다른 도메인에서 설정한 쿠키를 서드 파티 쿠키라고 부른다.

#### GDPR

- 쿠키를 이용한 사용자 추적, 식별을 한다면, 사용자의 동의를 반드시 얻어야 한다.
