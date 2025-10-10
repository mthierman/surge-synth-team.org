import surge_release from "./modules/surge_release.ts";

const nightly = surge_release("windows", "nightly");
console.log(nightly);

const stable = surge_release("windows", "stable");
console.log(stable);
