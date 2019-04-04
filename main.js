	if(window.innerWidth <= 600) {
		var dNav = document.querySelector("#detailsNav");
		var circles = dNav.querySelectorAll("span");
		var humidDetails = document.querySelector("#humid");
		var sunDetails = document.querySelector("#sun");
		var tempDetails = document.querySelector("#temp");
		var current;

		if(window.location.href.indexOf("temp") > -1) {
			tempDetails.classList.remove("hideDetailsRight");
			tempDetails.classList.remove("hideDetailsLeft");
			humidDetails.classList.add("hideDetailsLeft");
			circles[1].classList.add("active");
			circles[0].classList.remove("active");
			current = circles[1];
		} else if(window.location.href.indexOf("sun") > -1) {
			humidDetails.classList.add("hideDetailsLeft");
			sunDetails.classList.remove("hideDetailsRight");
			sunDetails.classList.remove("hideDetailsLeft");
			circles[2].classList.add("active");
			circles[0].classList.remove("active");
			current = circles[2];
		} else {
			current = circles[0];
		}

		for (var h = 0; h < circles.length; h++) {
			circles[h].addEventListener("click", swipeNav, false);
		};
	}