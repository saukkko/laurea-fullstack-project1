"use strict";

window.onload = () => {
  const form = document.forms.item(0);
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const name = form.name.value;
    const country = form.country.value;
    const message = form.message.value;

    const formData = {
      name: name,
      country: country,
      message: message,
    };

    const payload = new URLSearchParams(formData).toString();

    fetch("/post", {
      body: payload,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      redirect: "manual",
    })
      .then(async (res) => {
        if (typeof res !== "undefined" && res instanceof Response)
          await import("/js/makeTable.js").then((x) => console.log(x));
      })
      .catch((err) => console.error(err));
  });
};
