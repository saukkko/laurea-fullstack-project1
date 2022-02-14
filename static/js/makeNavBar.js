"use strict";

/**
 * @param  {NavElements[]} elements
 */
const createNavBar = (elements) => {
  // console.log(elements);

  const menuRoot = document.getElementById("menu");
  const div1 = document.createElement("div");
  const menuBrandToggle = document.createElement("div");
  const brandAnchor = document.createElement("a");
  const toggleAnchor = document.createElement("a");
  const toggleButton = document.createElement("span");

  const div2 = document.createElement("div");
  const menuDiv = document.createElement("div");
  const ul = document.createElement("ul");

  div1.classList = "pure-u-1-4 pure-u-md-1-8";
  div2.classList = "pure-u-1 pure-u-md-7-8";
  menuBrandToggle.className = "pure-menu";
  menuDiv.classList = "pure-menu pure-menu-horizontal custom-can-transform";

  brandAnchor.classList = "pure-menu-heading pure-menu-link custom-brand";
  brandAnchor.href = "/";
  brandAnchor.innerText = "Home";

  toggleAnchor.className = "custom-toggle";
  toggleAnchor.id = "toggle";
  toggleAnchor.href = "#";

  toggleButton.className = "material-icons";
  toggleButton.innerText = "menu";

  toggleAnchor.append(toggleButton);
  menuBrandToggle.append(brandAnchor, toggleAnchor);
  div1.append(menuBrandToggle);

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

  ul.append(...listItems);
  menuDiv.append(ul);
  div2.append(menuDiv);
  menuRoot.replaceChildren(div1, div2);
};

createNavBar([
  { href: "/guestbook", innerText: "Read guestbook" },
  { href: "/newmessage", innerText: "New message" },
  { href: "/ajaxmessage", innerText: "New message (ajax)" },
]);

/**
 * @typedef {Object} NavElements
 * @property {string} href
 * @property {string} innerText
 */
