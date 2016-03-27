var randomNum = 0;
var Num1;
var Num2;
var Num3;
var Num4;
var origin = 0;
var flag = true;
var maxNum = 1200;
var usedNum = [];

$('body').keydown(function (event) {
  if (event.which === 32) {
    if (flag) {
      Start();
      flag = false;
    }
    else {
      End();
      flag = true;
    }
  }
});

function update() {
  $.ajax({
    url: 'https://wewall.lab.mu/votes',
    async: false,
    success: function (data) {
      maxNum = (data['counts'][0] > data['counts'][1]) ? data['counts'][0] : data['counts'][1];
    }
  });
  console.log(maxNum);
}

setInterval('update()', 10000);

function randomMath() {
  randomNum = Math.floor(Math.random() * maxNum + 1);
  while (usedNum.indexOf(randomNum) !== -1) {
    randomNum = Math.floor(Math.random() * maxNum + 1);
  }
  usedNum.push(randomNum);
  console.log(usedNum);
  randomToString(randomNum);
}

function randomToString(x) {
  if (x < 10) {
    Num1 = '0';
    Num2 = '0';
    Num3 = '0';
    Num4 = x.toString();
  } else if (x < 100) {
    Num1 = '0';
    Num2 = '0';
    Num3 = x.toString().charAt(0);
    Num4 = x.toString().charAt(1);
  } else if (x < 1000) {
    Num1 = '0';
    Num2 = x.toString().charAt(0);
    Num3 = x.toString().charAt(1);
    Num4 = x.toString().charAt(2);
  } else {
    Num1 = x.toString().charAt(0);
    Num2 = x.toString().charAt(1);
    Num3 = x.toString().charAt(2);
    Num4 = x.toString().charAt(3);
  }
}

function hasClassName(inElement, inClassName) {
  var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName) {
  if (!hasClassName(inElement, inClassName))
    inElement.className = [inElement.className, inClassName].join(' ');
}

function removeClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName)) {
    var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
    var curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, ' ');
  }
}

function checkoutNum(number1, number2) {
  var classname = 'ringShow_' + number2;
  var cubeclassname = 'cubeShow' + number1;
  removeClassName(shape, cubeclassname);
  addClassName(shape, classname);
  var deg = (-36 * parseInt(number2));
  shape.style['transform'] = 'rotateY(' + deg + 'deg)';
}

function checkoutCube(number1, number2) {
  var classname = 'ringShow_' + number1;
  var cubeclassname = 'cubeShow' + number2;
  removeClassName(shape, classname);
  addClassName(shape, cubeclassname);
}

function Start() {
  removeClassName(document.getElementById('num1'), 'jumpDown');
  removeClassName(document.getElementById('num2'), 'jumpDown');
  removeClassName(document.getElementById('num3'), 'jumpDown');
  removeClassName(document.getElementById('num4'), 'jumpDown');
  document.getElementById('num1').innerHTML = ' ';
  document.getElementById('num2').innerHTML = ' ';
  document.getElementById('num3').innerHTML = ' ';
  document.getElementById('num4').innerHTML = ' ';

  randomMath();
  randomToString(randomNum);

  removeClassName(shape, 'cube');
  addClassName(shape, 'ring');
  stage.style.webkitTransform = 'translateZ(-200px)';
}

function End() {
  removeClassName(shape, 'ring');
  addClassName(shape, 'cube');

  checkoutNum(origin, Num1); //open and show the number
  document.getElementById('num1').innerHTML = Num1;
  addClassName(document.getElementById('num1'), 'jumpDown');
  checkoutCube(Num1, Num1);

  checkoutNum(Num1, Num2); //open and show the number
  document.getElementById('num2').innerHTML = Num2;
  addClassName(document.getElementById('num2'), 'jumpDown');
  checkoutCube(Num2, Num2);

  checkoutNum(Num2, Num3); //open and show the number
  document.getElementById('num3').innerHTML = Num3;
  addClassName(document.getElementById('num3'), 'jumpDown');
  checkoutCube(Num3, Num3);

  checkoutNum(Num3, Num4); //open and show the number
  document.getElementById('num4').innerHTML = Num4;
  addClassName(document.getElementById('num4'), 'jumpDown');
  checkoutCube(Num4, Num4);
}
