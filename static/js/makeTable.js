"use strict";

fetch("/entries", { headers: { Accept: "application/json" } })
  .then((res) => res.text())
  .catch((err) => err)
  .then((data) => {
    const parent = document.getElementById("test");

    if (data instanceof Error) {
      parent.innerHTML = `<p>Error: ${data.message}</p>`;
      console.error(data);
      return;
    }

    if (!data) {
      parent.innerHTML =
        "<p>The guestbook is empty. <a href='/newmessage'>Write<a/> something</p>";
      return;
    }

    data = JSON.parse(data);

    const table = document.createElement("table");
    table.className = "pure-table";

    const thead = document.createElement("thead");
    const tr = thead.insertRow();

    const thCells = Object.keys(data[0]).map((x) => {
      const th = document.createElement("th");
      th.innerText = x;

      return th;
    });

    tr.replaceChildren(...thCells);

    const tbody = document.createElement("tbody");
    const rows = data.map((d) => {
      const tr = tbody.insertRow();

      Object.values(d).forEach((val) => {
        const cell = tr.insertCell();
        cell.innerText = val;

        return cell;
      });

      return tr;
    });

    tbody.replaceChildren(...rows);
    table.replaceChildren(thead, tbody);

    parent.replaceChildren(table);
  });
