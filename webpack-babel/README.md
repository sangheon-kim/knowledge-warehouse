babek src/js -w -d dist/js

- -w : 타깃 폴더에 있는 모든 자바스크립트 파일들의 변경을 감지하여 자동으로 트랜스파일한다.
- -d : 트랜스파일링된 결과물이 지정될 폴더를 지정한다. 만약 지정된 폴더가 존재하지 않으면 자동생성한다.(--out-dir 옵션 축약형)

- webpack의 특징
  - Code Spliting(코드 분리) => 거대한 클라이언트 사이드 자바스크립트를 여러 파일로 나눠 쓸 수 있게 해준다.
  - javascript/css preprocessing => SASS나 LESS 등의 CSS preprocessor, typescript 등의 설정만 잘 해놓으면 webpack build 커맨드 하나로 빌드할 수 있다.
  - long term caching => Webpack은 파일 내용에 종속적인 해시값을 파일 이름 뒤에 덧붙임으로서 장기 캐싱을 도울 수 있다.
  - hot reloading => 서버가 돌아가는 중에 코드에 변경 사항이 생길 때마다 그 변경사항을 즉각 반영이 가능하다.

## Webpack 내부 기능

- entry 속성을 정의하는 방법은 여러가지가 있다.
-
