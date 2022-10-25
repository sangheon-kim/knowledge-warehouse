# 브라우저 성능 개선

- 여러 개의 분리된 파일을 병합해서, 로딩되도록 하ㅕㄴ, 병합된 파일의 수만큼 Http Request수를 줄일 수 있어, 초기 로딩속도를 개선할 수 있다.

## 1. Request 요청 수 감소.

### 1.1 Domain Sahrding

- Domain당 병렬적으로 연결할 수 있는 connection 수는 정해져 있다.
- 브라우저는 도메인 별 한번에 처리할 수 있는, 요청의 개수가 제한되어 있어, 페이지 내 리소스가 단일 도메인에서만 요청되는 경우 병목현상 발생.
- 여러 개의 다른 도메인에서 리소를 다운로드 받도록 처리하면 병목현상 제거 가능.

### 1.2 자원의 Merge

- 여러개의 스크립트를 별도의 request로 load하지 않고, 하나의 request로 로딩.
- 이미지 역시 스프라이트 이미지로 처리 가능.

### 1.3 DataURI Scheme

- 작은 용량의 파일을 문서에 인라인으로 삽입할 수 있도록 한다.
- src에 이미지 데이터 문자열로 삽입을 하게되면, 자체가 데이터이기 때문에 외부 데이터 요청이 일어나지 않아, request 요청이 일어나지 않는다.
- 이미지 자체는 binary data인데, base64로 encoding하여, 문서에 삽입돼 출력할 수 있다.

* DataURI는 캐싱되지 않는다. (단점)
* 별도로 encoding 해주는 작업이 필요하다.
* 캐싱처리가 필요 없는 경우에 적용하면 좋다.

### 1.4 Lazy loading

- 현재 필요 없는 자원을 onload 이후나, 화면에 노출되는 시점에 자원을 불러들이는 방법. 초기 로딩속도를 개선할 수 있다.
- 당장 사용자가 사용하지 않을 것으로 기대되는 데이터와 보이지 않는 영역의 데이터는 사용자의 액션시점 이후 또는 해당 요소가 보이기 직전에 로딩한다.

### 1.5 Code Splitting

- 페이지 로딩 시점에 사용되지 않는, 코드들을 별도의 chunk 파일로 분리하면 초기 로딩이 되는 request의 용량이 줄어든다.

* 하지만, 불필요한 code splitting 은 오히려 자원이 늘어날 수 있다.

## 2. 리소스 크기 줄이기

### 2.1 Minify

- 공백제거, 주석제거를 하여 크기를 줄일 수 있다.

### 2.2 Obfusacation

- 변수명을 변경하여, 크기를 줄일 수 있다.

### 2.3 이미지 최적화의 필요성

- PNG
- JPEG
- 기기에 대응되는 적절한 크기의 이ㅣ지 사용
- src set을 통해서 pixel ratio에 맞는 이미지 사용.
- Encode : 그래픽 프로그램 등을 통해 RGB의 값을 이미지 데이터로 변환
- Decode : 이미지 데이터를 RGB로 변환하는 과정.
- 출력 과정 : Request -> Decode -> Copy to GPU -> Display
- 고해상도 디스플레이 대응을 위해 큰 이미지를 작은 사이즈로 지정해 출력하는 경우 decoding 비용이 원래 크기로 출력하는 것보다 많은 비용 발생.

```html
<img src="image2.jpg" srcset="image1.jpg 1x, image.jpg 2x, image.jpg 3x" width="160" height="107" />
```

3. 역할에 비해 과도하게 큰 이미지 사용 X
4. 이미지 metadata

- 실제 이미지 표현과 관련 없는 메타 정보 존재.
- 표현에 불필요햔 메타 정보 제거

5. 이미지 최적화 도구 등을 사용해서 용량 감소
6. 포토인프라를 사용해, 이미지 delivery를 최적화.

- thumbnail 생성과 이미지 quality 등을 필요에 따라 delivery 받을 수 있다.
- 불필요한 meta 정보 제거
- 이미지 포맷 변환 (원본 이ㅣ지 포맷과 다른 출력 포맷)
- 이미지 압축(JPG경우 -기본 90%)

### 2.4 HTTP 헤더에서 불필요한 값 제거

- 모든 request에는 cookie가 같이 전달되어 network 오버헤드가 발생.
- 정적인 파일의 경우, cookie-free 도메인 이용하는 것이 좋다.
- pstatic.net을 이용해서, 불필요한 cookie 전송을 HTTP 헤더에서 제거할 수 있다.

### 2.5 Tree-Shaking: Dead Code Elimination

- ES6 모듈 사용시, 사용하는 것만 import 하여 번들 사이즈 감소

* Webpack에서 tree-shaking 적용
  > 1.  ES6모듈 syntax 사용 (import export)
  > 2.  package.json에 side-effects 속성 설정
  > 3.  mode: production

```md
babel-prerset-env

es6를 자동으로 commonjs 변환

commonjs 형식은 웹팩이 어떤 모듈이 사용중인지 판단하여 제거하기가 어렵다.

.babelrc에서 commonjs로 변환하지 못하도록 설정 추가핮

{
"presets": [
["env", {
"modules": false
}]
]
}

webpack-common-shake
module.exports 같은 commonJS 형식으로 export된 모듈을 쉐이킹할 수 있다.

제일 안전한건 es6 모듈을 사용하는 것이 제일 좋다.
```

Chrome Dev Tools의 Main Section

Chrome Dev Tools의 Main Section을 확인하면, 프레임 단위로 볼 수 있다. 함수가 언제 시작해서 언제 끝났는지도 확인이 가능하다.

오래 걸린다면, 마이크로하게 나눠서 web Worker를 활용해서, 메인 스레드의 프레임 타임을 확보해주는 것도 좋다.

### 출처

- https://web.dev/origin-agent-cluster/
- https://sksms17456.github.io/sidemenu/ui/2020-01-21-improve_performance/
- https://developer.chrome.com/docs/devtools/evaluate-performance/
