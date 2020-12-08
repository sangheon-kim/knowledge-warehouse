function exclude(arr, fn, output = []) {
  if (!arr.length) {
    return output;
  }

  if (fn(arr[0])) {
    output.push(arr[0]);
  }

  return exclude(arr.slice(1), fn, output);
}

console.log(
  exclude([1, 2, 3, 4, 5, 6, 7, 8, 9], function (i) {
    return i % 2;
  })
);
