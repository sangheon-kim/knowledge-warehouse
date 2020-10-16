const { get } = require("core-js/fn/dict");

{
  const base = {
    title: "책",
  };

  const sub = {
    __proto__: base,
    value: "javascript",
    get() {
      return this.value + super.title;
    },
  };

  console.log(sub);
}

{
  function Base(title) {
    this.title = title;
  }

  Base.prototype.getTitle = function () {
    return this.title;
  };

  const base = new Base();

  console.log(base.hasOwnProperty("title"));
  console.log(Object.getPrototypeOf(base));
}
