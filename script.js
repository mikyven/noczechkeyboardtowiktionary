const input = document.querySelector(".redirect_input");
const link = document.querySelector(".wiktionary_link");
const changing = {
  a: "á",
  c: "č",
  d: "ď",
  e: ["é", "ě"],
  i: "í",
  n: "ň",
  o: "ó",
  r: "ř",
  s: "š",
  t: "ť",
  u: ["ú", "ů"],
  y: "ý",
  z: "ž",
  A: "Á",
  C: "Č",
  D: "Ď",
  E: ["É", "Ě"],
  I: "Í",
  N: "Ň",
  O: "Ó",
  R: "Ř",
  T: "Ť",
  U: ["Ú", "Ů"],
  Y: "Ý",
  Z: "Ž",
};
let isAltClicked = false;
let count = 0;

input.addEventListener("keydown", (e) => {
  e.stopImmediatePropagation();
  const changeable = Object.keys(changing);

  if (e.key === "Enter") {
    link.href = `https://en.wiktionary.org/wiki/${input.value}`;
    link.click();
  }

  if (e.key === "Alt") {
    isAltClicked = true;
  }

  if (isAltClicked && changeable.includes(e.key)) {
    // Preventing browser from launching an unpredicted hotkey action
    e.preventDefault();
    let translated = changing[e.key];
    let value = input.value;
    // Checking if there are multiple variants of the pressed letter
    if (translated.length > 1) {
      translated = changing[e.key][count];
      if (count > 0) {
        value = value.slice(0, -1);
        count = 0;
      } else {
        count++;
      }
    }
    input.value = value + translated;
  }
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Alt") {
    isAltClicked = false;
    count = 0;
  }
});
