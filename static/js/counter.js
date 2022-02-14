const textarea = document.getElementById("messagefield");
const counter = document.getElementById("counter");

const handleChange = (e) => {
  const len = e.target.value.length;
  counter.innerText = `${len}/2000`;
  if (len > 2000) textarea.value = e.target.value.slice(0, 2000);
};

textarea.oninput = handleChange;
textarea.onchange = handleChange;
textarea.onkeyup = handleChange;
