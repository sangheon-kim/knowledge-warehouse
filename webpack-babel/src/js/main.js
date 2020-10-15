import "es5-shim";
import "core-js";
import { pi, power, Foo, paddingStr } from "./lib";

console.log(pi);
console.log(power(pi, pi));
console.log(paddingStr("123"));
const f = new Foo();
console.log(f.foo());
console.log(f.bar());
