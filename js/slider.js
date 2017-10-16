'use strict';

  // var slideIndex = 0; - Индекс элемента который подсвечиваем
  //  Ищем кол-во элементов в ul
  // Все элементы в массив закинуть
  // Если СлайдИдекс -1 то кол-во элементов присваивает (макс знач)
  // Если СлайдИндекс 5 то = 0


// Слайдер отзывов

var slideIndex = 1;
showSlides(slideIndex);

function plusFun(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("recall__item");
  var dots = document.getElementsByClassName("slider__button-g");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display= "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("slider__button--active", "");
  }

  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex - 1].style.flexDirection = "column-reverse";
  dots[slideIndex - 1].className+= "slider__button--active";
}

//

var tabletIndex = 2;
showTablet(tabletIndex);

function tabletSlide(x) {
  showTablet(tabletIndex = x);
}

function showTablet(x) {
  var i;
  var slidesTablet = document.getElementsByClassName("table__list-main");
  var dotsTablet = document.getElementsByClassName("slider__button-p");

  for (i = 0; i < dotsTablet.length; i++) {
    dotsTablet[i].className = dotsTablet[i].className.replace("slider__button--active", "");
  }

  if (tabletIndex == 1) {
    dotsTablet[tabletIndex - 1].className+= "slider__button--active";

    for (i = 0; i < slidesTablet.length; i++) {
      slidesTablet[i].className += " table__list-left";
      slidesTablet[i].className = slidesTablet[i].className.replace(" table__list-right", "");
    }
  }

  if (tabletIndex == 2) {
    dotsTablet[tabletIndex - 1].className+= "slider__button--active";

    for (i = 0; i < slidesTablet.length; i++) {
      slidesTablet[i].className = slidesTablet[i].className.replace(" table__list-left", "");
      slidesTablet[i].className = slidesTablet[i].className.replace(" table__list-right", "");
    }
  }

  if (tabletIndex == 3) {
    dotsTablet[tabletIndex - 1].className+= "slider__button--active";

    for (i = 0; i < slidesTablet.length; i++) {
      slidesTablet[i].className += " table__list-right";
      slidesTablet[i].className = slidesTablet[i].className.replace(" table__list-left", "");
    }
  }
}
