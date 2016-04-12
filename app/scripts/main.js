'use strict';

$(document).ready(function () {
  var persons = ['和德哥', '和马伯里与麦迪逊', '和辅导猿', '和树……懒', '和宋仲基', '和sunshine', '和张士超', '和（未来的）男朋友', '和坐在你左边的人', '和小廌'];
  var places = ['在民法课上', '在二教的地下室', '在十四号楼的小树林里', '在主楼的广场', '在明理楼的复印店', '在C楼的理发店', '在室友的床上', '在文图的负二层', '在大礼堂的屋顶上', '在老馆的落地窗前'];
  var things = ['吃小桥', '吃香锅', '背太黄太厚', '唱甜蜜具现式', '刷阳光长跑', '一起找学生卡', '一起取快递', '唱校歌', '读case', '深夜截课'];
  var intervalFlag = true, interval = 0;

  $('body').keydown(function (event) {
    if (event.which === 32) {
      if (intervalFlag) {
        interval = setInterval(function () {
          $('.area1').text(persons[Math.floor(Math.random() * persons.length)]);
          $('.area2').text(places[Math.floor(Math.random() * places.length)]);
          $('.area3').text(things[Math.floor(Math.random() * things.length)]);
        }, 100);
        intervalFlag = false;
      } else {
        clearInterval(interval);
        intervalFlag = true;
      }
    }
  });
});
