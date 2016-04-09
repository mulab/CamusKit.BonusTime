'use strict';

$(document).ready(function () {
  // Read config from config.json
  var readConfigFromJSON = function () {
    var minNum = 1, maxNum = 800, size = 3, hasBackground = true, cardBackground = false, showMode = 1;
    // $.ajax({
    //   type: 'get',
    //   async: false,
    //   url: 'config.json',
    //   contentType: 'application/json; charset=utf-8',
    //   dataType: 'json',
    //   success: function (data) {
    //     minNum = data.range[0];
    //     maxNum = data.range[1];
    //     size = data.range[2];
    //     hasBackground = data.background;
    //     cardBackground = data.card;
    //     showMode = data.mode;
    //   }
    // });
    return [minNum, maxNum, size, hasBackground, cardBackground, showMode];
  };

  // Add special background
  var addBackground = function () {
    $('body').css('background', 'url(\'../images/background.jpg\') no-repeat center');
  };
  var addCardBackground = function () {
    for (var i = 0; i < 10; i++) {
      $('#card' + i).css('background', 'url(\'../images/' + i + '.jpg\') no-repeat center 200px').text('');
    }
  };

  // Get a random number, and return as a string array
  var getRandomNum = function (usedNum, minNum, maxNum, size) {
    var randomNum = Math.round(Math.random() * (maxNum - minNum + 1) + minNum);
    while (usedNum.indexOf(randomNum) !== -1)
      randomNum = Math.round(Math.random() * (maxNum - minNum + 1) + minNum);
    usedNum.push(randomNum);
    var str = randomNum.toString();
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

  // Show all num once
  var showNumOnce = function (numArr) {
    for (var i = 0; i < numArr.length; i++) {
      displayNum(i + 1, numArr[i]);
      toggleNumJump(i + 1);
    }
  };

  // clear numbers
  var clearNum = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      toggleNumJump(i + 1);
      $('#num' + (i + 1)).text('');
    }
  };

  // 0: minNum, 1: maxNum, 2: numLength, 3: hasBackground.
  var config = readConfigFromJSON();

  // Add background
  // if (config[3])
  //   addBackground();
  if (config[4])
    addCardBackground();

  // Lottery
  var usedArr = [];
  var numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
  var pressTimes = 0, preNum = 0;
  $('body').keydown(function (event) {
    if (config[5] === 0) {
      if (event.which === 32) {
        if (pressTimes < numArr.length) {
          showNumByTurn(pressTimes, numArr[pressTimes], preNum);
          preNum = numArr[pressTimes];
          pressTimes++;
        } else {
          pressTimes = 0;
          clearNum(numArr);
          numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
        }
      }
    } else if (config[5] === 1) {
      if (event.which === 32 && pressTimes === 0) {
        toggleShape();
        pressTimes++;
      } else if (event.which === 32 && pressTimes === 1) {
        toggleShape();
        showNumOnce(numArr);
        pressTimes++;
      } else if (event.which === 32 && pressTimes === 2) {
        clearNum(numArr);
        numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
        pressTimes = 0;
      }
    }
  })
});
