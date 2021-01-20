# Animation과 Transition 차이

## CSS Transition

- transition
- transition-delay
- transition-duration
- transition-timing-function

```scss
.box {
  width: 100px;
  height: 100px;
  background-color: #777;
  cursor: pointer;
  // transition: width 1s ease 1s;
  // 위와 동일한 결과를 낸다.
  transition-property: width;
  transition-delay: 2s;
  transition-duration: 1s;
  transition-timing-function: ease;

  &:hover {
    width: 200px;
    height: 200px;
    background-color: yellow;
  }
}
```
