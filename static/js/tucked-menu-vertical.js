"use strict";
/*
  Copyright (C) 2020? PureCSS / Seth Bertalotto https://github.com/redonkulus 

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.
*/

(function (window, document) {
  var menu = document.getElementById("menu"),
    WINDOW_CHANGE_EVENT =
      "onorientationchange" in window ? "orientationchange" : "resize";

  function toggleHorizontal() {
    menu.classList.remove("closing");
    [].forEach.call(
      document.getElementById("menu").querySelectorAll(".custom-can-transform"),
      function (el) {
        el.classList.toggle("pure-menu-horizontal");
      }
    );
  }

  function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains("open")) {
      menu.classList.add("closing");
      setTimeout(toggleHorizontal, 500);
    } else {
      toggleHorizontal();
    }
    menu.classList.toggle("open");
    document.getElementById("toggle").classList.toggle("x");
  }

  function closeMenu() {
    if (menu.classList.contains("open")) {
      toggleMenu();
    }
  }

  document.getElementById("toggle").addEventListener("click", function (e) {
    toggleMenu();
    e.preventDefault();
  });

  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);
