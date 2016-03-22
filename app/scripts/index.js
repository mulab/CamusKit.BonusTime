'use strict';

$(document).ready(function () {
  // Read config from config.json
  var readConfigFromJSON = function () {
    var minNum = 0, maxNum = 999, size = 3, hasBackground = false;
    $.getJSON('config.json', function (data) {
      minNum = data.range[0];
      maxNum = data.range[1];
      size = data.range[2];
      hasBackground = data.background;
    });
    return [minNum, maxNum, size, hasBackground];
  };

  // Add special background
  var addBackground = function () {
    $('body').css('background', 'url(\'../images/background.jpg\') no-repeat center');
    for (var i = 0; i < 10; i++) {
      $('#card' + i).css('background', 'url(\'../images/' + i + '.jpg\') no-repeat center 200px').text('');
    }
  };

  // Get a random number, and return as a string array
  var getRandomNum = function (minNum, maxNum, size) {
    var str = Math.round(Math.random() * (maxNum - minNum + 1) + minNum).toString();
    while (str.length < size) str = '0' + str;
    return str.split('');
  };

  // Toggle between Cube and Ring
  var toggleShape = function () {
    $('#shape').toggleClass('ring').toggleClass('cube');
  };

  // Open ring and show num, or inversely
  var toggleBetweenNumAndCube = function (ringNum, cubeNum) {
    var $shape = $('#shape');
    $shape.toggleClass('ringShow_' + ringNum).toggleClass('cubeShow_' + cubeNum);
    $shape.css('-webkit-transform', 'rotateY(' + (-36 * ringNum) + 'deg)');
  };

  // Let card jump
  var toggleCardJump = function (num) {
    $('#card' + num).toggleClass('jump' + num);
  };

  // Write the number into num block
  var displayNum = function (cardNum, showNum) {
    $('#num' + cardNum).text(showNum);
  };

  // Let the number jump
  var toggleNumJump = function (num) {
    $('#num' + num).toggleClass('jumpDown');
  };

  // The whole lottery process with one num
  var showNumByTurn = function (times, targetNum, originNum) {
    toggleShape();
    toggleBetweenNumAndCube(targetNum, originNum);
    setTimeout(function () {
      toggleCardJump(numArr[times]);
      setTimeout(function () {
        displayNum(times + 1, numArr[times]);
        toggleNumJump(times + 1);
        toggleShape();
        toggleBetweenNumAndCube(targetNum, targetNum);
        toggleCardJump(numArr[times]);
      }, 1100);
    }, 3300);
  };

  // clear numbers
  var clearNum = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      toggleNumJump(i);
      $('#num' + (i + 1)).text('');
    }
  };

  // 0: minNum, 1: maxNum, 2: numLength, 3: hasBackground.
  var config = readConfigFromJSON();

  // Add background
  if (config[3])
    addBackground();

  // Lottery
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
