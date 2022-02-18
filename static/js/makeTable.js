"use strict";
fetch("/entries", { headers: { Accept: "application/json" } })
  .then((res) => res.text())
  .catch((err) => err)
  .then((data) => {
    const parent = document.getElementById("table");

    if (data instanceof Error) {
      parent.innerHTML = `<p>Error: ${data.message}</p>`;
      console.error(data);
      return;
    }

    if (!data) {
      parent.replaceChildren(
        (document.createElement("p").innerHTML =
          "<p>The guestbook is empty. <a href='/newmessage'>Write<a/> something</p>")
      );
      return;
    }
    /** @type {GuestbookData[]} */
    const guestbookData = JSON.parse(data);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.className = "pure-table";

    const headerNames = ["Name", "Country", "Message"];
    const headers = headerNames.map((headerName) => {
      const th = document.createElement("th");
      th.innerText = headerName;

      return th;
    });

    thead.insertRow().append(...headers);

    tbody.append(
      ...guestbookData.map((o) => {
        const tr = document.createElement("tr");

        tr.append(
          ...Object.values(o).map((x, i) => {
            const td = document.createElement("td");
            td.dataset.label = headerNames[i];
            td.textContent = x;

            return td;
          })
        );

        return tr;
      })
    );

    table.append(thead, tbody);
    parent.replaceChildren(table);
  });

/**
 * @typedef {Object} GuestbookData
 * @property {string} name
 * @property {string} country
 * @property {string} message
 */
