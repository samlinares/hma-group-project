//Weather Key: 6505c393c36a586d834db95b614bedf7
//URL: https://api.openweathermap.org/data/2.5/weather?id=6058560&appid=6505c393c36a586d834db95b614bedf7&units=metric

function toggleDarkLight(){
	var body = document.getElementById("body");	
	var currentClass =body.className;
		
	body.className = currentClass == "dark-mode" ? "light-mode" :"dark-mode";

	document.getElementById("timeIcon").src = "assets/timeline_b.svg"; 
	document.getElementById("sceneIcon").src = "assets/scenes_b.svg"; 

}

(function() {
	"use strict";

	function showUserFetch() {
		//Target the 2nd page of characters
		var url = "https://api.openweathermap.org/data/2.5/weather?id=6058560&appid=6505c393c36a586d834db95b614bedf7&units=metric";
		

		fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(weather) {
				// console.log(weather.weather[0].main);

				var weatherTemp = document.querySelector("#weatherTemp")
				var weatherText = document.querySelector("#weatherText")

				weatherTemp.innerHTML +=
					Math.round(weather.main.temp) + ' C';
				weatherText.innerHTML +=
					weather.weather[0].main;		
				}

			)
			.catch(function(error) {
				console.log(error);
			});
		}
	showUserFetch();

})();