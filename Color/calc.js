function calc() {
  r = document.calcform.r.value;
  g = document.calcform.g.value;
  b = document.calcform.b.value;
  if (r == "") r = 0;
  if (g == "") g = 0;
  if (b == "") b = 0;
  r = parseFloat(r);
  g = parseFloat(g);
  b = parseFloat(b);
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;
  if (r > 255) r = 255;
  if (g > 255) g = 255;
  if (b > 255) b = 255;
  hex = r * 65536 + g * 256 + b;
  hex = hex.toString(16, 6);
  len = hex.length;
  if (len < 6) for (i = 0; i < 6 - len; i++) hex = "0" + hex;
  r /= 255;
  g /= 255;
  b /= 255;
  M = Math.max(r, g, b);
  m = Math.min(r, g, b);
  d = M - m;
  if (d == 0) h = 0;
  else if (M == r) h = ((g - b) / d) % 6;
  else if (M == g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  l = (M + m) / 2;
  if (d == 0) s = 0;
  else s = d / (1 - Math.abs(2 * l - 1));
  s *= 100;
  l *= 100;
  document.calcform.h.value = h.toFixed(0);
  document.calcform.s.value = s.toFixed(1);
  document.calcform.l.value = l.toFixed(1);
  document.calcform.color.style.backgroundColor = "#" + hex;
}
// Create a new YUI instance and populate it with the required modules.
YUI().use("slider", function (Y) {
  // Slider is available and ready for use. Add implementation
  // code here.
  // Function to pass input value back to the Slider
  function updateSlider(e) {
    var data = this.getData(),
      slider = data.slider,
      value = parseInt(this.get("value"), 10);

    if (data.wait) {
      data.wait.cancel();
    }

    // Update the Slider on a delay to allow time for typing
    data.wait = Y.later(100, slider, function () {
      data.wait = null;
      this.set("value", value);
    });
    //calc();
  }

  // Function to update the input value from the Slider value
  function updateInput(e) {
    this.set("value", e.newVal);
    calc();
  }
  Slider1 = new Y.Slider({
    axis: "x",
    min: 0,
    max: 255,
    value: 0,
  });
  Slider2 = new Y.Slider({
    axis: "x",
    min: 0,
    max: 255,
    value: 0,
  });
  Slider3 = new Y.Slider({
    axis: "x",
    min: 0,
    max: 255,
    value: 0,
  });
  // Link the input value to the Slider
  Input1 = Y.one("#r");
  Input2 = Y.one("#g");
  Input3 = Y.one("#b");
  Input1.setData({ slider: Slider1 });
  Input2.setData({ slider: Slider2 });
  Input3.setData({ slider: Slider3 });
  // Pass the input as the 'this' object inside updateInput
  Slider1.after("valueChange", updateInput, Input1);
  Slider2.after("valueChange", updateInput, Input2);
  Slider3.after("valueChange", updateInput, Input3);
  Input1.on("keyup", updateSlider);
  Input2.on("keyup", updateSlider);
  Input3.on("keyup", updateSlider);
  // Render the Slider next to the input
  Slider1.render("#s1");
  Slider2.render("#s2");
  Slider3.render("#s3");
});
