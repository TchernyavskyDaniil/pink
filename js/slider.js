'use strict';

var buttonFirst = document.querySelector(".slider__button-first");
var buttonSecond = document.querySelector(".slider__button-second");
var buttonThird = document.querySelector(".slider__button-third");

var sliderSecond = document.querySelector(".recall__item-second");
var sliderFirst = document.querySelector(".recall__item-first");
var sliderThird = document.querySelector(".recall__item-third");

buttonSecond.addEventListener("click", function (evt) {
  evt.preventDefault();

  sliderSecond.classList.add("recall__item--active");
  buttonSecond.classList.add("slider__button--active");

  sliderFirst.classList.remove("recall__item--active");
  buttonFirst.classList.remove("slider__button--active");

  sliderThird.classList.remove("recall__item--active");
  buttonThird.classList.remove("slider__button--active");
})

buttonFirst.addEventListener("click", function (evt) {
  evt.preventDefault();

  sliderFirst.classList.add("recall__item--active");
  buttonFirst.classList.add("slider__button--active");

  sliderSecond.classList.remove("recall__item--active");
  buttonSecond.classList.remove("slider__button--active");

  sliderThird.classList.remove("recall__item--active");
  buttonThird.classList.remove("slider__button--active");
})

buttonThird.addEventListener("click", function (evt) {
  evt.preventDefault();

  sliderThird.classList.add("recall__item--active");
  buttonThird.classList.add("slider__button--active");

  sliderSecond.classList.remove("recall__item--active");
  buttonSecond.classList.remove("slider__button--active");

  sliderFirst.classList.remove("recall__item--active");
  buttonFirst.classList.remove("slider__button--active");
})



// var secondSlider = document.querySelector(".lol");
// var firstSlider = document.querySelector(".kek");
//
// buttonSecond.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   secondSlider.classList.add("recall__item--active");
//   buttonSecond.classList.add("slider__button--active");
//   buttonFirst.classList.remove("slider__button--active");
//   firstSlider.classList.remove("recall__item--active");
// })

