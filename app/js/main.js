var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})

//UMBRA VARIABLES
//Local Board
// var board = new five.Board();

//Bluetooth Board
//Run this command in terminal to get the serial port: 'ls -l /dev/tty.*'
var board = new five.Board({
	port: "/dev/tty.Umbra_SS_V01-DevB"
});

var tempDiv = document.querySelector("#tempValue");
var lightDiv = document.querySelector("#lightValue");
var gasDiv = document.querySelector("#gasValue");
var motionDiv = document.querySelector("#motionValue");
var soundDiv = document.querySelector("#soundValue");

//Remaper Function
function createRemap(inMin, inMax, outMin, outMax) { 
  return function remaper(x) { 
    return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin); 
  }; 
}

board.on("ready", function() {
	tempDiv.innerHTML = "temp";
	lightDiv.innerHTML = "light";
	gasDiv.innerHTML = "gas";
	motionDiv.innerHTML = "motion";
	soundDiv.innerHTML = "sound";

	var temperature = new five.Thermometer({
    	controller: "LM35",
    	pin: "A0",
    	freq: 500
  	});

  	temperature.on("change", function() {
    	tempDiv.innerHTML = this.celsius + "°"; 
  	});

  	var photoresistor = new five.Sensor({
    	pin: "A1",
    	freq: 500
	});
    
    photoresistor.on("change", function() {
    	var sensorInfo = this.value;
    	var remap = createRemap(0, 1023, 100, 0);
      	lightDiv.innerHTML = remap(sensorInfo) + "<span> lm</span>";
    });




 //    var motion = new five.Motion(7);

	// // "calibrated" occurs once, at the beginning of a session,
	// motion.on("calibrated", function() {
	// 	motionDiv.innerHTML = "calibrated";
	// });

	// // "motionstart" events are fired when the "calibrated"
	// // proximal area is disrupted, generally by some form of movement
	// motion.on("motionstart", function() {
	// 	motionDiv.innerHTML = "motionstart";
	// });

	// // "motionend" events are fired following a "motionstart" event
	// // when no movement has occurred in X ms
	// motion.on("motionend", function() {
	// 	motionDiv.innerHTML = "motionend";
	// });

	//   // "data" events are fired at the interval set in opts.freq
	//   // or every 25ms. Uncomment the following to see all
	//   // motion detection readings.
	//   // motion.on("data", function(data) {
	//   //   console.log(data);
	//   // });

	// var mic = new five.Sensor("A0");
	// var led = new five.Led(13);

	// mic.on("data", function() {
	// 	led.brightness(this.value >> 2);
	// });


});