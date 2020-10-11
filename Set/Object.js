// 강력함 순위
// 1. Object.freeze (조회 빼고 다안됨)
// 2. Object.seal (조회, 수정 빼고 다안됨)
// 3. Object.preventExtensions (객체 추가 빼고 다됨)

const action = {
  fly: function () {
    console.log("날다.");
  },
  eat: function () {
    console.log("먹다");
  },
};

Object.freeze(action); // enumerable을 제외하고 다 false 수정도, 추가도, 삭제도 안됌

action.fly = 123;
delete action.fly;
console.log(action);

const preventObj = {
  fly: function () {
    console.log("날다.");
  },
  eat: function () {
    console.log("먹다");
  },
};
preventObj.erin = "lee";

// 객체에 요소 추가하는거 빼고 다 된다.
Object.preventExtensions(preventObj); // 확장이 불가능하게 만들어준다. 하지만 삭제 수정됨

preventObj.sangheon = "kim";
delete preventObj.erin; // 삭제는 적용됨
console.log(preventObj);

const sealObj = {
  fly: function () {
    console.log("날다.");
  },
  eat: function () {
    console.log("먹다");
  },
};

Object.seal(sealObj); // 수정, 조회만 가능 삭제 추가 안됨
sealObj.fly = 123;
delete sealObj.fly;
sealObj.erin = "lee";
console.log(sealObj);
