"use strict";

/**
 * @param  {NavElements[]} elements
 */
const createNavBar = (elements) => {
  // console.log(elements);

  const menuElement = document.getElementById("menu");
  const menuDiv = document.createElement("div");
  const menuHeading = document.createElement("a");
  const ul = document.createElement("ul");

  menuDiv.classList = "pure-menu pure-menu-horizontal";
  menuHeading.classList = "pure-menu-heading pure-menu-link";
  menuHeading.href = "/";
  menuHeading.innerText = "Home";
  ul.className = "pure-menu-list";

  const listItems = elements.map((element) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.className = "pure-menu-item";
    a.className = "pure-menu-link";

    a.href = element.href;
    a.innerText = element.innerText;

    li.appendChild(a);
    return li;
  });

  ul.replaceChildren(...listItems);
  menuDiv.appendChild(menuHeading);
  menuDiv.appendChild(ul);

  menuElement.appendChild(menuDiv);
};

createNavBar([
  { href: "/guestbook", innerText: "Guestbook" },
  { href: "/newmessage", innerText: "New message" },
  { href: "/ajaxmessage", innerText: "New message (ajax)" },
]);

/**
 * @typedef {Object} NavElements
 * @property {string} href
 * @property {string} innerText
 */
