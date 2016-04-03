// VARS & PARAMETERS
// Stage
var page = document.getElementById("page"), // get div element covering whole page, for mouse and touch events
stage = document.getElementById("stage"), // get canvas element and context
ctx = stage.getContext("2d");
ctx.scale(2, 2); // scale back to full dimensions after oversampling and reduction
centerX = 250; // stores actual values of stage center for reference in this document
centerY = 250;
var TIME_SERIES = 0;
var ISOCLINES = 1;

// Program running
var gLoop; // for looping the main loop
var fps = 36; // framerate in frames per sec
var killSwitch = true;
var viewMode = TIME_SERIES;

// Model parameters and vars
var tStep = 0.02;
var popA0 = 10000;
var popB0 = 2000;
var kA = 10000;
var kB = 10000;
var rA = 1.5;
var rB = 2;
var alphaAB = 0.5;
var alphaBA = 0.5;

var popA = [popA0];
var popB = [popB0];
var maxA = popA0;
var maxB = popB0;
