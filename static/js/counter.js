"use strict";
const textarea = document.getElementById("messagefield");
const counter = document.getElementById("counter");
const MAX = 500;

counter.innerText = `0/${MAX}`;

const handleChange = (e) => {
  const len = e.target.value.length;
  counter.innerText = `${len}/${MAX}`;
  if (len > MAX) textarea.value = e.target.value.slice(0, MAX);
};

textarea.oninput = handleChange;
textarea.onchange = handleChange;
textarea.onkeyup = handleChange;
