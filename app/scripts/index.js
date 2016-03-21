'use strict';

$(document).ready(function () {
  var readConfigFromJSON = function () {
    var minNum = 0, maxNum = 999, size = 3;
    $.getJSON('config.json', function (data) {
      minNum = data.range[0];
      maxNum = data.range[1];
      size = data.range[2];
    });
    return [minNum, maxNum, size];
  };

  var getRandomNum = function (minNum, maxNum, size) {
    var str = Math.round(Math.random() * (maxNum - minNum + 1) + minNum).toString();
    while (str.length < size) str = '0' + str;
    return str.split('');
  };

  var toggleShape = function () {
    $('#shape').toggleClass('ring').toggleClass('cube');
  };

  var toggleBetweenRingAndCube = function (ringNum, cubeNum) {
    var $shape = $('#shape');
    $shape.toggleClass('ringShow_' + ringNum).toggleClass('cubeShow_' + cubeNum);
    $shape.css('-webkit-transform', 'rotateY(' + (-36 * ringNum) + 'deg)');
  };

  var toggleCardJump = function (num) {
    $('#card' + num).toggleClass('jump' + num);
  };

  var displayNum = function (cardNum, showNum) {
    $('#num' + cardNum).text(showNum);
  };

  var toggleNumJump = function (num) {
    $('#num' + num).toggleClass('jumpDown');
  };

  var showNumByTurn = function (times, targetNum, originNum) {
    toggleShape();
    toggleBetweenRingAndCube(targetNum, originNum);
    setTimeout(function () {
      toggleCardJump(numArr[times]);
      setTimeout(function () {
        displayNum(times + 1, numArr[times]);
        toggleNumJump(times + 1);
        toggleShape();
        toggleBetweenRingAndCube(targetNum, targetNum);
        toggleCardJump(numArr[times]);
      }, 1100);
    }, 3300);
  };

  var clearNum = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      toggleNumJump(i);
      $('#num' + (i + 1)).text('');
    }
  };

  var config = readConfigFromJSON();
  var numArr = getRandomNum(config[0], config[1], config[2]);
  var pressTimes = 0, preNum = 0;
  $('body').keydown(function (event) {
    if (event.which === 32) {
      if (pressTimes < numArr.length) {
        showNumByTurn(pressTimes, numArr[pressTimes], preNum);
        preNum = numArr[pressTimes];
      } else {
        pressTimes = 0;
        clearNum(numArr);
        numArr = getRandomNum(config[0], config[1], config[2]);
      }
      pressTimes++;
    }
  })
});
