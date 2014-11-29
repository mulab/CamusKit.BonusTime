var minNum = 0;
var maxNum = 0;
var randomNum = 0;
var dataroot = "range.json";
var Num1;
var Num2;
var Num3;
var pro = 0;
var origin = 0;
var cardName;
var cardClassName;

minNum=0;
maxNum=800;
randomMath();
console.log(minNum);
console.log(maxNum);

$("body").keydown(function(event){
    console.log(event.which);
    if (event.which == 32) {
      Start ();
    };
});

function randomMath () {
  randomNum = minNum + (Math.round(Math.random() * (maxNum - minNum)));
  randomToString(randomNum);
  console.log(randomNum);
}

function randomToString (x) {
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

function showRandomNum () {
  randomMath();
  document.getElementById("num1").innerHTML = Num1;
  document.getElementById("num2").innerHTML = Num2;
  document.getElementById("num3").innerHTML = Num3;
}

function hasClassName(inElement, inClassName)
{
  var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName)
{
  if (!hasClassName(inElement, inClassName))
    inElement.className = [inElement.className, inClassName].join(' ');
}

function removeClassName(inElement, inClassName)
{
  if (hasClassName(inElement, inClassName)) {
    var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
    var curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, ' ');
  }
}

function toggleClassName(inElement, inClassName)
{
  if (hasClassName(inElement, inClassName))
    removeClassName(inElement, inClassName);
  else
    addClassName(inElement, inClassName);
}

function toggleShape()
{
  var shape = document.getElementById('shape');
  if (hasClassName(shape, 'ring')) {
    removeClassName(shape, 'ring');
    addClassName(shape, 'cube');
  } else {
    removeClassName(shape, 'cube');
    addClassName(shape, 'ring');
  }

  // Move the ring back in Z so it's not so in-your-face.
  var stage = document.getElementById('stage');
  if (hasClassName(shape, 'ring'))
    stage.style.webkitTransform = 'translateZ(-200px)';
  else
   stage.style.webkitTransform = '';
}

function toggleBackfaces()
{
  var backfacesVisible = document.getElementById('backfaces').checked;
  var shape = document.getElementById('shape');
  if (backfacesVisible)
    addClassName(shape, 'backfaces');
  else
    removeClassName(shape, 'backfaces');
}

function checkoutNum (number1, number2) {
  var classname = "ringShow_" + number2;
  var cubeclassname = "cubeShow" + number1;
  removeClassName(shape, cubeclassname);
  addClassName(shape, classname);
  var deg = (-36 * parseInt(number2));
  shape.style["transform"]="rotateY(" + deg +"deg)";
}

function checkoutCube (number1, number2) {
  var classname = "ringShow_" + number1;
  var cubeclassname = "cubeShow" + number2;
  removeClassName(shape, classname);
  addClassName(shape, cubeclassname);
}

function Start () {
  if (pro == 0) {
   randomMath();
   randomToString(randomNum);
   toggleShape();
     checkoutNum(origin, Num1); //open and show the number
     setTimeout(function() {
      cardName = "card" + Num1;
      cardClassName = "jump" + Num1;
      addClassName(document.getElementById(cardName), cardClassName);
      setTimeout(function() {
        document.getElementById("num1").innerHTML=Num1;
        removeClassName(document.getElementById(cardName), cardClassName);
        addClassName(document.getElementById("num1"), 'jumpDown');
        toggleShape();
        checkoutCube(Num1, Num1);
      }, 1100);
    }, 3300);
     pro++;
   } else if (pro == 1) {
     toggleShape();
     checkoutNum(Num1, Num2); //open and show the number
     setTimeout(function () {
      cardName = "card" + Num2;
      cardClassName = "jump" + Num2;
      addClassName(document.getElementById(cardName), cardClassName);
      setTimeout(function() {
        document.getElementById("num2").innerHTML=Num2;
        removeClassName(document.getElementById(cardName), cardClassName);
        addClassName(document.getElementById("num2"), 'jumpDown');
        toggleShape();
        checkoutCube(Num2, Num2);
      }, 1100);
    }, 3300);
     pro++;
   } else if (pro == 2) {
     toggleShape();
     checkoutNum(Num2, Num3); //open and show the number
     setTimeout(function () {
       cardName = "card" + Num3;
       cardClassName = "jump" + Num3;
       addClassName(document.getElementById(cardName), cardClassName);
       setTimeout(function() {
        document.getElementById("num3").innerHTML=Num3;
        removeClassName(document.getElementById(cardName), cardClassName);
        addClassName(document.getElementById("num3"), 'jumpDown');
        toggleShape();
        checkoutCube(Num3, Num3);
      }, 1100);
       origin = Num3;
     }, 3300);
     pro++;
   } else {
      removeClassName(document.getElementById("num1"), 'jumpDown');
      removeClassName(document.getElementById("num2"), 'jumpDown');
      removeClassName(document.getElementById("num3"), 'jumpDown');
      document.getElementById("num1").innerHTML=" ";
      document.getElementById("num2").innerHTML=" ";
      document.getElementById("num3").innerHTML=" ";
      pro++;
   }
   if (pro > 3) {
     pro = 0;
   };
 }
