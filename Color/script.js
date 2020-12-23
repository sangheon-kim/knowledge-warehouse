function main() {
  // canvas Elem을 querySelector를 이용해서 얻습니다.
  const canvas = document.querySelector("#glCanvas");
  // GL Context를 초기화 해줍니다. "webgl"을 getContext의 인수로 전달하여
  // WebGLRenderingContext를 호출해줍니다.
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black(0,0,0), Opacity는 1로 두어 검은색 블록을 만든다.
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;
