'use strict';

var buttonOpen = document.querySelector(".inner__toggle");
var nav = document.querySelector(".nav__box-w");

nav.classList.add("nav__box-w-wrapper");
nav.classList.add("nav__box-w--closed");

buttonOpen.addEventListener("click", function (evt) {
  evt.preventDefault();
  nav.classList.toggle("nav__box-w--closed");
  buttonOpen.classList.toggle("toggle__box-w--closed");
});
