ymaps.ready(init);
var myMap;

function init(){
  myMap = new ymaps.Map ("map__api-id", {
    center: [59.938631, 30.323055],
    zoom: 15
  });

  myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    hintContent: 'Мы тут!',
    balloonContent: 'Это наш офис'
  });

  myMap.geoObjects.add(myPlacemark);
}
