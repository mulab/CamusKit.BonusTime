var randomNum = 0;
var Num1;
var Num2;
var Num3;
var origin = 0;
var cardName;
var cardClassName;
var flag = true;

$("body").keydown(function (event) {
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

function randomMath() {
  randomNum = Math.random() * 999;
  randomToString(randomNum);
}

function randomToString(x) {
  if (x < 10) {
    Num1 = "0";
    Num2 = "0";
    Num3 = x.toString();
  } else if (x < 100) {
    Num1 = "0";
    Num2 = x.toString().charAt(0);
    Num3 = x.toString().charAt(1);
  } else {
    Num1 = x.toString().charAt(0);
    Num2 = x.toString().charAt(1);
    Num3 = x.toString().charAt(2);
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
  var classname = "ringShow_" + number2;
  var cubeclassname = "cubeShow" + number1;
  removeClassName(shape, cubeclassname);
  addClassName(shape, classname);
  var deg = (-36 * parseInt(number2));
  shape.style["transform"] = "rotateY(" + deg + "deg)";
}

function checkoutCube(number1, number2) {
  var classname = "ringShow_" + number1;
  var cubeclassname = "cubeShow" + number2;
  removeClassName(shape, classname);
  addClassName(shape, cubeclassname);
}

function Start() {
  removeClassName(document.getElementById("num1"), 'jumpDown');
  removeClassName(document.getElementById("num2"), 'jumpDown');
  removeClassName(document.getElementById("num3"), 'jumpDown');
  document.getElementById("num1").innerHTML = " ";
  document.getElementById("num2").innerHTML = " ";
  document.getElementById("num3").innerHTML = " ";

  randomMath();
  randomToString(randomNum);

  removeClassName(shape, 'cube');
  addClassName(shape, 'ring');
  stage.style.webkitTransform = 'translateZ(-200px)';

  cardName = "card" + Num1;
  cardClassName = "jump" + Num1;
  addClassName(document.getElementById(cardName), cardClassName);

  cardName = "card" + Num2;
  cardClassName = "jump" + Num2;
  addClassName(document.getElementById(cardName), cardClassName);

  cardName = "card" + Num3;
  cardClassName = "jump" + Num3;
  addClassName(document.getElementById(cardName), cardClassName);
  origin = Num3;
}

function End() {
  removeClassName(shape, 'ring');
  addClassName(shape, 'cube');

  checkoutNum(origin, Num1); //open and show the number
  document.getElementById("num1").innerHTML = Num1;
  removeClassName(document.getElementById(cardName), cardClassName);
  addClassName(document.getElementById("num1"), 'jumpDown');
  checkoutCube(Num1, Num1);

  checkoutNum(Num1, Num2); //open and show the number
  document.getElementById("num2").innerHTML = Num2;
  removeClassName(document.getElementById(cardName), cardClassName);
  addClassName(document.getElementById("num2"), 'jumpDown');
  checkoutCube(Num2, Num2);

  checkoutNum(Num2, Num3); //open and show the number
  document.getElementById("num3").innerHTML = Num3;
  removeClassName(document.getElementById(cardName), cardClassName);
  addClassName(document.getElementById("num3"), 'jumpDown');
  checkoutCube(Num3, Num3);
}
