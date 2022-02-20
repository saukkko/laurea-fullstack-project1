"use strict";
import { renderTable } from "/js/makeTable.js";

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
      .then((res) => {
        if (res instanceof Response) {
          //todo: could check further if response is ok but what would happen then? display error?
          console.log("res.type", res.type);
          renderTable();
        }
      })
      .catch((err) => console.error(err));
  });
};
