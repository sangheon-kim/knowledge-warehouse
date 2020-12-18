// 삼각함수 계산용 wrapper
const $circle = document.querySelector(".circle");
// 원형판
const $circleBoard = document.querySelector(".color-circle");
// 포인터 Element
const $point = document.querySelector(".point");
// 색조
const $hueInput = document.querySelector("#hue-input");
const $hueRange = document.querySelector("#hue-range");
// 채도
const $saturationInput = document.querySelector("#saturation-input");
const $saturationRange = document.querySelector("#saturation-range");
// 밝기
const $lightnessRange = document.querySelector("#lightness-range");
const $lightnessInput = document.querySelector("#lightness-input");
// 결과판
const $resultBoard = document.querySelector(".result-board");

// 정사각형이기때문에 중심좌표는 반지름이다.
const centerPoint = Math.floor($circleBoard.clientWidth / 2);
// 초기값으로 세팅해놓은 값으로 결과판의 색상 지정
changeResultBoard();

/**
 *
 * @description 360도 기준의 라디안 변형 공식
 * @param {*} degree (각독값 넣기)
 * @returns
 */
function degree2radian(degree) {
  degree -= 90;
  return (Math.PI / 180) * degree;
}

/**
 *
 * @description radian값을 각도로 바꿔주는 함수
 * @param {*} radian (라디안값 넣기)
 * @returns
 */
function radian2degree(radian) {
  return Math.abs((180 / Math.PI) * radian);
}

/**
 *
 * @description 밝기 변화 이벤트 핸들러 전달 콜백
 * @param {*} lightness
 */
function lightnessChange(lightness) {
  const $brightnessBoard = document.querySelector(".brightness-board");
  let count = Math.abs(lightness - 50);

  if (lightness > 50) {
    $brightnessBoard.style.background = `rgba(255,255,255,${0.5 + count * 0.01})`;
  } else if (lightness < 50) {
    $brightnessBoard.style.background = `rgba(0,0,0,${0.5 + count * 0.01})`;
  } else {
    $brightnessBoard.style.background = `transparent`;
  }

  changeResultBoard();
}

/**
 *
 * @description 색조 변화 이벤트 핸들러 전달 콜백
 * @param {*} hue
 */
function hueChange(hue) {
  // 현재 중심점 기준 점과의 거리 환산
  const radius = centerPoint * ($saturationInput.value / 100);

  const dx = centerPoint + radius * Math.cos(degree2radian(hue));
  const dy = centerPoint + radius * Math.sin(degree2radian(hue));

  $point.style.left = `${dx - 7.5}px`;
  $point.style.top = `${dy - 7.5}px`;
  changeResultBoard();
}

/**
 *
 * @description 채도 변화 이벤트 핸들러 전달 콜백
 * @param {*} saturation
 */
function saturationChange(saturation) {
  const distance = (centerPoint * saturation) / 100;

  const dx = centerPoint + distance * Math.cos(degree2radian($hueRange.value));
  const dy = centerPoint + distance * Math.sin(degree2radian($hueRange.value));

  $point.style.left = `${dx - 7.5}px`;
  $point.style.top = `${dy - 7.5}px`;
  changeResultBoard();
}

function registerEventListener(element, eventType, cb, type) {
  return element.addEventListener(eventType, function (e) {
    cb(e, type);
  });
}

/**
 *
 * @description 원의 방정식 구하기 (중심점 기준으로 좌표값의 위치 파악)
 * @author Sangheon Kim
 * @param {*} centerPoint 중심점
 * @param {*} offsetArray x,y 좌표 배열
 */
function circleEquation(centerPoint, offsetArray) {
  // 배열 비구조화 할당으로 꺼내기
  const [offsetX, offsetY] = offsetArray;
  // Math.pow로 x좌표와 중심좌표 뺀것 제곱하고 소수점 버리기
  const xDistance = Math.floor(Math.pow(offsetX - centerPoint, 2));
  // Math.pow로 y좌표와 중심좌표 뺀것 제곱하고 소수점 버리기
  const yDistance = Math.floor(Math.pow(offsetY - centerPoint, 2));
  // 결과값 제곱근 사용하여 결과값 도출하여 중심좌표에서 거리 계산하기
  let result = Math.floor(Math.sqrt(xDistance + yDistance));

  return result > centerPoint ? centerPoint : result;
}

/**
 * @description 결과펀애 색상 반영
 * @author Sangheon Kim
 * @returns
 */
function changeResultBoard() {
  hslToRgb();
  // const C = ()
  return ($resultBoard.style.backgroundColor = `hsl(${$hueRange.value}, ${$saturationRange.value}%, ${$lightnessRange.value}%)`);
}

/**
 * @description HSL to RGB
 *
 */
function hslToRgb() {
  const H = $hueRange.value;
  const S = $saturationRange.value / 100;
  const L = $lightnessRange.value / 100;

  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - C / 2;

  let R1, G1, B1;

  if (H >= 0 && H <= 60) {
    R1 = C;
    G1 = X;
    B1 = 0;
  } else if (H >= 60 && H < 120) {
    R1 = X;
    G1 = C;
    B1 = 0;
  } else if (H >= 120 && H < 180) {
    R1 = 0;
    G1 = C;
    B1 = X;
  } else if (H >= 180 && H < 240) {
    R1 = 0;
    G1 = X;
    B1 = C;
  } else if (H >= 240 && H < 300) {
    R1 = X;
    G1 = 0;
    B1 = C;
  } else {
    R1 = C;
    G1 = 0;
    B1 = X;

    console.log({ R1, m, C });
  }

  const [R, G, B] = [
    Math.floor((R1 + m) * 255),
    Math.floor((G1 + m) * 255),
    Math.floor((B1 + m) * 255),
  ];

  console.log({ R, G, B });

  rgbToHsl(R, G, B);
}

function rgbToHsl(R, G, B) {
  let H, S, L;
  // R`, G`, B` R` = R / 255, G` = G / 255, B` = B / 255
  const args = [R, G, B].map((item) => item / 255);

  const CMax = Math.max(...args);
  const CMin = Math.min(...args);
  const triangle = CMax - CMin;
  const maxIndex = args.lastIndexOf(CMax);
  console.log(maxIndex);

  L = (CMax + CMin) / 2;
  console.log(triangle);
  if (!!triangle) {
    switch (maxIndex) {
      case 0:
        H = 60 * Math.abs(((args[1] - args[2]) / triangle) % 6);
        break;
      case 1:
        H = 60 * ((args[2] - args[0]) / triangle + 2);
        break;
      case 2:
        H = 60 * ((args[0] - args[1]) / triangle + 4);
        break;
      default:
        break;
    }

    S = triangle / (1 - Math.abs(2 * L - 1));
  } else {
    H = 0;
    S = 0;
  }

  console.log({ H, S, L });
}

/**
 *
 * @description 거리값과 중심좌표와 현재 좌표값을 이용하여, 각도 계산 함수
 * @param {*} centerPoint
 * @param {*} offsetArray
 * @returns
 */
function useDistanceCalculateAngle(centerPoint, offsetArray) {
  const [offsetX, offsetY] = offsetArray;
  // 중심점에서 현재 원에서의 x좌표값
  const x = centerPoint - offsetX;
  // 중심점에서 현재 원에서의 y좌표값
  const y = centerPoint - offsetY;
  // radian 값 구하기
  let radian = Math.atan2(x, y);
  // radian 값 활용해서 각도 구하기
  const degree =
    offsetX < 117 ? Math.floor(360 - radian2degree(radian)) : Math.floor(radian2degree(radian));

  return degree;
}

/**
 *
 * @description input 이벤트 처리
 * @param {*} e
 * @param {*} type
 */
function inputEvent(e, type) {
  const value = Number(e.target.value);

  if (value > hslObj[type].maxNum) {
    hslObj[type].input.value = hslObj[type].maxNum;
    hslObj[type].range.value = hslObj[type].maxNum;
    hslObj[type]["cb"](hslObj[type].maxNum);
  } else {
    hslObj[type].input.value = value;
    hslObj[type].range.value = value;
    hslObj[type]["cb"](value);
  }
}
/**
 *
 * @description rangeInput 이벤트 처리
 * @param {*} e
 * @param {*} type
 */
function rangeEvent(e, type) {
  const value = e.target.value;

  hslObj[type].input.value = value;
  hslObj[type].range.value = value;
  hslObj[type]["cb"](value);
}

const hslObj = {
  hue: {
    maxNum: 360,
    minNum: 0,
    cb: hueChange,
    input: $hueInput,
    range: $hueRange,
  },
  lightness: {
    maxNum: 100,
    minNum: 0,
    cb: lightnessChange,
    input: $lightnessInput,
    range: $lightnessRange,
  },
  saturation: {
    maxNum: 100,
    minNum: 0,
    cb: saturationChange,
    input: $saturationInput,
    range: $saturationRange,
  },
};

$circleBoard.addEventListener("click", function (e) {
  let { offsetX, offsetY } = e;

  if (e.target.id !== "point") {
    // 클릭한 위치에 따라 위치 환산
    $point.style.left = `${offsetX - 7.5}px`;
    $point.style.top = `${offsetY - 7.5}px`;
    // $point.style.transform = "initial";

    // 거리는 원의 방정식을 이용해서 구해준다.
    let distance = circleEquation(centerPoint, [offsetX, offsetY]);
    // 포인터의 거리에 대한 반지름 비율 계산
    const pointerDistance = Math.floor((distance / centerPoint) * 100);

    $saturationInput.value = pointerDistance;
    $saturationRange.value = pointerDistance;

    const degree = useDistanceCalculateAngle(centerPoint, [offsetX, offsetY]);

    $hueInput.value = degree;
    $hueRange.value = degree;

    changeResultBoard();
  }
});

registerEventListener($hueInput, "input", inputEvent, "hue");
registerEventListener($hueRange, "input", rangeEvent, "hue");
registerEventListener($lightnessInput, "input", inputEvent, "lightness");
registerEventListener($lightnessRange, "input", rangeEvent, "lightness");
registerEventListener($saturationInput, "input", inputEvent, "saturation");
registerEventListener($saturationRange, "input", rangeEvent, "saturation");
