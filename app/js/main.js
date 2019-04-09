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
var gasDiv = document.querySelector("#gasValue");
var lightDiv = document.querySelector("#lightValue");
var motionDiv = document.querySelector("#motionValue");

var tempLabel = document.querySelector("#tempLabel");
var gasLabel = document.querySelector("#gasLabel");
var lightLabel = document.querySelector("#lightLabel");
var motionLabel = document.querySelector("#motionLabel");

//Remaper Function
function createRemap(inMin, inMax, outMin, outMax) { 
  return function remaper(x) { 
    return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin); 
  }; 
}

board.on("ready", function() {
	tempDiv.innerHTML = "...";
	lightDiv.innerHTML = "...";
	gasDiv.innerHTML = "...";
	motionDiv.innerHTML = "...";

/*TEMPERATURE*/
	var temperature = new five.Thermometer({
    	controller: "LM35",
    	pin: "A0",
    	freq: 500
  	});

  	temperature.on("change", function() {
    	tempDiv.innerHTML = this.celsius + " C"; 
      if (this.celsius > 15) {
        tempLabel.innerHTML = "The living room is at the perfect temperature!";
      } else if (this.celsius > 35) {
        tempLabel.innerHTML = "The living room is too warm right now.";
      } else {
        tempLabel.innerHTML = "The living room is a bit chilly right now."
      }
  	});

/*LIGHT*/
  var photoresistor = new five.Sensor({
    	pin: "A1",
    	freq: 500
	});
    
  photoresistor.on("change", function() {
   	var sensorInfo = this.value;
   	var remap = createRemap(0, 1023, 100, 0);
   	lightDiv.innerHTML = remap(sensorInfo) + "<span> lm</span>";
    if (remap(sensorInfo) > 80) {
      lightLabel.innerHTML = "The lights seem to be ON.";
    } else {
      lightLabel.innerHTML = "The lights seem to be OFF.";
    }
  });

  /*MOTION*/
  var motion = new five.Motion(7);

	// "calibrated" occurs once, at the beginning of a session,
	motion.on("calibrated", function() {
		motionDiv.innerHTML = "ON";
    motionLabel.innerHTML = "Motion detection, ON.";
	});

	// "motionstart" events are fired when the "calibrated"
	// proximal area is disrupted, generally by some form of movement
	motion.on("motionstart", function() {
		motionDiv.innerHTML = "ON";
    motionLabel.innerHTML = "MOTION DETECTED!";
	});

	// "motionend" events are fired following a "motionstart" event
	// when no movement has occurred in X ms
	motion.on("motionend", function() {
		motionDiv.innerHTML = "ON";
    motionLabel.innerHTML = "Motion detection, ON.";
	});

/*GAS*/
	var gas = new five.Sensor({
		pin: "A5",
		freq: 500
	});

	gas.on("change", function() {
		var gasInfo = this.scaleTo(1, 10);

		var piezo = new five.Piezo(10);
		if (gasInfo > 4) {
      gasDiv.innerHTML = "DANGER";
			gasLabel.innerHTML = "HIGH CO2 LEVEL DETECTED";
		} else {
      gasDiv.innerHTML = "OK";
      gasLabel.innerHTML = "Detected gas levels are okay."
    }
  });

  /*MICROPHONE*/
  // var mic = new five.Sensor({
  // 	pin: "A2",
  // 	freq: 100
  // });
  // var led = new five.Led(12);

  // mic.on("data", function() {
  // 	var micInfo = this.scaleTo(1, 10);
  // 	console.log(micInfo);
  //   soundDiv.innerHTML = micInfo;
  //   if (micInfo >> 4){
  //   soundDiv.innerHTML = "Noise Detected!"}
  //   //led.blink(500);}

  // });
  });