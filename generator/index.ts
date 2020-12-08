export const data = [
  {
    id: "a1",
    name: "가나다",
    age: 60,
    children: [
      {
        id: "a2",
        name: "가너다",
        age: 30,
        children: [
          {
            id: "a3",
            name: "가너도",
            age: 10,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "b1",
    name: "라나다",
    age: 60,
    children: [
      {
        id: "b2",
        name: "라마다",
        age: 31,
        children: [],
      },
    ],
  },
];

const find = (function () {
  let res: any = [];

  return function closure(obj: Array<any>, value: string) {
    obj.forEach((item) => {
      item.id === value ? res.push(item) : closure(item.children, value);
    });

    return res;
  };
})();
const result = find(data, "a3");

console.log(result);
