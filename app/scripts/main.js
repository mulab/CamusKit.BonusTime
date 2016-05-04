'use strict';

$(document).ready(function () {
  var $body = $('body'), $window = $(window);

  $body.css('width', $window.innerWidth()).css('height', $window.innerHeight());
  $window.resize(function () {
    $body.css('width', $window.innerWidth()).css('height', $window.innerHeight());
  });

  var persons = ['和风', '细雨', '暖阳', '烈日', '大雾', '大风', '暴雨', '雷雨', '多云', '冰雹'];
  var places = ['渤海', '黄海', '东海', '南海', '黑海', '红海', '里海', '北冰洋', '加勒比', '池塘'];
  var things = ['帆船', '游轮', '货轮', '战舰', '油船', '散货船', '集装箱船', '塑料板', '竹筏', '救生圈'];
  var intervalFlag = 0, interval1 = 0, interval2 = 0, interval3 = 0;

  $body.keydown(function (event) {
    if (event.which === 32) {
      if (!intervalFlag) {
        interval1 = setInterval(function () {
          $('.area1').text(persons[Math.floor(Math.random() * persons.length)]);
        }, 100);
        interval2 = setInterval(function () {
          $('.area2').text(places[Math.floor(Math.random() * places.length)]);
        }, 100);
        interval3 = setInterval(function () {
          $('.area3').text(things[Math.floor(Math.random() * things.length)]);
        }, 100);

        intervalFlag = 1;
      } else if (intervalFlag === 1) {
        clearInterval(interval1);
        intervalFlag = 2;
      } else if (intervalFlag === 2) {
        clearInterval(interval2);
        intervalFlag = 3;
      } else if (intervalFlag === 3) {
        clearInterval(interval3);
        intervalFlag = 0;
      }
    }
  });
});
