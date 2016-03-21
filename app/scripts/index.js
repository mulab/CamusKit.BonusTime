'use strict';

$(document).ready(function () {
  // $.getJSON('scripts/data.json', function (data) {
  //   console.log(data['range']);
  // });

  var minNum = 0, maxNum = 999, size = 3;

  var getRandomNum = function (minNum, maxNum, size) {
    var str = Math.round(Math.random() * (maxNum - minNum + 1) + minNum).toString();
    while (str.length < size) str = '0' + str;
    return str.split('');
  };

  var toggleShape = function () {
    $('#shape').toggleClass('ring').toggleClass('cube');
  };

  var toggleBetweenNumAndCube = function (ringNum, cubeNum) {
    var $shape = $('#shape');
    $shape.toggleClass('ringShow_' + ringNum).toggleClass('cubeShow_' + cubeNum);
    $shape.css('-webkit-transform', 'rotateY(' + (-36 * ringNum) + 'deg)');
  };

  var toggleJump = function (num) {
    $('#card' + num).toggleClass('jump' + num);
  };

  var displayNum = function (cardNum, showNum) {
    $('#num' + cardNum).text(showNum);
  };

  var numJump = function (num) {
    $('#num' + num).toggleClass('jumpDown');
  };

  var showNumByTurn = function (times, targetNum, originNum) {
    toggleShape();
    toggleBetweenNumAndCube(targetNum, originNum);
    setTimeout(function () {
      toggleJump(numArr[times]);
      setTimeout(function () {
        displayNum(times + 1, numArr[times]);
        numJump(times + 1);
        toggleShape();
        toggleBetweenNumAndCube(targetNum, targetNum);
        toggleJump(numArr[times]);
      }, 1100);
    }, 3300);
  };

  var clearNum = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      numJump(i);
      $('#num' + (i + 1)).text('');
    }
  };

  var numArr = getRandomNum(minNum, maxNum, size);
  var pressTimes = 0, preNum = 0;
  $('body').keydown(function (event) {
    if (event.which === 32) {
      if (pressTimes < numArr.length) {
        showNumByTurn(pressTimes, numArr[pressTimes], preNum);
        preNum = numArr[pressTimes];
      } else {
        pressTimes = 0;
        clearNum(numArr);
        numArr = getRandomNum(minNum, maxNum, size);
      }
      pressTimes++;
    }
  })
});
