# Webkit-line-clamp (CSS Attribute)

## 블록 컨테이너의 콘텐츠를 지정한 줄 수 만큼 제한

`display` 속성을 `-webkit-box` 또는 `-webkit-inline-box`, 그리고, `-webkit-box-orient` 속성을 vertical로 설정한 경우에만 동작한다.

`overflow` 속성 값도 `hidden`으로 설정해야한다. 그래야 숨겨진다.

```css
/* 키워드 값 */
-webkit-line-clamp: none;

/* <integer> 값 */
-webkit-line-clamp: 3;
-webkit-line-clamp: 10;

/* 전역 값 */
-webkit-line-clamp: inherit;
-webkit-line-clamp: inhreit;
-webkit-line-clamp: unset;
```

`none`<br />
콘텐츠를 자르지 않습니다.

`<integer>`<br />
몇 줄 뒤에 콘텐츠를 자를지 지정합니다. 0보다 커야합니다.

<a href="" style="font-size:24px;
" target="_blank" >Open Demo</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=, initial-scale=1.0" />
    <title>Webkit-line-clamp</title>
    <style>
      p {
        width: 200px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <p>
      예제코드를 입력합니다. 지금부터 코드를 입력합니다. 상헌이의 코드가
      입력됩니다. 안녕하세요 김상헌입니다.
    </p>
  </body>
</html>
```

출처 : https://developer.mozilla.org/ko/docs/Web/CSS/-webkit-line-clamp
