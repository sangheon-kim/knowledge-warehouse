const promiseGet = (url) => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);

    xhr.send();
    xhr.onload = () =>
      xhr.status === 200
        ? res(JSON.parse(xhr.response))
        : rej(new Error(`${xhr.status}`));
  });
};
let url = "https://jsonplaceholder.typicode.com";
promiseGet(`${url}/posts/1`)
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then((userInfo) => console.log(userInfo))
  .catch((error) => console.error(error));

(async () => {
  const { userId } = await promiseGet(`${url}/posts/1`);
  const userInfo = await promiseGet(`${url}/users/${userId}`);

  console.log(userInfo);
})();
