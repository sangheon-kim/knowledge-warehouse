(() => {
  // const boxes = document.getElementsByClassName("box");

  const boxGroup = document.getElementById("box-group");

  function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
  }

  function onClick(e) {
    if (e.target !== e.currentTarget) {
      const code = e.target.getElementsByTagName("code")[0];

      if (!!code) {
        copyToClipboard(code.textContent.trim());
      }
    }
  }

  boxGroup.onclick = onClick;
})();
